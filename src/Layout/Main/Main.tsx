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

const Main = () => {
  const { appState } = useContext(AppStateContext);
  const { name, logout } = useContext(LoginStateContext);

  useEffect(() => {
    if (name === "Guest" && appState === AppState.MENU) {
      logout();
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
