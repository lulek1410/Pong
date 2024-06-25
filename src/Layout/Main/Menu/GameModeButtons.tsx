import { Dispatch, SetStateAction, useContext } from "react";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../../context/State";

interface Props {
  setShowLoginButtons: Dispatch<SetStateAction<boolean>>;
}

const GameModeButtons = ({ setShowLoginButtons }: Props) => {
  const { setAppState } = useContext(AppStateContext);
  const { isLoggedIn } = useContext(LoginStateContext);

  const handleOnlineGameClick = () => {
    if (isLoggedIn) {
      setAppState(AppState.ONLINE_MENU);
    } else {
      setShowLoginButtons(true);
    }
  };

  return (
    <>
      <button className="button" onClick={() => setAppState(AppState.HOTSEAT)}>
        Hot seat
      </button>
      <button className="button" onClick={handleOnlineGameClick}>
        Play Online
      </button>
    </>
  );
};

export default GameModeButtons;
