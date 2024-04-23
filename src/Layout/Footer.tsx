import { useContext } from "react";
import { AppState, AppStateContext } from "../context/State";
import "./styles.css";

const Footer = () => {
  const { setAppState } = useContext(AppStateContext);

  return (
    <footer id="app-footer">
      <h2 className="logo" onClick={() => setAppState(AppState.MENU)}>
        PONG
      </h2>
      <div>Credentials</div>
    </footer>
  );
};

export default Footer;
