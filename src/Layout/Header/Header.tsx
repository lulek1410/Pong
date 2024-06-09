import { useContext, useState } from "react";

import Avatar from "../Avatar";

import AuthModal, { AuthModalMode } from "./AuthModal/AuthModal";

import "./Header.css";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../context/State";

import "../styles.css";

interface ModalState {
  isOpen: boolean;
  mode: AuthModalMode;
}

const Header = () => {
  const { isLoggedIn } = useContext(LoginStateContext);
  const { setAppState } = useContext(AppStateContext);

  const [authModal, setAuthModal] = useState<ModalState>({
    isOpen: false,
    mode: AuthModalMode.LOGIN,
  });

  const closeModal = () => {
    setAuthModal({ isOpen: false, mode: AuthModalMode.LOGIN });
  };

  const openModal = (mode: AuthModalMode) => {
    setAuthModal({ isOpen: true, mode });
  };

  const switchMode = () => {
    setAuthModal((prevState) => ({
      isOpen: true,
      mode:
        prevState.mode === AuthModalMode.LOGIN
          ? AuthModalMode.REGISTER
          : AuthModalMode.LOGIN,
    }));
  };

  return (
    <>
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        closeModal={closeModal}
        switchMode={switchMode}
      />
      <header id="app-header">
        <h2 className="logo" onClick={() => setAppState(AppState.MENU)}>
          PONG
        </h2>
        <div>
          {isLoggedIn ? (
            <Avatar />
          ) : (
            <div className="header-buttons-container">
              <button
                className="button"
                onClick={() => openModal(AuthModalMode.LOGIN)}
              >
                Log in
              </button>
              <button
                className="button"
                onClick={() => openModal(AuthModalMode.REGISTER)}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
