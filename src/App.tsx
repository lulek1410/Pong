import "./App.css";

function App() {
  return (
    <>
      <header id="app-header">
        <h2>PONG</h2>
        <div>
          <h4>user</h4>
        </div>
      </header>
      <main id="app-main">
        <h1 className="score">0 : 0</h1>
        <div id="game-board">
          <div className="player" id="player1"></div>
          <div id="board-middle-line"></div>
          <div id="ball"></div>
          <div className="player" id="player2"></div>
        </div>
      </main>
      <footer id="app-footer">
        <h2>PONG</h2>
        <div>Credentials</div>
      </footer>
    </>
  );
}

export default App;
