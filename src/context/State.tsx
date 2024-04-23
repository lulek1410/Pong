import { ReactNode, createContext, useState } from "react";

export enum AppState {
  MENU = "menu",
  HOTSEAT = "hotSeat",
  ONLINE = "online",
}

type AppStateType = {
  appState: AppState;
  setAppState: (appState: AppState) => void;
};

export const AppStateContext = createContext<AppStateType>({
  appState: AppState.MENU,
  setAppState: () => {
    throw new Error("Function not implemented");
  },
});

type LoginStateType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export const LoginStateContext = createContext<LoginStateType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {
    throw new Error("Function not implemented");
  },
});

type Props = {
  children: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginStateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <AppStateContext.Provider value={{ appState, setAppState }}>
        {children}
      </AppStateContext.Provider>
    </LoginStateContext.Provider>
  );
};
