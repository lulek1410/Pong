import { useContext } from "react";

import { GameState, GameStateContext } from "../../context/State";

import "./Menu.css";

const Menu = () => {
  const { setGameState } = useContext(GameStateContext);

  return (
    <>
      <h2>CHOOSE GAME MODE</h2>
      <div className="menu-buttons">
        <button
          className="button"
          onClick={() => setGameState(GameState.HOTSEAT)}
        >
          Hot seat
        </button>
        <button
          className="button"
          onClick={() => setGameState(GameState.ONLINE)}
        >
          Play Online
        </button>
      </div>
    </>
  );
};

export default Menu;
