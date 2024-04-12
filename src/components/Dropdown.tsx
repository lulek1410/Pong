import { ReactNode, useState } from "react";

import "./Dropdown.css";

export type Option = {
  name: string;
  action: () => void;
};

type Props = {
  children: ReactNode;
  options: Option[];
};

const Dropdown = ({ children, options }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="dropdown-container" onClick={() => setIsDropdownOpen(true)}>
      {children}
      {isDropdownOpen && (
        <>
          <div className="dropdown-chevron-up " />
          <menu className="dropdown-content">
            <div className="dropdown-content-wrapper">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={option.action}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </menu>
        </>
      )}
    </div>
  );
};

export default Dropdown;
