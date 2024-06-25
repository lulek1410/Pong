import { useContext } from "react";

import Game from "./Game";
import Menu from "./Menu";
import { OnlineMenu } from "./OnlineMenu";

import { AppState, AppStateContext } from "../../context/State";
import useLocalGameLogic from "../../hooks/useLocalGameLogic";
import { useOnlineGameLogic } from "../../hooks/useOnlineGameLogic";

import "./Main.css";

const Main = () => {
  const { appState } = useContext(AppStateContext);

  const getView = () => {
    switch (appState) {
      case AppState.MENU:
        return <Menu />;
      case AppState.ONLINE_MENU:
        return <OnlineMenu />;
      case AppState.ONLINE:
        return <Game useGameLogic={useOnlineGameLogic} />;
      case AppState.HOTSEAT:
        return <Game useGameLogic={useLocalGameLogic} />;
    }
  };

  return <main id="app-main">{getView()}</main>;
};

export default Main;
