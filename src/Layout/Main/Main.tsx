import { useContext, useEffect } from "react";

import Game from "./Game";
import Menu from "./Menu";
import { OnlineMenu } from "./OnlineMenu";

import Lobby from "./Lobby";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../context/State";

import useLocalGameLogic from "../../hooks/useLocalGameLogic";
import { useOnlineGameLogic } from "../../hooks/useOnlineGameLogic";

import "./Main.css";
import { WebsocketContext } from "../../context/WebSocket";

const Main = () => {
  const { appState } = useContext(AppStateContext);
  const { name, logout } = useContext(LoginStateContext);
  const { send } = useContext(WebsocketContext);

  useEffect(() => {
    if (appState === AppState.MENU) {
      send({ type: "leave" });
      if (name === "Guest") {
        logout();
      }
    }
  }, [name, appState, logout]);

  const getView = () => {
    switch (appState) {
      case AppState.MENU:
        return <Menu />;
      case AppState.ONLINE_MENU:
        return <OnlineMenu />;
      case AppState.LOBBY:
        return <Lobby />;
      case AppState.ONLINE:
        return <Game useGameLogic={useOnlineGameLogic} />;
      case AppState.HOTSEAT:
        return <Game useGameLogic={useLocalGameLogic} />;
    }
  };

  return <main id="app-main">{getView()}</main>;
};

export default Main;
