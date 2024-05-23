import { ChangeEvent, useEffect, useReducer } from "react";

import "./Form.css";

interface LoginFormState {
  login: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
}

enum LoginFormActionType {
  INPUT_CHANGE = "input change",
  SET_DATA = "set data",
}

interface InputChangeAction {
  type: LoginFormActionType.INPUT_CHANGE;
  payload: {
    inputId: string;
    newValue: string;
  };
}

interface SetDataAction {
  type: LoginFormActionType.SET_DATA;
  payload: {
    inputs: LoginFormState;
  };
}

type LoginFormActions = InputChangeAction | SetDataAction;

const loginReducer = (
  state: LoginFormState,
  action: LoginFormActions
): LoginFormState => {
  switch (action.type) {
    case LoginFormActionType.INPUT_CHANGE: {
      return {
        ...state,
        [action.payload.inputId]: {
          value: action.payload.newValue,
          isValid: true,
        },
      };
    }
    case LoginFormActionType.SET_DATA: {
      return action.payload.inputs;
    }
    default:
      return state;
  }
};

const LoginForm = () => {
  const initialFormState: LoginFormState = {
    login: { value: "", isValid: true },
    password: { value: "", isValid: true },
  };

  const [loginForm, dispatch] = useReducer(loginReducer, initialFormState);

  const updateInput = (id: string, value: string | null) => {
    dispatch({
      type: LoginFormActionType.INPUT_CHANGE,
      payload: {
        inputId: id,
        newValue: value || "",
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: LoginFormActionType.SET_DATA,
      payload: { inputs: initialFormState },
    });
  }, []);

  return (
    <div className="inputs-container">
      <input
        className="input"
        type="text"
        value={loginForm.login.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("login", e.target.value)
        }
        placeholder="Login"
      />
      <input
        className="input"
        type="password"
        value={loginForm.password.value}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          updateInput("password", e.target.value)
        }
        placeholder="Password"
      />
    </div>
  );
};

export default LoginForm;
