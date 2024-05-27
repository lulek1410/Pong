import Modal from "../../../components/Modal";

import "./AuthModal.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export enum AuthModalMode {
  LOGIN = "login",
  REGISTER = "register",
}

type Props = {
  isOpen: boolean;
  mode: AuthModalMode;
  closeModal: () => void;
  switchMode: () => void;
};

const ModalHeader = (props: { mode: AuthModalMode }) => {
  return <div>{props.mode === AuthModalMode.LOGIN ? "LOGIN" : "REGISTER"}</div>;
};

const AuthModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.closeModal}
      header={<ModalHeader mode={props.mode} />}
      classNames="auth-modal"
    >
      <>
        {props.mode === AuthModalMode.LOGIN ? <LoginForm /> : <RegisterForm />}
        <div className="mode-switch-container">
          <p>
            {props.mode === AuthModalMode.LOGIN
              ? "You dont have an account?"
              : "You already have an account?"}
          </p>
          <button
            type="button"
            className="mode-switch-button"
            onClick={props.switchMode}
          >
            {props.mode === AuthModalMode.LOGIN ? "Register" : "Log In"}
          </button>
        </div>
      </>
    </Modal>
  );
};

export default AuthModal;
