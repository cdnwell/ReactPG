import { useContext } from "react";
import CartItem from "../Cart/CartItem";
import CartContext from "../store/cart-context";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const cartCtx = useContext(CartContext);

  const onBackgroundClicked = () => {
    props.onClickModal(false);
  };

  const minusItem = (id) => {
    cartCtx.removeItem(id);
  };

  const plusItem = (item) => {
    cartCtx.addItem({...item, amount : 1});
  };


  const cartItemSpread = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      menu={item.menu}
      price={item.price}
      amount={item.amount}
      minusItem={minusItem.bind(null, item.id)}
      plusItem={plusItem.bind(null,item)}
    />
  ));

 
  return (
    <>
      {props.isModalOn && (
        <div className={classes.background} onClick={onBackgroundClicked}></div>
      )}
      {props.isModalOn && (
        <div className={classes.modal}>
          {cartItemSpread}
          <div className={classes.total}>
            <div className={classes["total-root"]}>
              <div className={classes["total-div"]}>Total </div>
              <div className={classes["total-amount-div"]}>
                $ {cartCtx.totalAmount.toFixed(2) === "-0.00" ? "0.00" : cartCtx.totalAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <button className={classes.close} onClick={onBackgroundClicked}>
                Close
              </button>
              <button className={classes.order}>Order</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
