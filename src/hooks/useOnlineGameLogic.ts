import { useContext, useEffect, useRef } from "react";

import { GameLogic } from "../Layout/Main/Game";

import { WebsocketContext } from "../context/WebSocket";
import { GameState } from "../context/WebSocket/types";

export const useOnlineGameLogic = (): GameLogic => {
  const { gameState, send } = useContext(WebsocketContext);

  const points = { player1: 0, player2: 0 };
  const player1Offset = 0;
  const player2Offset = 0;
  const ballOffset = { x: 0, y: 0 };

  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const boardHeight = gameBoardRef.current?.clientHeight || 1;
  const boardWidth = gameBoardRef.current?.clientWidth || 1;

  const getKeyPressed = (): string => {
    if (keysPressed.current["w"]) return "w";
    if (keysPressed.current["s"]) return "s";
    if (keysPressed.current["ArrowUp"]) return "ArrowUp";
    if (keysPressed.current["ArrowDown"]) return "ArrowDown";
    return "";
  };

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      const handleKeyDown = (e: KeyboardEvent) => {
        keysPressed.current[e.key] = true;
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        keysPressed.current[e.key] = false;
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      const updateInterval = setInterval(() => {
        send({
          type: "update",
          params: {
            playerRect: player1Ref.current!.getBoundingClientRect(),
            ballRect: ballRef.current!.getBoundingClientRect(),
            gameBoardRect: gameBoardRef.current!.getBoundingClientRect(),
            keyPressed: getKeyPressed(),
          },
        });
      }, 50);

      return () => {
        clearInterval(updateInterval);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [gameState]);

  const calculateOffsetInPx = (offset: number, direction: "x" | "y") => {
    return `${
      (offset / 100) * (direction === "y" ? boardHeight : boardWidth)
    }px`;
  };

  return {
    points,
    player1Offset,
    player2Offset,
    ballOffset,
    player1Ref,
    player2Ref,
    ballRef,
    gameBoardRef,
    calculateOffsetInPx,
  };
};
