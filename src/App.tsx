import Footer from "./Layout/Footer";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";

import { StateProvider } from "./context/State";

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
