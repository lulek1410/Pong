import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useMutation } from "@tanstack/react-query";

import { AppState, AppStateContext, LoginStateContext, User } from "../State";

import {
  RespMsg,
  ReqMessage,
  JoinedMsg,
  CreatedMsg,
  CountdownMsg,
  InitMsg,
  UpdateMsg,
} from "./message.types";
import { GameState, IWebsocketContext, Player } from "./types";
import { PendingType } from "./types";

const initialPendingState: Record<PendingType, boolean> = {
  init: false,
  joining: false,
  update: false,
  search: false,
  countdown: false,
};

export const WebsocketContext = createContext<IWebsocketContext>({
  ready: false,
  pending: initialPendingState,
  secondPlayer: null,
  roomId: null,
  update: null,
  error: null,
  isHost: false,
  countdownValue: null,
  send: (message: ReqMessage) => {
    throw new Error(`Function not implemented with message: ${message}`);
  },
  gameState: GameState.PAUSED,
});

type Props = {
  children: ReactNode;
};

export const WebsocketProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [pending, setPending] = useState(initialPendingState);
  const [isHost, setIsHost] = useState(false);
  const [update, setUpdate] = useState<UpdateMsg | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [secondPlayer, setSecondPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.PAUSED);

  const { id, name } = useContext(LoginStateContext);
  const { setAppState } = useContext(AppStateContext);
  const ws = useRef<WebSocket | null>(null);

  const updatePending = (types: PendingType[], isPending: boolean) => {
    setPending((prevState) => {
      const updatedState = { ...prevState };
      types.forEach((type: PendingType) => {
        updatedState[type] = isPending;
      });
      return updatedState;
    });
  };

  const getUserAPI = async (id: string) => {
    setError(null);
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Login failed. " + errorData.message);
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: getUserAPI,
    onSuccess: (user: User) => {
      setSecondPlayer({ id: user.id, name: user.name, isGuest: false });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleJoinedMsg = (msg: JoinedMsg) => {
    setRoomId(msg.params.roomId);
    const otherPlayer = msg.params.otherPlayer;
    if (otherPlayer?.isGuest)
      setSecondPlayer({ id: otherPlayer.id, name: "Guest", isGuest: true });
    if (otherPlayer && !otherPlayer.isGuest) mutation.mutate(otherPlayer.id);
    updatePending([PendingType.JOINING, PendingType.SEARCH], false);
  };

  const handleCreatedMsg = (msg: CreatedMsg) => {
    setIsHost(true);
    setRoomId(msg.params.roomId);
    setPending((prevPending) => {
      if (prevPending.search) {
        setError("Could not find an empty room. New room has been created.");
      }
      return { ...prevPending, search: false };
    });
  };

  const handleClose = () => {
    setIsReady(false);
    handleLeave();
  };

  const handleLeave = () => {
    setPending(initialPendingState);
    setIsHost(false);
    setRoomId(null);
    setSecondPlayer(null);
    setError(null);
  };

  const handleOpen = (socket: WebSocket) => {
    const initMessage: InitMsg = {
      type: "init",
      params: { id: id!, isGuest: name === "Guest" },
    };
    socket.send(JSON.stringify(initMessage));
    updatePending([PendingType.INIT], true);
    setIsReady(true);
  };

  const handleCountdown = (msg: CountdownMsg) => {
    if (msg.params.count === 0) {
      updatePending([PendingType.COUNTDOWN], false);
      setGameState(GameState.PLAYING);
      setCountdownValue(null);
    } else {
      setCountdownValue(msg.params.count);
    }
  };

  const handleGameStarting = () => {
    setAppState(AppState.ONLINE);
    updatePending([PendingType.COUNTDOWN], true);
  };

  useEffect(() => {
    if (id) {
      const socket = new WebSocket("ws://localhost:5000");

      socket.onopen = () => {
        handleOpen(socket);
      };

      socket.onmessage = (event: MessageEvent<RespMsg>) => {
        const msg: RespMsg = JSON.parse(event.data.toString());
        console.log(msg);
        switch (msg.type) {
          case "initialized":
            updatePending([PendingType.INIT], false);
            break;
          case "otherPlayerJoined":
            const { id, isGuest } = msg.params.player;
            if (id && !isGuest) mutation.mutate(id);
            if (isGuest)
              setSecondPlayer({ id: id, name: "Guest", isGuest: true });
            break;
          case "otherPlayerLeft":
            setSecondPlayer(null);
            setIsHost(true);
            break;
          case "joined":
            handleJoinedMsg(msg);
            break;
          case "created":
            handleCreatedMsg(msg);
            break;
          case "error":
            updatePending([PendingType.JOINING, PendingType.SEARCH], false);
            setError(msg.params.error);
            break;
          case "countdown":
            handleCountdown(msg);
            break;
          case "gameStarting":
            handleGameStarting();
            break;
          case "update":
            setUpdate(msg);
            break;
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        handleClose();
      };

      ws.current = socket;
    }

    return () => {
      if (ws.current) {
        ws.current?.send(JSON.stringify({ type: "leave" }));
        ws.current?.close();
      }
    };
  }, [id]);

  const send = (message: ReqMessage) => {
    setError(null);
    if (message.type === "leave") {
      handleLeave();
    }
    if (message.type === "search") {
      updatePending([PendingType.SEARCH], true);
    }
    if (message.type === "join") {
      updatePending([PendingType.JOINING], true);
    }
    if (message.type === "startGame") {
      setAppState(AppState.ONLINE);
      updatePending([PendingType.COUNTDOWN], true);
    }
    ws.current?.send.call(ws.current, JSON.stringify(message));
  };

  const ret = {
    ready: isReady,
    pending,
    isHost,
    secondPlayer,
    roomId,
    update,
    error,
    countdownValue,
    gameState,
    send,
  };

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};
