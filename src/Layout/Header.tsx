import { useContext } from "react";

import { StateContext } from "../context/State";

import "./styles.css";
import "./Header.css";
import Avatar from "./Avatar";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(StateContext);
  return (
    <header id="app-header">
      <h2>PONG</h2>
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
