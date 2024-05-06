import { useEffect, useRef, useState } from "react";
import "./Game.css";

const Game = () => {
  const [points, setPoints] = useState({ player1: 0, player2: 0 });
  const [player1Offset, setPlayer1Offset] = useState(0);
  const [player2Offset, setPlayer2Offset] = useState(0);
  const [ballOffset, setBallOffset] = useState({ x: 0, y: 0 });
  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const boardHeight = gameBoardRef.current?.clientHeight || 1;
  const boardWidth = gameBoardRef.current?.clientWidth || 1;
  let ballVelocityX = 2;
  let ballVelocityY = 2;
  let ballPhi = 0;
  const maxPhi = 75;

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

  const resetGame = () => {
    setPlayer1Offset(0);
    setPlayer2Offset(0);
    setBallOffset({ x: 0, y: 0 });
    ballPhi = 0;
  };

  const calculatePhi = (paddleRect: DOMRect): number => {
    const ballRect = ballRef.current!.getBoundingClientRect();
    const paddleCenter =
      paddleRect.top +
      (paddleRect.height + ballRect.height) / 2 -
      ballRect.height / 2;
    const ballCenter = ballRect.top + ballRect.height / 2;
    const distanceFromCenter = ballCenter - paddleCenter;
    return Math.abs(
      (maxPhi * distanceFromCenter) /
        (paddleRect.height / 2 + ballRect.height / 2)
    );
  };

  const checkScore = () => {
    const ballRect = ballRef.current!.getBoundingClientRect();
    const boardRect = gameBoardRef.current!.getBoundingClientRect();

    if (ballRect.left <= boardRect.left) {
      resetGame();
      setPoints((prevState) => ({
        player1: prevState.player1,
        player2: prevState.player2++,
      }));
    } else if (ballRect.right >= boardRect.right) {
      resetGame();
      setPoints((prevState) => ({
        player1: prevState.player1++,
        player2: prevState.player2,
      }));
    }
  };

  const chackPaddleCollision = () => {
    const ballRect = ballRef.current!.getBoundingClientRect();
    const paddleLeftRect = player1Ref.current!.getBoundingClientRect();
    const paddleRightRect = player2Ref.current!.getBoundingClientRect();
    if (
      ballRect.left <= paddleLeftRect.right &&
      ballRect.top <= paddleLeftRect.bottom &&
      ballRect.bottom >= paddleLeftRect.top &&
      ballRect.left >= paddleLeftRect.left &&
      ballRect.left >= paddleLeftRect.right - paddleLeftRect.width / 2
    ) {
      ballPhi = calculatePhi(paddleLeftRect);
      ballVelocityX = -1 * ballVelocityX;
    } else if (
      ballRect.right >= paddleRightRect.left &&
      ballRect.top <= paddleRightRect.bottom &&
      ballRect.bottom >= paddleRightRect.top &&
      ballRect.right <= paddleRightRect.right &&
      ballRect.right <= paddleRightRect.left + paddleRightRect.width / 2
    ) {
      ballPhi = calculatePhi(paddleRightRect);
      ballVelocityX = -1 * ballVelocityX;
    }
  };

  const checkBoardCollision = () => {
    const ballRect = ballRef.current!.getBoundingClientRect();
    const boardRect = gameBoardRef.current!.getBoundingClientRect();
    if (ballRect.top <= boardRect.top || ballRect.bottom >= boardRect.bottom) {
      ballVelocityY = -1 * ballVelocityY;
    }
  };

  const handleBallMovement = async () => {
    checkScore();
    chackPaddleCollision();
    checkBoardCollision();
    setBallOffset((prevState) => {
      return {
        x: prevState.x + ballVelocityX,
        y: Math.max(
          Math.min(
            prevState.y + ballVelocityY * Math.abs(Math.sin(ballPhi)),
            48.7
          ),
          -48.7
        ),
      };
    });
  };

  const calculateOffsetInPx = (offset: number, direction: "x" | "y") => {
    return `${
      (offset / 100) * (direction === "y" ? boardHeight : boardWidth)
    }px`;
  };

  return (
    <>
      <h1 className="score">
        {points.player1} : {points.player2}
      </h1>
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
