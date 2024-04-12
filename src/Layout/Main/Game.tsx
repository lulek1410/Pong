import "./Game.css";

const Game = () => {
  // const { gameState } = useContext(GameStateContext);

  return (
    <>
      <h1 className="score">0 : 0</h1>
      <div id="game-board">
        <div className="player" id="player1"></div>
        <div id="board-middle-line"></div>
        <div id="ball"></div>
        <div className="player" id="player2"></div>
      </div>
    </>
  );
};

export default Game;
