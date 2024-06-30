import { useContext } from "react";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../context/State";
import { WebsocketContext } from "../../context/WebSocket";

import { ReqMessage } from "../../context/message.types";

export const OnlineMenu = () => {
  const { send } = useContext(WebsocketContext);
  const { userId, name, isLoggedIn } = useContext(LoginStateContext);
  const { setAppState } = useContext(AppStateContext);

  const sendMsg = (msg: ReqMessage) => {
    send(msg);
    setAppState(AppState.LOBBY);
  };

  return isLoggedIn ? (
    <>
      <h1>{name}</h1>
      <div className="menu-buttons">
        <button className="button" onClick={() => sendMsg({ type: "search" })}>
          Search
        </button>
        <button
          className="button"
          onClick={() => {
            if (userId) {
              sendMsg({ type: "join", params: { code: "", userId } });
            }
          }}
        >
          Join
        </button>
        <button className="button" onClick={() => sendMsg({ type: "create" })}>
          Create
        </button>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
};
