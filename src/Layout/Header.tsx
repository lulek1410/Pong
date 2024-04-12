import { useContext } from "react";

import Avatar from "./Avatar";

import {
  GameState,
  GameStateContext,
  LoginStateContext,
} from "../context/State";

import "./Header.css";
import "./styles.css";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  const { setGameState } = useContext(GameStateContext);
  return (
    <header id="app-header">
      <h2 className="logo" onClick={() => setGameState(GameState.MENU)}>
        PONG
      </h2>
      <div>
        {isLoggedIn ? (
          <Avatar />
        ) : (
          <button className="button" onClick={() => setIsLoggedIn(true)}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
