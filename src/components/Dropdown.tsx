import { ReactNode, useEffect, useRef, useState } from "react";

import "./Dropdown.css";

export type Option = {
  name: string;
  action: () => void;
};

type RenderedProps = {
  isDropdownOpen: boolean;
};

type Props = {
  renderElementWithDropdown: ({ isDropdownOpen }: RenderedProps) => ReactNode;
  options: Option[];
};

const Dropdown = ({ renderElementWithDropdown, options }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        (dropdownListRef.current === null ||
          !dropdownListRef.current.contains(event.target as Node))
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownListClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleDropdownContainerClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      ref={dropdownRef}
      className="dropdown-container"
      onClick={handleDropdownContainerClick}
    >
      {renderElementWithDropdown({ isDropdownOpen })}
      {isDropdownOpen && (
        <div ref={dropdownListRef} onClick={handleDropdownListClick}>
          <div className="dropdown-chevron-up " />
          <menu className="dropdown-content">
            <div className="dropdown-content-wrapper">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    option.action();
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </menu>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
