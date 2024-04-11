import { ReactNode, createContext, useState } from "react";

type StateType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export const StateContext = createContext<StateType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {
    throw new Error("Function not implemented");
  },
});

type Props = {
  children: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <StateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </StateContext.Provider>
  );
};
