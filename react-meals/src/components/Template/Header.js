import { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Header.module.css";

import Home from "../UI/Home";
import CartButton from "../UI/CartButton";
import Modal from "../UI/Modal";

const Header = (props) => {
  const [cartIsClicked, setCartIsClicked] = useState(false);
  const [cartItem, setCartItem] = useState(props.cartItem);
  
  const viaCartItemHandler = (viaCartItem) => {
    const cartItem = {...viaCartItem};
    props.onAddItems(cartItem);
  };

  const cartClick = () => {
    setCartIsClicked((prevState) => !prevState);
  };

  return (
    <header className={classes.meals_header}>
      {cartIsClicked &&
        ReactDOM.createPortal(
          <Modal
            isModalOn={setCartIsClicked}
            onClose={() => setCartIsClicked(false)}
            viaCartItemHandler={viaCartItemHandler}
            cartItem={cartItem}
          />,
          document.getElementById("modal-root")
        )}
      <Home className={classes.meals_header_home} />
      <CartButton
        className={classes.meals_header_cart_button}
        onClick={cartClick}
        itemsEa={props.itemsEa}
      />
    </header>
  );
};

export default Header;
