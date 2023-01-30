import CartButton from "../Cart/CartButton";
import ReactDOM from "react-dom";

import { useSelector } from "react-redux";

import classes from "./MainHeader.module.css";
import Modal from "../Modal/Modal";

const MainHeader = (props) => {
  const isCartClicked = useSelector((state) => state.isCartClicked);

  return (
    <>
      {isCartClicked &&
        ReactDOM.createPortal(<Modal />, document.getElementById("modal"))}
      <header className={classes.header}>
        <h1>ReduxCart</h1>
        <nav>
          <ul>
            <li>
              <CartButton />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
