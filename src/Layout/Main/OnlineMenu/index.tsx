import { useContext, useEffect, useState } from "react";

import JoinRoomModal from "./JoinRoomModal";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../../context/State";
import { WebsocketContext } from "../../../context/WebSocket";

import { ReqMessage } from "../../../context/message.types";

export const OnlineMenu = () => {
  const { send } = useContext(WebsocketContext);
  const { userId, name, isLoggedIn } = useContext(LoginStateContext);
  const { setAppState } = useContext(AppStateContext);
  const { roomId } = useContext(WebsocketContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (roomId) {
      closeModal();
      setAppState(AppState.LOBBY);
    }
  }, [roomId]);

  const sendMsg = (msg: ReqMessage) => {
    send(msg);
    setAppState(AppState.LOBBY);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return isLoggedIn ? (
    <>
      <JoinRoomModal isOpen={isOpen} closeModal={closeModal} />
      <h1>{name}</h1>
      <div className="menu-buttons">
        <button className="button" onClick={() => sendMsg({ type: "search" })}>
          Search
        </button>
        <button
          className="button"
          onClick={() => {
            if (userId) {
              setIsOpen(true);
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
