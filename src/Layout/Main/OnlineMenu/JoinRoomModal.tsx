import { ChangeEvent, useContext } from "react";

import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";

import { FormState, useForm } from "../../../hooks/useForm";

import { WebsocketContext } from "../../../context/WebSocket";
import { LoginStateContext } from "../../../context/State";

import "./JoinRoomModal.css";
import "../../../components/AuthModal/Form.css";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

interface InitialFormState extends FormState {
  roomId: { value: string; isValid: boolean };
}

const JoinRoomModal = ({ isOpen, closeModal }: Props) => {
  const initialFormState: InitialFormState = {
    roomId: { value: "", isValid: true },
  };
  const { send, error, pending } = useContext(WebsocketContext);
  const { userId } = useContext(LoginStateContext);
  const { formState, updateInput, setFormData } = useForm(initialFormState);

  return (
    <Modal
      onClose={() => {
        setFormData(initialFormState);
        closeModal();
      }}
      isOpen={isOpen}
      header="JOIN A ROOM"
      classNames="join-room-modal-container"
    >
      {pending.joining && <Loader />}
      <div className="inputs-container">
        <input
          className={`input ${
            !formState.roomId.isValid ? "invalid" : null
          } room-input`}
          type="text"
          value={formState.roomId.value}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            updateInput("roomId", value, value.length > 0);
          }}
          placeholder="Room id"
        />
      </div>
      <p className="error">{error}</p>
      {userId && (
        <button
          type="submit"
          className="button"
          onClick={(e) => {
            e.preventDefault();
            send({
              type: "join",
              params: { code: formState.roomId.value, userId },
            });
          }}
          disabled={!formState.roomId.value}
        >
          JOIN
        </button>
      )}
    </Modal>
  );
};

export default JoinRoomModal;
