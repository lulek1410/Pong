import { useContext, useEffect, useState } from "react";

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
  const { isLoggedIn } = useContext(LoginStateContext);

  useEffect(() => {
    if (isLoggedIn) {
      setAppState(AppState.ONLINE);
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
      <button className="button" onClick={() => setAppState(AppState.ONLINE)}>
        Guest
      </button>
    </>
  );
};

export default AuthorizationButtons;
