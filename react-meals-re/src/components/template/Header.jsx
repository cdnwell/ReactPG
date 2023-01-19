import Cart from '../Cart/Cart';
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <a className={classes.logo}>ReactMeals</a>
            <Cart className={classes.cart}/>
        </div>
    )
};

export default Header;