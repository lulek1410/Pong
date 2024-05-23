import { useReducer } from "react";

export interface FormState {
  [key: string]: { value: any; isValid: boolean };
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
    isValid: boolean;
  };
}

interface SetDataAction {
  type: FormActionType.SET_DATA;
  payload: {
    inputs: FormState;
  };
}

type FormActions = InputChangeAction | SetDataAction;

const reducer = (state: FormState, action: FormActions): FormState => {
  switch (action.type) {
    case FormActionType.INPUT_CHANGE: {
      return {
        ...state,
        [action.payload.inputId]: {
          value: action.payload.newValue,
          isValid: action.payload.isValid,
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

export const useForm = (initialFormState: FormState) => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);

  const updateInput = (id: string, value: string | null, isValid: boolean) => {
    dispatch({
      type: FormActionType.INPUT_CHANGE,
      payload: {
        inputId: id,
        newValue: value || "",
        isValid,
      },
    });
  };

  const setFormData = (inputs: FormState) => {
    dispatch({
      type: FormActionType.SET_DATA,
      payload: {
        inputs,
      },
    });
  };

  return { formState, updateInput, setFormData };
};
