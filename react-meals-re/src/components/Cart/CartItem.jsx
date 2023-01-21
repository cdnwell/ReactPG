import classes from './CartItem.module.css';

const CartItem = (props) => {
    return (
        <div className={classes['cart-item']}>
            <div>
                <div className={classes.menu}>{props.menu}</div>
                <div className={classes['menu-detail']}>
                    <div className={classes.price}>$ {props.price}</div>
                    <div className={classes.amount}>x {props.amount}</div>
                </div>
            </div>
            <div className={classes['buttons-box']}>
                <div>
                    <button className={classes.minus} onClick={props.minusItem}>-</button>
                    <button className={classes.plus} onClick={props.plusItem}>+</button>
                </div>
            </div>
        </div>
    )

}

export default CartItem;