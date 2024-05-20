import { ChangeEvent, useEffect, useReducer } from "react";

import "./Form.css";

interface RegisterFormState {
  login: { value: string; isValid: boolean };
  email: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
  repeatedPassword: { value: string; isValid: boolean };
}

enum FormActionType {
  INPUT_CHANGE = "input change",
  SET_DATA = "set data",
}

interface InputChangeAction {
  type: FormActionType.INPUT_CHANGE;
  payload: {
    inputId: string;
    newValue: string;
  };
}

interface SetDataAction {
  type: FormActionType.SET_DATA;
  payload: {
    inputs: RegisterFormState;
  };
}

type LoginFormActions = InputChangeAction | SetDataAction;

const registerReducer = (
  state: RegisterFormState,
  action: LoginFormActions
): RegisterFormState => {
  switch (action.type) {
    case FormActionType.INPUT_CHANGE: {
      return {
        ...state,
        [action.payload.inputId]: {
          value: action.payload.newValue,
          isValid: true,
        },
      };
    }
    case FormActionType.SET_DATA: {
      return action.payload.inputs;
    }
    default:
      return state;
  }
};

const RegisterForm = () => {
  const initialFormState: RegisterFormState = {
    login: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    repeatedPassword: { value: "", isValid: true },
  };

  const [registerForm, dispatch] = useReducer(
    registerReducer,
    initialFormState
  );

  const updateInput = (id: string, value: string | null) => {
    dispatch({
      type: FormActionType.INPUT_CHANGE,
      payload: {
        inputId: id,
        newValue: value || "",
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: FormActionType.SET_DATA,
      payload: { inputs: initialFormState },
    });
  }, []);

  return (
    <div className="inputs-container">
      <input
        className="input"
        type="text"
        value={registerForm.login.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("login", e.target.value)
        }
        placeholder="Login"
      />
      <input
        className="input"
        type="text"
        value={registerForm.email.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("email", e.target.value)
        }
        placeholder="Email"
      />
      <input
        className="input"
        type="password"
        value={registerForm.password.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("password", e.target.value)
        }
        placeholder="Password"
      />
      <input
        className="input"
        type="password"
        value={registerForm.repeatedPassword.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("repeatedPassword", e.target.value)
        }
        placeholder="Repeat password"
      />
    </div>
  );
};

export default RegisterForm;
