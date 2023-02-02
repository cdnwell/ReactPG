import Logo from '../logo/Logo';
import Menu from '../menu/Menu';

import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <Logo />
            <Menu />
        </div>
    )
};

export default Header;