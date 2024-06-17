import { useContext, useEffect, useRef } from "react";
import { LoginStateContext } from "../context/State";

export const useOnlineGameLogic = () => {
  const points = { player1: 0, player2: 0 };
  const player1Offset = 0;
  const player2Offset = 0;
  const ballOffset = { x: 0, y: 0 };

  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  // const keysPressed = useRef<{ [key: string]: boolean }>({});

  const boardHeight = gameBoardRef.current?.clientHeight || 1;
  const boardWidth = gameBoardRef.current?.clientWidth || 1;
  // let ballVelocityX = 2;
  // let ballVelocityY = 2;
  // let ballPhi = 0;
  // const maxPhi = 75;

  const { name } = useContext(LoginStateContext);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/");

    ws.onopen = () => {
      ws.send(`Hello from user: ${name}`);
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log("Received a message: " + event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    socket.current = ws;

    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, [name]);

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
