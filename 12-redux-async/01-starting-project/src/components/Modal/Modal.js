import { useSelector, useDispatch } from "react-redux";

import { itemActions } from "../store/index";

import classes from "./Modal.module.css";

const Modal = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const amount = useSelector((state) => state.amount);
  const totalPrice = useSelector((state) => state.totalPrice);

  const modalHandler = () => {
    dispatch(itemActions.onCartButtonClick());
  };

  return (
    <div>
      <div className={classes.modal_layout} onClick={modalHandler}></div>
      <div className={classes.modal}>
        { amount !== 0 &&
        <div className={classes.modal_item}>
          <div className={classes.item_name_amount}>
            <span className={classes.name}>{name}</span>
            <span className={classes.amount}>x {amount}</span>
          </div>
          <div className={classes.item_price}>
            <span>${totalPrice}.00 </span>
            <span>{"($6.00/item)"}</span>
          </div>
        </div>
        }
        <div className={classes.modal_button}>
          <button onClick={modalHandler}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
