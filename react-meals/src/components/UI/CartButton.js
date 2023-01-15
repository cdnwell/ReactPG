import { useEffect, useState } from "react";

import classes from "./CartButton.module.css";

import { BsCart2 } from "react-icons/bs";

const CartButton = (props) => {
  const [countEa, setCountEa] = useState(props.itemsEa);

  return (
    <div
      className={`${props.className} ${classes.cart_button_div}`}
      onClick={props.onClick}
    >
      <BsCart2 className={`${classes.cart_button_icon}`} />
      <span className={`${classes.cart_button_span}`}>Your cart</span>
      <div className={`${classes.cart_number_div}`}>
        <span>{countEa}</span>
      </div>
    </div>
  );
};

export default CartButton;
