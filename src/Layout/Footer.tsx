import { useContext } from "react";
import { GameState, GameStateContext } from "../context/State";
import "./styles.css";

const Footer = () => {
  const { setGameState } = useContext(GameStateContext);

  return (
    <footer id="app-footer">
      <h2 className="logo" onClick={() => setGameState(GameState.MENU)}>
        PONG
      </h2>
      <div>Credentials</div>
    </footer>
  );
};

export default Footer;
