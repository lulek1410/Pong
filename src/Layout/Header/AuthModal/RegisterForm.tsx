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
        type="text"
        value={formState.email.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("email", e.target.value)
        }
        placeholder="Email"
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
      <input
        className="input"
        type="password"
        value={formState.repeatedPassword.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("repeatedPassword", e.target.value)
        }
        placeholder="Repeat password"
      />
    </div>
  );
};

export default RegisterForm;
