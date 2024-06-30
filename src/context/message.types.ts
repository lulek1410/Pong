export enum PendingType {
  INIT = "init",
  JOINING = "joining",
  SEARCH = "search",
  UPDATE = "update",
}

type IPending = Record<PendingType, boolean>;

export interface Player {
  userId: string;
  name: string;
}

export interface IWebsocketContext {
  ready: boolean;
  pending: IPending;
  secondPlayer: Player | null;
  roomId: string | null;
  value: RespMessage | null;
  send: (message: ReqMessage) => void;
}

interface InitMsgResp {
  type: "initialized";
}

interface JoinedMsg {
  type: "joined";
  params: { roomId: string; otherPlayer: { userId: string | null } };
}

interface CreatedMsg {
  type: "created";
  params: { roomId: string };
}

interface ErrorMsg {
  type: "full" | "error";
  params: { room: string };
}

export type RespMessage = JoinedMsg | ErrorMsg | InitMsgResp | CreatedMsg;

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
