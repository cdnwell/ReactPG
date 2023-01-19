import classes from './Cart.module.css';
import { TiShoppingCart } from 'react-icons/ti'

const Cart = (props) => {
    return (
        <div className={`${props.className} ${classes['cart-box']}`}>
            <TiShoppingCart className={classes.cart}/>
            <div className={classes['view-cart']}>View Cart</div>
            <div className={classes.count}>0</div>
        </div>
    )
}

export default Cart;