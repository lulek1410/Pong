import { useContext } from "react";

import Game from "./Game";
import Menu from "./Menu";

import { GameState, GameStateContext } from "../../context/State";

import "./Main.css";

const Main = () => {
  const { gameState } = useContext(GameStateContext);

  return (
    <main id="app-main">
      {gameState === GameState.MENU ? <Menu /> : <Game />}
    </main>
  );
};

export default Main;
