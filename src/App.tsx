import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Main from "./Layout/Main/Main";

import { StateProvider } from "./context/State";

import "./App.css";

function App() {
  return (
    <StateProvider>
      <Header />
      <Main />
      <Footer />
    </StateProvider>
  );
}

export default App;
