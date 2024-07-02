import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { LoginStateContext } from "./State";
import {
  RespMessage,
  IWebsocketContext,
  ReqMessage,
  PendingType,
  Player,
} from "./message.types";

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

  const { userId } = useContext(LoginStateContext);
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

  useEffect(() => {
    if (userId) {
      const socket = new WebSocket("ws://localhost:5000");

      socket.onopen = () => {
        const initMessage = {
          type: "init",
          params: { userId: userId },
        };
        socket.send(JSON.stringify(initMessage));
        updatePending([PendingType.INIT], true);
        setIsReady(true);
      };

      socket.onmessage = (event: MessageEvent<RespMessage>) => {
        const msg: RespMessage = JSON.parse(event.data.toString());
        setVal(msg);
        console.log(msg);
        switch (msg.type) {
          case "initialized":
            updatePending([PendingType.INIT], false);
            break;
          case "joined":
            setRoomId(msg.params.roomId);
            // setSecondPlayer(msg.params.otherPlayer.userId); /// TODO: Need to add call to api to download the other user data
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
            break;
          case "full":
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
        console.log("WebSocket connection closed:", event);
      };

      ws.current = socket;
    }

    return () => {
      if (ws.current) {
        ws.current?.send(JSON.stringify({ type: "leave" }));
        ws.current?.close();
      }
    };
  }, [userId]);

  const send = (message: ReqMessage) => {
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
