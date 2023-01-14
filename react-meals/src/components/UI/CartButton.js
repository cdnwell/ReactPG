import classes from './CartButton.module.css';

import { BsCart2 } from 'react-icons/bs';

const CartButton = (props) => {
    return (
        <div className={`${props.className} ${classes.cart_button_div}`}>
            <BsCart2 className={`${classes.cart_button_icon}`}/>
            <span className={`${classes.cart_button_span}`}>Your cart</span>
            <div className={`${classes.cart_number_div}`}>
                <span>0</span>
            </div>
        </div>
    );
};

export default CartButton;