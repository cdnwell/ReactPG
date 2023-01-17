import ReactDOM from "react-dom";

import BgImage from "./components/BG/BgImage";

import classes from "./App.module.css";
import Header from "./components/Template/Header";
import Section from "./components/Template/Section";
import CartProvider from "./components/store/CartProvider";

function App() {
  return (
    <CartProvider>
      <div className={classes.top_div}>
        {ReactDOM.createPortal(
          <BgImage />,
          document.getElementById("background-root")
        )}
        <Header />
        <Section />
      </div>
    </CartProvider>
  );
}

export default App;
