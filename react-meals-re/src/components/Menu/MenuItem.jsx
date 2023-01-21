import { useContext, useRef } from "react";

import CartContext from "../store/cart-context";

import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  const eaInputRef = useRef();
  const cartCtx = useContext(CartContext);

  const onClickAddButton = () => {
    const enteredEaAmount = eaInputRef.current.value;
    const enteredEaAmountNumber = +enteredEaAmount;

    if (enteredEaAmountNumber > 10) {
      alert("Add items count limited [0-10]");
      return;
    }

    cartCtx.addItem({
      id: props.id,
      menu: props.menu,
      price: props.price,
      amount: enteredEaAmountNumber,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes["menu-item"]}>
        <div className={classes["menu-description"]}>
          <p className={classes.menu}>{props.menu}</p>
          <p className={classes.description}>{props.description}</p>
          <p className={classes.price}>$ {props.price}</p>
        </div>
        <div className={classes["menu-add"]}>
          <input
            type="number"
            ref={eaInputRef}
            className={classes["number-input"]}
            defaultValue="1"
            min="1"
            max="10"
          />
          <button className={classes["add-btn"]} onClick={onClickAddButton}>
            + Add Cart
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default MenuItem;
