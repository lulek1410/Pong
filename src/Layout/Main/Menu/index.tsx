import { useState } from "react";

import AuthorizationButtons from "./AuthorizationButtons";
import GameModeButtons from "./GameModeButtons";
import "./index.css";

const Menu = () => {
  const [showLoginButtons, setShowLoginButtons] = useState(false);

  return (
    <>
      <h2>
        {showLoginButtons ? "LOGIN OR PLAY AS A GUEST" : "CHOOSE GAME MODE"}
      </h2>
      <div className="menu-buttons">
        {showLoginButtons ? (
          <AuthorizationButtons />
        ) : (
          <GameModeButtons setShowLoginButtons={setShowLoginButtons} />
        )}
      </div>
    </>
  );
};

export default Menu;
