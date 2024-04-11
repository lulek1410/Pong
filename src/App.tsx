import "./App.css";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import { StateProvider } from "./context/State";

function App() {
  return (
    <StateProvider>
      <Header />
      <main id="app-main">
        <h1 className="score">0 : 0</h1>
        <div id="game-board">
          <div className="player" id="player1"></div>
          <div id="board-middle-line"></div>
          <div id="ball"></div>
          <div className="player" id="player2"></div>
        </div>
      </main>
      <Footer />
    </StateProvider>
  );
}

export default App;
