import { useContext } from "react";

import Game from "./Game";
import Menu from "./Menu";

import { AppState, AppStateContext } from "../../context/State";

import "./Main.css";

const Main = () => {
  const { appState } = useContext(AppStateContext);

  return (
    <main id="app-main">
      {appState === AppState.MENU ? <Menu /> : <Game />}
    </main>
  );
};

export default Main;
