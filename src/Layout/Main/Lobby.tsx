import { useContext } from "react";

import UserCard from "../../components/UserCard";

import { LoginStateContext } from "../../context/State";
import { WebsocketContext } from "../../context/WebSocket";

const Lobby = () => {
  const { name } = useContext(LoginStateContext);
  const { secondPlayer, pending, roomId } = useContext(WebsocketContext);

  return (
    <>
      <h4>{pending.search ? "SEARCHING FOR A ROOM" : `ROOM: ${roomId}`}</h4>
      <UserCard name={name} isActive />
      <UserCard name={secondPlayer?.name || null} isLoading={pending.search} />
    </>
  );
};

export default Lobby;
