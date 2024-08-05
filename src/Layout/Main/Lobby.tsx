import { useContext } from "react";

import BackButton from "../../components/BackButton";
import UserCard from "../../components/UserCard";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../context/State";
import { WebsocketContext } from "../../context/WebSocket";

import "./Lobby.css";

const Lobby = () => {
  const { name } = useContext(LoginStateContext);
  const { secondPlayer, pending, error, roomId, isHost, send } =
    useContext(WebsocketContext);
  const { setAppState } = useContext(AppStateContext);

  const message = pending.search ? "SEARCHING FOR A ROOM" : `ROOM: ${roomId}`;

  const leaveRoom = () => {
    send({
      type: "leave",
    });
    setAppState(AppState.ONLINE_MENU);
  };

  return (
    <div className="lobby-container">
      <div className="lobby-back-button">
        {!pending.search && <BackButton action={leaveRoom} />}
      </div>
      <p className={error ? "lobby-header-error" : ""}>{error}</p>
      <h4>{message}</h4>
      <UserCard name={name} isActive isHost={isHost} />
      <UserCard
        name={secondPlayer?.name || null}
        isLoading={pending.search}
        isHost={!isHost}
      />
    </div>
  );
};

export default Lobby;
