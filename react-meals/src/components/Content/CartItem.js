import { useState } from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const [menuName, setMenuName] = useState(props.menu_name);
  const [menuPrice, setMenuPrice] = useState(props.menu_price);
  const [menuEa, setMenuEa] = useState(props.menu_ea);

  const plusMenuEa = () => {
    if (menuEa === 100) return;

    const cartData = {
      menu_name: menuName,
      menu_price: menuPrice,
      menu_ea: menuEa + 1,
    };

    props.onCartItems(cartData);
  };

  const minusMenuEa = () => {
    if (menuEa === 0) return;

    const cartData = {
      menu_name: menuName,
      menu_price: menuPrice,
      menu_ea: menuEa - 1,
    };

    props.onCartItems(cartData);
  };

  const cartItems = () => {
    
  };

  return (
    <div className={`${props.className} ${classes.cart_item__box}`}>
      <div className={`${classes.cart_item__root}`}>
        <div className={`${classes.cart_item_info}`}>
          <div className={`${classes.cart_item_info__menu_name}`}>
            <p className={`${classes.cart_item_info__menu_name__p}`}>
              {props.menu_name}
            </p>
          </div>
          <div className={`${classes.cart_item_info__price_ea}`}>
            <p className={`${classes.cart_item_info__price}`}>
              ${props.menu_price}
            </p>
            <p className={`${classes.cart_item_info__ea}`}>x {props.menu_ea}</p>
          </div>
        </div>
        <div className={`${classes.cart_item__buttons_box}`}>
          <button
            onClick={minusMenuEa}
            className={`${classes.cart_item_info__minus_button}`}
          >
            -
          </button>
          <button
            onClick={plusMenuEa}
            className={`${classes.cart_item_info__plus}`}
          >
            +
          </button>
        </div>
      </div>
      <div className={`${classes.cart_item__cut_line}`}></div>
    </div>
  );
};

export default CartItem;
