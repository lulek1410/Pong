export enum PendingType {
  INIT = "init",
  JOINING = "joining",
  SEARCH = "search",
  UPDATE = "update",
}

type IPending = Record<PendingType, boolean>;

export interface Player {
  id: string;
  name: string;
}

export interface IWebsocketContext {
  ready: boolean;
  pending: IPending;
  secondPlayer: Player | null;
  roomId: string | null;
  value: RespMessage | null;
  error: string | null;
  send: (message: ReqMessage) => void;
}

interface InitMsgResp {
  type: "initialized";
}

interface JoinedMsg {
  type: "joined";
  params: { roomId: string; otherPlayer: { id: string | null } };
}

interface CreatedMsg {
  type: "created";
  params: { roomId: string };
}

interface ErrorMsg {
  type: "error";
  params: { error: string };
}

export type RespMessage = JoinedMsg | ErrorMsg | InitMsgResp | CreatedMsg;

interface BasicMessage {
  type: "leave" | "search" | "create";
}

interface JoinParams {
  code: string;
  id: string;
}

interface JoinMessage {
  type: "join";
  params: JoinParams;
}

interface InitMessage {
  type: "init";
  params: { id: string };
}

export type ReqMessage = JoinMessage | BasicMessage | InitMessage;
