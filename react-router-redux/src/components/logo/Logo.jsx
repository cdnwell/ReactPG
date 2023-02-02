import classes from './Logo.module.css';

const Logo = () => {
    return (
        <div className={classes.logo}>
            <span className={classes.logo_name}>OO 스카이</span>
        </div>
    )
};

export default Logo;