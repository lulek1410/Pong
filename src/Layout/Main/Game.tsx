import { useEffect, useRef, useState } from "react";
import "./Game.css";

const Game = () => {
  // const { gameState } = useContext(GameStateContext);
  const [player1Offset, setPlayer1Offset] = useState(0);
  const [player2Offset, setPlayer2Offset] = useState(0);
  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

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
    const offsetLimit =
      50 -
      (((player1Ref.current?.clientHeight || 0) /
        (gameBoardRef.current?.clientHeight || 1)) *
        100) /
        2;
    const movePlayers = () => {
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

    const moveInterval = setInterval(movePlayers, 50);

    return () => {
      clearInterval(moveInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [player1Offset, player2Offset]);

  const boardHeight = gameBoardRef.current?.clientHeight || 0;
  return (
    <>
      <h1 className="score">0 : 0</h1>
      <div ref={gameBoardRef} id="game-board">
        <div
          style={{
            transform: `translateY(${(player1Offset / 100) * boardHeight}px)`,
          }}
          ref={player1Ref}
          className="player"
          id="player1"
        ></div>
        <div id="board-middle-line"></div>
        <div id="ball"></div>
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
