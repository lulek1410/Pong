import { useContext } from "react";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LoginStateContext } from "../context/State";

import Dropdown, { Option } from "../components/Dropdown";

import "./Avatar.css";

const Avatar = () => {
  const { setUser, user } = useContext(LoginStateContext);

  const dropdownOptions: Option[] = [
    { name: "Edit profile picture", action: () => {} },
    { name: "Log out", action: () => setUser(null) },
  ];

  return (
    <Dropdown
      renderElementWithDropdown={({ isDropdownOpen }) => {
        return (
          <div className={"user" + (isDropdownOpen ? " active" : "")}>
            <div className="avatar-container">
              <FontAwesomeIcon icon={faUserAstronaut} className="avatar" />
            </div>
            <p>{user?.name}</p>
          </div>
        );
      }}
      options={dropdownOptions}
    />
  );
};

export default Avatar;
