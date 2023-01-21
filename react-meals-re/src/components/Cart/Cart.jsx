import classes from './Cart.module.css';
import { TiShoppingCart } from 'react-icons/ti'
import { useContext } from 'react';
import CartContext from '../store/cart-context';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const totalCount = cartCtx.items.reduce((cur, item) => cur + item.amount, 0);

    return (
        <div className={`${props.className} ${classes['cart-box']}`} onClick={props.onClick}>
            <TiShoppingCart className={classes.cart}/>
            <div className={classes['view-cart']}>View Cart</div>
            <div className={classes.count}>{totalCount}</div>
        </div>
    )
}

export default Cart;