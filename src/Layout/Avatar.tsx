import { useContext } from "react";

import { LoginStateContext } from "../context/State";

import Dropdown, { Option } from "../components/Dropdown";
import UserCard from "../components/UserCard";

const Avatar = () => {
  const { logout, name } = useContext(LoginStateContext);

  const getDropdownOptions = () => {
    let dropdownOptions: Option[] = [
      { name: "Log out", action: () => logout() },
    ];
    if (name !== "Guest") {
      dropdownOptions.unshift({
        name: "Edit profile picture",
        action: () => {},
      });
    }
    return dropdownOptions;
  };

  return (
    <Dropdown
      renderElementWithDropdown={({ isDropdownOpen }) => {
        return <UserCard name={name} isActive={isDropdownOpen} />;
      }}
      options={getDropdownOptions()}
    />
  );
};

export default Avatar;
