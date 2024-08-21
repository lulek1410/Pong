import { ReqMessage, UpdateMsg } from "./message.types";

export enum PendingType {
  INIT = "init",
  JOINING = "joining",
  SEARCH = "search",
  UPDATE = "update",
  COUNTDOWN = "countdown",
}

type IPending = Record<PendingType, boolean>;

export interface Player {
  id: string;
  name: string;
  isGuest: boolean;
}

export interface IWebsocketContext {
  ready: boolean;
  pending: IPending;
  gameState: GameState;
  secondPlayer: Player | null;
  roomId: string | null;
  update: UpdateMsg | null;
  error: string | null;
  countdownValue: number | null;
  isHost: boolean;
  send: (message: ReqMessage) => void;
}

export enum GameState {
  PAUSED = "paused",
  PLAYING = "playing",
  WIN = "win",
  LOOSE = "loose",
}
