import { useContext } from "react";
import { LoginStateContext } from "../../../context/State";
import { WebsocketContext } from "../../../context/WebSocket";

export const OnlineMenu = () => {
  const { send } = useContext(WebsocketContext);
  const { userId, name } = useContext(LoginStateContext);
  return (
    <>
      <h1>{name}</h1>
      <div className="menu-buttons">
        <button className="button" onClick={() => send({ type: "search" })}>
          Search
        </button>
        <button
          className="button"
          onClick={() => {
            if (userId) {
              send({ type: "join", params: { code: "", userId } });
            }
          }}
        >
          Join
        </button>
        <button className="button" onClick={() => send({ type: "create" })}>
          Create
        </button>
      </div>
    </>
  );
};
