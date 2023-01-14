import classes from './Header.module.css';

import Home from '../UI/Home';
import CartButton from '../UI/CartButton';

const Header = () => {
    return (
        <header className={classes.meals_header}>
            <Home className={classes.meals_header_home}/>
            <CartButton className={classes.meals_header_cart_button}/>
        </header>
    );
};

export default Header;