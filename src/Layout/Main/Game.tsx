import { useEffect, useRef, useState } from "react";
import "./Game.css";

const Game = () => {
  const [player1Offset, setPlayer1Offset] = useState(0);
  const [player2Offset, setPlayer2Offset] = useState(0);
  const [ballOffset, setBallOffset] = useState({ x: 0, y: 0, phi: 0 });
  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const boardHeight = gameBoardRef.current?.clientHeight || 1;
  const boardWidth = gameBoardRef.current?.clientWidth || 1;
  let ballVelocityX = 1;
  let ballVelocityY = 1;

  useEffect(() => {
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
  }, []);

  const handlePlayerMovement = (
    offsetModifier: number,
    offsetLimit: number
  ) => {
    if (keysPressed.current["w"] && player1Offset > -offsetLimit) {
      setPlayer1Offset((prevState) =>
        Math.max(prevState - offsetModifier, -offsetLimit)
      );
    }
    if (keysPressed.current["s"] && player1Offset < offsetLimit) {
      setPlayer1Offset((prevState) =>
        Math.min(prevState + offsetModifier, offsetLimit)
      );
    }
    if (keysPressed.current["ArrowUp"] && player2Offset > -offsetLimit) {
      setPlayer2Offset((prevState) =>
        Math.max(prevState - offsetModifier, -offsetLimit)
      );
    }
    if (keysPressed.current["ArrowDown"] && player2Offset < offsetLimit) {
      setPlayer2Offset((prevState) =>
        Math.min(prevState + offsetModifier, offsetLimit)
      );
    }
  };

  const handleBallMovement = async () => {
    const ballRect = ballRef.current!.getBoundingClientRect();
    const paddleLeftRect = player1Ref.current!.getBoundingClientRect();
    const paddleRightRect = player2Ref.current!.getBoundingClientRect();

    if (
      (ballRect.left < paddleLeftRect.right &&
        ballRect.top < paddleLeftRect.bottom &&
        ballRect.bottom > paddleLeftRect.top) ||
      (ballRect.right > paddleRightRect.left &&
        ballRect.top < paddleRightRect.bottom &&
        ballRect.bottom > paddleRightRect.top)
    ) {
      ballVelocityX = -1 * ballVelocityX;
    }
    setBallOffset((prevState) => ({
      x: prevState.x + ballVelocityX * Math.cos(prevState.phi),
      y: prevState.y + ballVelocityY * Math.sin(prevState.phi),
      phi: prevState.phi,
    }));
  };

  const calculateOffsetInPx = (offset: number, direction: "x" | "y") => {
    return `${
      (offset / 100) * (direction === "y" ? boardHeight : boardWidth)
    }px`;
  };

  return (
    <>
      <h1 className="score">0 : 0</h1>
      <div ref={gameBoardRef} id="game-board">
        <div
          style={{
            transform: `translateY(${calculateOffsetInPx(player1Offset, "y")})`,
          }}
          ref={player1Ref}
          className="player"
          id="player1"
        ></div>
        <div id="board-middle-line"></div>
        <div
          style={{
            transform: `translate(calc(-50% + ${calculateOffsetInPx(
              ballOffset.x,
              "x"
            )}), calc(-50% + ${calculateOffsetInPx(ballOffset.y, "y")}))`,
          }}
          ref={ballRef}
          id="ball"
        ></div>
        <div
          style={{
            transform: `translateY(${(player2Offset / 100) * boardHeight}px)`,
          }}
          ref={player2Ref}
          className="player"
          id="player2"
        ></div>
      </div>
    </>
  );
};

export default Game;
