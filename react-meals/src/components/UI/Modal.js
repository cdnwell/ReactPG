import { useContext, useState, useMemo } from "react";
import CartItem from "../Content/CartItem";
import Button from "./Button";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const [cartItem, setCartItem] = useState(props.cartItem);
  const [totalAmount, setTotalAmount] = useState(0);

  // useEffect(() => {
  //   ctx.cartItem.map((item) => {
  //     console.log("totalAmount", totalAmount);
  //     setTotalAmount(
  //       (prevState) => parseInt(prevState) + parseInt(item.menu_price)
  //     );
  //   });
  // }, []);

  useMemo(() => {
    let total = 0;
    cartItem.forEach((item) => {
      total += parseFloat(item.menu_price);
    });
    total = Math.round(total * 100) / 100;
    return setTotalAmount(total);
  }, [cartItem]);

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
        {cartItem.length > 0 &&
          cartItem.map((item) => (
            <CartItem
              key={item.menu_name}
              menu_name={item.menu_name}
              menu_price={item.menu_price}
              menu_ea={item.menu_ea}
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
