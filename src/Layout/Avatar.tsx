import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dropdown, { Option } from "../components/Dropdown";

import "./Avatar.css";

const Avatar = () => {
  const dropdownOptions: Option[] = [
    { name: "Edit profile picture", action: () => {} },
    { name: "Log out", action: () => {} },
  ];

  return (
    <Dropdown options={dropdownOptions}>
      <div className="user">
        <div className="avatar-container">
          <FontAwesomeIcon icon={faUserAstronaut} className="avatar" />
        </div>
        <p>user_name_1234</p>
      </div>
    </Dropdown>
  );
};

export default Avatar;
