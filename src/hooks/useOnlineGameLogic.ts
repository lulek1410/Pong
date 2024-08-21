import { useContext, useEffect, useRef, useState } from "react";

import { BallOffset, GameLogic, Points } from "../Layout/Main/Game";

import { WebsocketContext } from "../context/WebSocket";
import { GameState } from "../context/WebSocket/types";

export const useOnlineGameLogic = (): GameLogic => {
  const { gameState, send, isHost, update } = useContext(WebsocketContext);

  const [points, setPoints] = useState<Points>({ player1: 0, player2: 0 });
  const [player1Offset, setPlayer1Offset] = useState(0);
  const [player2Offset, setPlayer2Offset] = useState(0);
  const [ballOffset, setBallOffset] = useState<BallOffset>({ x: 0, y: 0 });

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
    if (isHost) {
      send({
        type: "initOnlineGame",
        params: {
          player1Rect: player1Ref.current!.getBoundingClientRect(),
          player2Rect: player2Ref.current!.getBoundingClientRect(),
          ballRect: ballRef.current!.getBoundingClientRect(),
          gameBoardRect: gameBoardRef.current!.getBoundingClientRect(),
        },
      });
    }
  }, []);

  useEffect(() => {
    if (update) {
      // setPoints(update.params.points);
      // setPlayer1Offset(update.params.player1Offset);
      // setPlayer2Offset(update.params.player2Offset);
      // setBallOffset(update.params.ballOffset);
    }
  }, [update]);

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
          type: "keyPress",
          params: {
            keyPressed: getKeyPressed(),
          },
        });
      }, 700);

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
