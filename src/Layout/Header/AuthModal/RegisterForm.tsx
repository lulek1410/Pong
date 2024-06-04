import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useContext, useState } from "react";

import { LoginStateContext, User } from "../../../context/State";
import { FormState, useForm } from "../../../hooks/useForm";

import "./Form.css";

interface RegisterFormState extends FormState {
  name: { value: string; isValid: boolean };
  email: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
  repeatedPassword: { value: string; isValid: boolean };
}

interface Props {
  closeModal: () => void;
}

const RegisterForm = ({ closeModal }: Props) => {
  const initialFormState: RegisterFormState = {
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    repeatedPassword: { value: "", isValid: true },
  };
  const { setUser } = useContext(LoginStateContext);
  const { formState, updateInput } = useForm(initialFormState);
  const [error, setError] = useState<string | null>(null);

  const register = async () => {
    const formData = new FormData();
    formData.append("name", formState.name.value);
    formData.append("email", formState.email.value);
    formData.append("password", formState.password.value);
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Login failed. " + errorData.message);
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (user: User) => {
      setUser(user);
      closeModal();
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const isFormInvalid = () => {
    return Object.values(formState).some((el) => !el.isValid || !el.value);
  };

  return (
    <>
      <div className="inputs-container">
        <input
          className={`input ${!formState.name.isValid ? "invalid" : null}`}
          type="text"
          value={formState.name.value}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const isValid = value.length > 0;
            updateInput("name", value, isValid);
          }}
          placeholder="Nick"
        />
        <p>{formState.name.isValid ? "" : "Login is mandatory"}</p>
        <input
          className={`input ${!formState.email.isValid ? "invalid" : null}`}
          type="text"
          value={formState.email.value}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            updateInput(
              "email",
              value,
              value.includes("@") && !!value.split("@")[1].length
            );
          }}
          placeholder="Email"
        />
        <p>{formState.email.isValid ? "" : "Email format invalid"}</p>
        <input
          className={`input ${!formState.password.isValid ? "invalid" : null}`}
          type="password"
          value={formState.password.value}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            updateInput("password", value, value.length > 6);
          }}
          placeholder="Password"
        />
        <p>
          {formState.password.isValid
            ? ""
            : "Password must be at least 6 characters long"}
        </p>
        <input
          className={`input ${
            !formState.repeatedPassword.isValid ? "invalid" : null
          }`}
          type="password"
          value={formState.repeatedPassword.value}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            updateInput(
              "repeatedPassword",
              value,
              value.length > 6 && value === formState.password.value
            );
          }}
          placeholder="Repeat password"
        />
        <p>
          {formState.repeatedPassword.isValid
            ? ""
            : "Value is too short or does not match the password above"}
        </p>
      </div>
      <p>{error}</p>
      <button
        type="submit"
        className="button"
        onClick={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        disabled={isFormInvalid()}
      >
        Register
      </button>
    </>
  );
};

export default RegisterForm;
