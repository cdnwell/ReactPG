import { useContext, useRef } from "react";
import classes from "./FoodItem.module.css";
import CartContext from "../store/cart-context";

const FoodItem = (props) => {
  const eaInputRef = useRef();
  const cartCtx = useContext(CartContext);

  const onClickAddButton = () => {
    const enteredEaAmount = eaInputRef.current.value;
    const enteredEaAmountNumber = +enteredEaAmount;

    console.log('number : ',enteredEaAmountNumber);

    cartCtx.addItem({
      id: props.id,
      menu_name: props.menu_name,
      menu_price: props.menu_price,
      amount: enteredEaAmountNumber,
    });
  };

  return (
    <>
      <div className={`${props.className} ${classes.food_item}`}>
        <div className={`${classes.food_item__menu}`}>
          <span className={`${classes.food_item__menu_name}`}>
            {props.menu_name}
          </span>
          <span className={`${classes.food_item__menu_explain}`}>
            {props.menu_explain}
          </span>
          <span className={`${classes.food_item__menu_price}`}>
            {props.menu_price}
          </span>
        </div>
        <div className={`${classes.food_item__buttons}`}>
          <div className={`${classes.food_item__amount}`}>
            <span>Amount</span>
            <input
              type="number"
              ref={eaInputRef}
              min="1"
              max="99"
              defaultValue="1"
              step="1"
            />
          </div>
          <button className={`${classes.addButton}`} onClick={onClickAddButton}>
            + Add
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default FoodItem;
