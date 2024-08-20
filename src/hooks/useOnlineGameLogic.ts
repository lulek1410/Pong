import { useContext, useEffect, useRef } from "react";

import { GameLogic } from "../Layout/Main/Game";

import { WebsocketContext } from "../context/WebSocket";
import { GameState } from "../context/WebSocket/types";

export const useOnlineGameLogic = (): GameLogic => {
  const { gameState } = useContext(WebsocketContext);

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
  // let ballVelocityX = 2;
  // let ballVelocityY = 2;
  // let ballPhi = 0;
  // const maxPhi = 75;

  const handleBallMovement = () => {};
  const handlePlayerMovement = (
    offsetModifier: number,
    offsetLimit: number
  ) => {
    console.log("offsetModifier", offsetModifier, "offsetLimit", offsetLimit);
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

      const offsetModifier = 2.5;
      const player1Height = player1Ref.current?.clientHeight || 1;
      const offsetLimit =
        50 -
        ((player1Height / (gameBoardRef.current?.clientHeight || 1)) * 100) / 2;

      const moveInterval = setInterval(() => {
        handleBallMovement();
        handlePlayerMovement(offsetModifier, offsetLimit);
      }, 50);

      return () => {
        clearInterval(moveInterval);
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
