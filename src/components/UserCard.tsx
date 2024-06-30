import { faPlus, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UserCard.css";
import Loader from "./Loader";

interface Props {
  name: string | null;
  isActive?: boolean;
  isLoading?: boolean;
}

const UserCard = ({ isActive, name, isLoading }: Props) => {
  return (
    <div className={"user" + (isActive ? " active" : "")}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="avatar-container">
            <FontAwesomeIcon
              icon={name ? faUserAstronaut : faPlus}
              className="avatar"
            />
          </div>
          {!!name && <p>{name}</p>}
        </>
      )}
    </div>
  );
};

export default UserCard;
