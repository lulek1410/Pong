import { useContext, useState } from "react";

import Avatar from "../Avatar";

import AuthModal, {
  AuthModalMode,
  ModalState,
} from "../../components/AuthModal";

import "./Header.css";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../context/State";

import "../styles.css";

const Header = () => {
  const { isLoggedIn, name, logout } = useContext(LoginStateContext);
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

  const goToMenu = () => {
    if (isLoggedIn && name === "Guest") logout();
    setAppState(AppState.MENU);
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
        <h2 className="logo" onClick={goToMenu}>
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
