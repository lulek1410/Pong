import { useContext } from "react";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LoginStateContext } from "../context/State";

import Dropdown, { Option } from "../components/Dropdown";

import "./Avatar.css";

const Avatar = () => {
  const { setIsLoggedIn } = useContext(LoginStateContext);

  const dropdownOptions: Option[] = [
    { name: "Edit profile picture", action: () => {} },
    { name: "Log out", action: () => setIsLoggedIn(false) },
  ];

  return (
    <Dropdown
      renderElementWithDropdown={({ isDropdownOpen }) => {
        return (
          <div className={"user" + (isDropdownOpen ? " active" : "")}>
            <div className="avatar-container">
              <FontAwesomeIcon icon={faUserAstronaut} className="avatar" />
            </div>
            <p>user_name_1234</p>
          </div>
        );
      }}
      options={dropdownOptions}
    />
  );
};

export default Avatar;
