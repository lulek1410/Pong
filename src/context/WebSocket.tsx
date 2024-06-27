import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LoginStateContext } from "./State";
import { RespMessage, IWebsocketContext, ReqMessage } from "./message.types";

export const WebsocketContext = createContext<IWebsocketContext>({
  ready: false,
  value: null,
  send: (message: ReqMessage) => {
    throw new Error(`Function not implemented with message: ${message}`);
  },
});

type Props = {
  children: ReactNode;
};

export const WebsocketProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState<RespMessage | null>(null);

  const { userId } = useContext(LoginStateContext);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (userId) {
      const socket = new WebSocket("ws://localhost:5000");

      socket.onopen = () => {
        const initMessage = {
          type: "init",
          params: { userId: userId },
        };
        socket.send(JSON.stringify(initMessage));
        setIsReady(true);
      };

      socket.onmessage = (event: MessageEvent<RespMessage>) => {
        const msg: RespMessage = JSON.parse(event.data.toString());
        setVal(msg);
        console.log(msg);
        // switch (msg.type) {
        //   case "connected":
        //     break;
        //   case "error":
        //     break;
        //   case "full":
        //     break;
        // }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = (event) => {
        setIsReady(false);
        console.log("WebSocket connection closed:", event);
      };

      ws.current = socket;
    }

    return () => {
      ws.current?.close();
    };
  }, [userId]);

  const send = (message: ReqMessage) => {
    ws.current?.send.call(ws.current, JSON.stringify(message));
  };

  const ret = {
    ready: isReady,
    value: val,
    send,
  };

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};
