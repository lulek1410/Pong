import { ChangeEvent, useContext, useState } from "react";

import { FormState, useForm } from "../../../hooks/useForm";

import "./Form.css";
import { useMutation } from "@tanstack/react-query";
import { LoginStateContext, User } from "../../../context/State";

interface LoginFormState extends FormState {
  email: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
}

interface Props {
  closeModal: () => void;
}

const LoginForm = ({ closeModal }: Props) => {
  const initialFormState: LoginFormState = {
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  };

  const { formState, updateInput } = useForm(initialFormState);
  const { setUser } = useContext(LoginStateContext);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    const formData = new FormData();
    formData.append("email", formState.email.value);
    formData.append("password", formState.password.value);
    const response = await fetch("http://localhost:5000/api/users/login", {
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
    mutationFn: login,
    onSuccess: (user: User) => {
      setUser(user);
      closeModal();
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <div className="inputs-container">
        <input
          className={`input ${!formState.email.isValid ? "invalid" : null}`}
          type="text"
          value={formState.email.value}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            updateInput("email", value, value.length > 0);
          }}
          placeholder="Email"
        />
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
      </div>
      <p>{error}</p>
      <button
        type="submit"
        className="button"
        onClick={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        Log In
      </button>
    </>
  );
};

export default LoginForm;
