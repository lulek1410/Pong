import { useContext, useEffect, useState } from "react";

import { v4 } from "uuid";

import {
  AppState,
  AppStateContext,
  LoginStateContext,
} from "../../../context/State";

import AuthModal, {
  AuthModalMode,
  ModalState,
} from "../../../components/AuthModal";

const AuthorizationButtons = () => {
  const { setAppState } = useContext(AppStateContext);
  const [authModal, setAuthModal] = useState<ModalState>({
    isOpen: false,
    mode: AuthModalMode.LOGIN,
  });
  const { isLoggedIn, login } = useContext(LoginStateContext);

  useEffect(() => {
    if (isLoggedIn) {
      setAppState(AppState.ONLINE_MENU);
    }
  }, [isLoggedIn]);

  const closeModal = () => {
    setAuthModal({ isOpen: false, mode: AuthModalMode.LOGIN });
  };

  const openModal = () => {
    setAuthModal({ isOpen: true, mode: AuthModalMode.LOGIN });
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
      <button className="button" onClick={openModal}>
        Log in
      </button>
      <button
        className="button"
        onClick={() => {
          login({
            userId: v4(),
            name: "Guest",
            email: "",
            token: "GuestToken",
          });
          setAppState(AppState.ONLINE_MENU);
        }}
      >
        Guest
      </button>
    </>
  );
};

export default AuthorizationButtons;
