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

export interface User {
  id: string;
  name: string;
  email: string;
}

type LoginStateType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const LoginStateContext = createContext<LoginStateType>({
  user: null,
  setUser: () => {
    throw new Error("Function not implemented");
  },
});

type Props = {
  children: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  const [user, setUser] = useState<User | null>(null);

  return (
    <LoginStateContext.Provider value={{ user, setUser }}>
      <AppStateContext.Provider value={{ appState, setAppState }}>
        {children}
      </AppStateContext.Provider>
    </LoginStateContext.Provider>
  );
};
