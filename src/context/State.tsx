import { ReactNode, createContext, useState } from "react";

import { useAuth } from "../hooks/useAuth";

export enum AppState {
  MENU = "menu",
  HOTSEAT = "hotSeat",
  ONLINE = "online",
  ONLINE_MENU = "onlineMenu",
  LOBBY = "lobby",
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

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

type LoginStateType = { [P in keyof User]: User[P] | null } & {
  isLoggedIn: boolean;
  login: (user: User, expirationDate?: Date) => void;
  logout: () => void;
};

export const LoginStateContext = createContext<LoginStateType>({
  isLoggedIn: false,
  id: null,
  name: null,
  email: null,
  token: null,
  login(_user, _expirationDate) {
    throw new Error("Function not implemented");
  },
  logout: () => {
    throw new Error("Function not implemented");
  },
});

type Props = {
  children: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  const { id, email, name, token, login, logout } = useAuth();

  const logoutWrapped = () => {
    setAppState(AppState.MENU);
    logout();
  };

  return (
    <LoginStateContext.Provider
      value={{
        isLoggedIn: !!token,
        id,
        name,
        email,
        token,
        login,
        logout: logoutWrapped,
      }}
    >
      <AppStateContext.Provider value={{ appState, setAppState }}>
        {children}
      </AppStateContext.Provider>
    </LoginStateContext.Provider>
  );
};
