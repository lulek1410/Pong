import { useContext } from "react";

import Avatar from "./Avatar";

import { AppState, AppStateContext, LoginStateContext } from "../context/State";

import "./styles.css";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  const { setAppState } = useContext(AppStateContext);
  return (
    <header id="app-header">
      <h2 className="logo" onClick={() => setAppState(AppState.MENU)}>
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
