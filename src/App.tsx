import Footer from "./Layout/Footer";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";

import { StateProvider } from "./context/State";
import { WebsocketProvider } from "./context/WebSocket";

function App() {
  return (
    <StateProvider>
      <WebsocketProvider>
        <Header />
        <Main />
      </WebsocketProvider>
      <Footer />
    </StateProvider>
  );
}

export default App;
