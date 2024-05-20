import { ReactNode } from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import "./Modal.css";

interface OverlayProps {
  header?: ReactNode;
  footer?: ReactNode;
  classNames?: string;
  children: ReactNode;
  onSubmit?: () => void;
}

const ModalOverlay = (props: OverlayProps) => {
  const content = (
    <div className={`modal ${props.classNames}`}>
      {!!props.header && (
        <header className="modal-header">{props.header}</header>
      )}
      <form onSubmit={props.onSubmit}>
        <div className="modal-content">{props.children}</div>
      </form>
      {!!props.footer && (
        <footer className="modal-footer">{props.footer}</footer>
      )}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

interface Props extends OverlayProps {
  onClose: () => void;
  isOpen: boolean;
}

const Modal = (props: Props) => {
  return (
    <>
      {props.isOpen && (
        <>
          <Backdrop onClick={props.onClose} />
          <ModalOverlay {...props} />
        </>
      )}
    </>
  );
};

export default Modal;
