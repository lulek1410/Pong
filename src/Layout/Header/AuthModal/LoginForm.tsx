import { ChangeEvent } from "react";

import { FormState, useForm } from "../../../hooks/useForm";

import "./Form.css";

interface LoginFormState extends FormState {
  login: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
}

const LoginForm = () => {
  const initialFormState: LoginFormState = {
    login: { value: "", isValid: true },
    password: { value: "", isValid: true },
  };

  const { formState, updateInput } = useForm(initialFormState);

  return (
    <>
      <div className="inputs-container">
        <input
          className={`input ${!formState.login.isValid ? "invalid" : null}`}
          type="text"
          value={formState.login.value}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            updateInput("login", value, value.length > 0);
          }}
          placeholder="Login"
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
      <button type="submit" className="button">
        Log In
      </button>
    </>
  );
};

export default LoginForm;
