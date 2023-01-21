import { useState } from 'react';
import ReactDOM from 'react-dom';

import classes from "./Header.module.css";

import Cart from "../Cart/Cart";
import Modal from "../Modal/Modal";

const Header = () => {
  const [isModalOn, setIsModalOn] = useState(false);

  const clickModal = () => {
    setIsModalOn(false);
  };

  const isCartClicked = () => {
    setIsModalOn(true);
  };

  return (
    <>
    {ReactDOM.createPortal(<Modal onClickModal={clickModal} isModalOn={isModalOn} />, document.getElementById("modal"))}
      <div className={classes.header}>
        <a className={classes.logo}>ReactMeals</a>
        <Cart className={classes.cart} onClick={isCartClicked}/>
      </div>
    </>
  );
};

export default Header;
