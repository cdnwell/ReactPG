import { useSelector, useDispatch } from "react-redux";

import { itemActions } from "../store/index";

import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.amount);
  
  const buttonHandler = () => {
    dispatch(itemActions.onCartButtonClick());
  }

  return (
    <button className={classes.button} onClick={buttonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{amount}</span>
    </button>
  );
};

export default CartButton;
