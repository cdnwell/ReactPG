import { Link } from 'react-router-dom';

import classes from './Menu.module.css';

const Menu = () => {
    return (
        <div className={classes.menu}>
            <Link to="/">사업 소개</Link>
            <Link to="/book">공사 예약</Link>
        </div>
    )
}

export default Menu;