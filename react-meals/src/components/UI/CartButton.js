import { useContext, useEffect, useState } from "react";

import classes from "./CartButton.module.css";

import { BsCart2 } from "react-icons/bs";
import CartContext from "../store/cart-context";

const CartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItem = items.reduce((cur, item) => cur + item.amount, 0);

  const btnClasses = `${props.classes} ${classes.cart_button_div} ${btnIsHighlighted ? classes.bump : '' }`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    },300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <div
      className={btnClasses}
      onClick={props.onClick}
    >
      <BsCart2 className={`${classes.cart_button_icon}`} />
      <span className={`${classes.cart_button_span}`}>Your cart</span>
      <div className={`${classes.cart_number_div}`}>
        <span>{numberOfCartItem}</span>
      </div>
    </div>
  );
};

export default CartButton;
