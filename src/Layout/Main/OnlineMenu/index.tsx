import { useContext } from "react";
import { LoginStateContext } from "../../../context/State";
import { WebsocketContext } from "../../../context/WebSocket";

export const OnlineMenu = () => {
  const { send } = useContext(WebsocketContext);
  const { userId } = useContext(LoginStateContext);
  return (
    <>
      <h2>CHOOSE GAME ROOM</h2>
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
          <button
            className="button"
            onClick={() => send({ type: "create" })}
          ></button>
          Create
        </button>
      </div>
    </>
  );
};
