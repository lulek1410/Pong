import { ChangeEvent } from "react";

import { FormState, useForm } from "../../../hooks/useForm";

import "./Form.css";

interface RegisterFormState extends FormState {
  login: { value: string; isValid: boolean };
  email: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
  repeatedPassword: { value: string; isValid: boolean };
}

const RegisterForm = () => {
  const initialFormState: RegisterFormState = {
    login: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    repeatedPassword: { value: "", isValid: true },
  };

  const { formState, updateInput } = useForm(initialFormState);

  return (
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
    </div>
  );
};

export default RegisterForm;
