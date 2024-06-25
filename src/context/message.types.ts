export interface IWebsocketContext {
  ready: boolean;
  value: RespMessage | null;
  send: (message: ReqMessage) => void;
}

interface ConnectedMsg {
  type: "connected";
  params: { room: string; userIds: number };
}

interface ErrorMsg {
  type: "full" | "error";
  params: { room: string };
}

export type RespMessage = ConnectedMsg | ErrorMsg;

interface BasicMessage {
  type: "leave" | "search" | "create";
}

interface JoinParams {
  code: string;
  userId: string;
}

interface JoinMessage {
  type: "join";
  params: JoinParams;
}

interface InitMessage {
  type: "init";
  params: { userId: string };
}

export type ReqMessage = JoinMessage | BasicMessage | InitMessage;
