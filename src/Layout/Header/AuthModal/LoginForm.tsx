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
    <div className="inputs-container">
      <input
        className="input"
        type="text"
        value={formState.login.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("login", e.target.value)
        }
        placeholder="Login"
      />
      <input
        className="input"
        type="password"
        value={formState.password.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("password", e.target.value)
        }
        placeholder="Password"
      />
    </div>
  );
};

export default LoginForm;
