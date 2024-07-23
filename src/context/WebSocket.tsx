import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { LoginStateContext, User } from "./State";
import {
  RespMessage,
  IWebsocketContext,
  ReqMessage,
  PendingType,
  Player,
} from "./message.types";
import { useMutation } from "@tanstack/react-query";

const initialPendingState: Record<PendingType, boolean> = {
  init: false,
  joining: false,
  update: false,
  search: false,
};

export const WebsocketContext = createContext<IWebsocketContext>({
  ready: false,
  pending: initialPendingState,
  secondPlayer: null,
  roomId: null,
  value: null,
  error: null,
  send: (message: ReqMessage) => {
    throw new Error(`Function not implemented with message: ${message}`);
  },
});

type Props = {
  children: ReactNode;
};

export const WebsocketProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [pending, setPending] = useState(initialPendingState);
  const [val, setVal] = useState<RespMessage | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [secondPlayer, setSecondPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useContext(LoginStateContext);
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
      setSecondPlayer(user);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    if (id) {
      const socket = new WebSocket("ws://localhost:5000");

      socket.onopen = () => {
        const initMessage = {
          type: "init",
          params: { id: id },
        };
        socket.send(JSON.stringify(initMessage));
        updatePending([PendingType.INIT], true);
        setIsReady(true);
      };

      socket.onmessage = (event: MessageEvent<RespMessage>) => {
        const msg: RespMessage = JSON.parse(event.data.toString());
        setVal(msg);
        switch (msg.type) {
          case "initialized":
            updatePending([PendingType.INIT], false);
            break;
          case "joined":
            setRoomId(msg.params.roomId);
            const otherPlayerId = msg.params.otherPlayer.id;
            if (otherPlayerId) mutation.mutate(otherPlayerId);
            updatePending([PendingType.JOINING, PendingType.SEARCH], false);
            break;
          case "created":
            setRoomId(msg.params.roomId);
            setPending((prevPending) => {
              if (prevPending.search) {
                setError(
                  "Could not find an empty room. New room has been created."
                );
              }
              return { ...prevPending, search: false };
            });
            break;
          case "error":
            updatePending([PendingType.JOINING, PendingType.SEARCH], false);
            setError(msg.params.error);
            break;
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = (event) => {
        setIsReady(false);
        setPending(initialPendingState);
        setVal(null);
        setRoomId(null);
        setSecondPlayer(null);
        setError(null);
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
    if (message.type === "search") {
      updatePending([PendingType.SEARCH], true);
    }
    if (message.type === "join") {
      updatePending([PendingType.JOINING], true);
    }
    ws.current?.send.call(ws.current, JSON.stringify(message));
  };

  const ret = {
    ready: isReady,
    pending,
    secondPlayer,
    roomId,
    value: val,
    error,
    send,
  };

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};
