import { useContext } from "react";
import CartItem from "../Content/CartItem";
import CartContext from "../store/cart-context";
import Button from "./Button";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount : 1});
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div
      className={classes.overlay}
      style={{ opacity: props.isModalOn ? "1" : "0" }}
      onClick={handleOverlayClick}
    >
      <div
        className={classes.window}
        style={{ opacity: props.isModalOn ? "1" : "0" }}
      >
        {cartCtx.items.length > 0 &&
          cartCtx.items.map((item) => (
            <CartItem
              key={item.menu_name}
              menu_name={item.menu_name}
              menu_price={item.menu_price}
              menu_ea={item.amount}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          ))}
        <div className={classes.total_amount_box}>
          <p>Total Amount</p>
          <p>$ {totalAmount}</p>
        </div>
        <div className={classes.button_box}>
          <Button onClick={props.onClose} className={classes.buttons} content="Close" />
          <Button className={classes.buttons} content="Order" />
        </div>
      </div>
    </div>
  );

};

export default Modal;
