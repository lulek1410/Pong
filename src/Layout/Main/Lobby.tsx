import { useContext } from "react";

import UserCard from "../../components/UserCard";

import { LoginStateContext } from "../../context/State";
import { WebsocketContext } from "../../context/WebSocket";

import "./Lobby.css";

const Lobby = () => {
  const { name } = useContext(LoginStateContext);
  const { secondPlayer, pending, error, roomId, isHost } =
    useContext(WebsocketContext);

  const message = pending.search ? "SEARCHING FOR A ROOM" : `ROOM: ${roomId}`;

  return (
    <>
      <p className={error ? "lobby-header-error" : ""}>{error}</p>
      <h4>{message}</h4>
      <UserCard name={name} isActive isHost={isHost} />
      <UserCard
        name={secondPlayer?.name || null}
        isLoading={pending.search}
        isHost={!isHost}
      />
    </>
  );
};

export default Lobby;
