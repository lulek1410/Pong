import { RefObject, useContext } from "react";

import "./Game.css";
import { WebsocketContext } from "../../context/WebSocket";
import Loader from "../../components/Loader";

export interface Points {
  player1: number;
  player2: number;
}

export interface BallOffset {
  x: number;
  y: number;
}

export interface GameLogic {
  points: Points;
  player1Offset: number;
  player2Offset: number;
  ballOffset: BallOffset;
  player1Ref: RefObject<HTMLDivElement>;
  player2Ref: RefObject<HTMLDivElement>;
  ballRef: RefObject<HTMLDivElement>;
  gameBoardRef: RefObject<HTMLDivElement>;
  calculateOffsetInPx: (offset: number, direction: "x" | "y") => string;
}

interface Props {
  useGameLogic: () => GameLogic;
}

const Game = ({ useGameLogic }: Props) => {
  const { pending, countdownValue } = useContext(WebsocketContext);
  const {
    points,
    player1Offset,
    player2Offset,
    ballOffset,
    player1Ref,
    player2Ref,
    ballRef,
    gameBoardRef,
    calculateOffsetInPx,
  } = useGameLogic();

  return (
    <>
      {pending.countdown && !!countdownValue ? (
        <div className="loader-container">
          <p>{countdownValue}</p>
          <Loader />
        </div>
      ) : (
        <h1 className="score">
          {points.player1} : {points.player2}
        </h1>
      )}
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
            transform: `translateY(${calculateOffsetInPx(player2Offset, "y")})`,
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
