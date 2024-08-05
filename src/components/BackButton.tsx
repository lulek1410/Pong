import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./BackButton.css";

interface Props {
  action: () => void;
}

const BackButton = ({ action }: Props) => {
  return (
    <button className="button back-button-container" onClick={action}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export default BackButton;
