import { useSelector } from "react-redux";

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const name = useSelector((state) => state.name);
  const amount = useSelector((state) => state.amount);
  const totalPrice = useSelector((state) => state.totalPrice);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItem
          item={{ title: name, quantity: amount, total: totalPrice, price: 6 }}
        />
      </ul>
    </Card>
  );
};

export default Cart;
