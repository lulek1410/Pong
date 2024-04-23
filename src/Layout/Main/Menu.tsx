import { useContext } from "react";

import { AppState, AppStateContext } from "../../context/State";

import "./Menu.css";

const Menu = () => {
  const { setAppState } = useContext(AppStateContext);

  return (
    <>
      <h2>CHOOSE GAME MODE</h2>
      <div className="menu-buttons">
        <button
          className="button"
          onClick={() => setAppState(AppState.HOTSEAT)}
        >
          Hot seat
        </button>
        <button className="button" onClick={() => setAppState(AppState.ONLINE)}>
          Play Online
        </button>
      </div>
    </>
  );
};

export default Menu;
