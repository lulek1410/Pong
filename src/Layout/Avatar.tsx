import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Avatar.css";

const Avatar = () => {
  return (
    <div className="user">
      <div className="avatar-container">
        <FontAwesomeIcon icon={faUserAstronaut} className="avatar" />
      </div>
      <p>user_name_1234</p>
    </div>
  );
};

export default Avatar;
