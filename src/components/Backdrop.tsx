import ReactDOM from "react-dom";

import "./Backdrop.css";

interface Props {
  onClick: () => void;
}

const Backdrop = (props: Props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;
