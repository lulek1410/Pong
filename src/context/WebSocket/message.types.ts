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
  value: RespMsg | null;
  error: string | null;
  send: (message: ReqMessage) => void;
}

export interface InitMsgResp {
  type: "initialized";
}

export interface JoinedMsg {
  type: "joined";
  params: { roomId: string; otherPlayer: { id: string | null } };
}

export interface OtherPlayerJoinedMsg {
  type: "otherPlayerJoined";
  params: { player: { id: string | null } };
}

export interface CreatedMsg {
  type: "created";
  params: { roomId: string };
}

export interface ErrorMsg {
  type: "error";
  params: { error: string };
}

export type RespMsg =
  | JoinedMsg
  | ErrorMsg
  | InitMsgResp
  | CreatedMsg
  | OtherPlayerJoinedMsg;

export interface BasicMsg {
  type: "leave" | "search" | "create";
}

export interface JoinParams {
  code: string;
  id: string;
}

export interface JoinMsg {
  type: "join";
  params: JoinParams;
}

export interface InitMsg {
  type: "init";
  params: { id: string };
}

export type ReqMessage = JoinMsg | BasicMsg | InitMsg;
