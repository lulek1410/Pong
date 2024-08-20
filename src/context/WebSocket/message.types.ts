export interface BaseRespMsg {
  type: "gameStarting" | "initialized" | "otherPlayerLeft";
}

export interface JoinedMsg {
  type: "joined";
  params: {
    roomId: string;
    otherPlayer: { id: string; isGuest: boolean } | null;
  };
}

export interface OtherPlayerJoinedMsg {
  type: "otherPlayerJoined";
  params: { player: { id: string; isGuest: boolean } };
}

export interface CreatedMsg {
  type: "created";
  params: { roomId: string };
}

export interface ErrorMsg {
  type: "error";
  params: { error: string };
}

export interface ErrorMsg {
  type: "error";
  params: { error: string };
}

export interface CountdownMsg {
  type: "countdown";
  params: { count: number };
}

export type RespMsg =
  | JoinedMsg
  | ErrorMsg
  | CreatedMsg
  | OtherPlayerJoinedMsg
  | BaseRespMsg
  | CountdownMsg;

export interface BasicMsg {
  type: "leave" | "search" | "create" | "startGame";
}

export interface JoinParams {
  code: string;
  id: string;
  isGuest: boolean;
}

export interface JoinMsg {
  type: "join";
  params: JoinParams;
}

export interface InitMsg {
  type: "init";
  params: { id: string; isGuest: boolean };
}

export interface UpdateMsg {
  type: "update";
  params: {
    playerRect: DOMRect;
    ballRect: DOMRect;
    gameBoardRect: DOMRect;
    keyPressed: string;
  };
}

export type ReqMessage = JoinMsg | BasicMsg | InitMsg | UpdateMsg;
