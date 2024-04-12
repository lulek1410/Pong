import { ReactNode, createContext, useState } from "react";

export enum GameState {
  MENU = "menu",
  HOTSEAT = "hotSeat",
  ONLINE = "online",
}

type GameStateType = {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
};

export const GameStateContext = createContext<GameStateType>({
  gameState: GameState.MENU,
  setGameState: () => {
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
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginStateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <GameStateContext.Provider value={{ gameState, setGameState }}>
        {children}
      </GameStateContext.Provider>
    </LoginStateContext.Provider>
  );
};
