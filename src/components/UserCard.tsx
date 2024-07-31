import {
  faCrown,
  faPlus,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UserCard.css";
import Loader from "./Loader";

interface Props {
  name: string | null;
  isHost?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
}

const UserCard = ({ isActive, name, isLoading, isHost }: Props) => {
  return (
    <div className={"user" + (isActive && !isLoading ? " active" : "")}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!!isHost && <FontAwesomeIcon className="host-icon" icon={faCrown} />}
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
