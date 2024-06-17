import { useOnlineGameLogic } from "../../hooks/useOnlineGameLogic";

import "./Game.css";

const Game = () => {
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
  } = useOnlineGameLogic(); // useLocalGameLogic();

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
