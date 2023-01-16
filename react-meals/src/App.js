import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

import BgImage from "./components/BG/BgImage";

import classes from "./App.module.css";
import Header from "./components/Template/Header";
import Section from "./components/Template/Section";
import CartProvider from "./components/store/CartProvider";

const CART_ITEM = [
  { menu_name: "Sushi", menu_price: 22.99, menu_ea: 1 },
  { menu_name: "Schnitzel", menu_price: 16.5, menu_ea: 4 },
];

function App() {
  const [cartItem, setCartItem] = useState(CART_ITEM);
  const [itemsEa, setItemsEA] = useState(cartItem.length);

  useEffect(() => {
    setItemsEA(cartItem.length);
  }, [itemsEa, cartItem]);

  return (
    <CartProvider>
      <div className={classes.top_div}>
        {ReactDOM.createPortal(
          <BgImage />,
          document.getElementById("background-root")
        )}
        <Header
          itemsEa={itemsEa}
          cartItem={cartItem}
        />
        <Section />
      </div>
    </CartProvider>
  );
}

export default App;
