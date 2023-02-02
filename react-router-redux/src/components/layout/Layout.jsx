import classes from './Layout.module.css';

import Header from "./Header";
import Footer from './Footer';

const Layout = (props) => {
    return (
        <>
            <Header />
            <main className={classes.main}>{props.children}</main>
            <Footer />
        </>
    );
}

export default Layout;