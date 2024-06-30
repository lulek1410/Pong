export enum PendingType {
  INIT = "init",
  ROOM = "room",
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

interface InfoMsg {
  type: "info";
  params: { room: "left" | "initialized" };
}

interface ConnectedMsg {
  type: "connected";
  params: { room: string; userIds: number };
}

interface ErrorMsg {
  type: "full" | "error";
  params: { room: string };
}

export type RespMessage = ConnectedMsg | ErrorMsg | InfoMsg;

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
