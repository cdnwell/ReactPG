import { Component } from "react";
import ReactDOM from 'react-dom';

import Cart from "../Cart/Cart";
import Modal from '../Modal/Modal'

import classes from "./Header.module.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isCartClicked : false,
    }
  }

  onModalClick() {
    this.setState({
      isCartClicked : false,
    })
  }

  onCartClick() {
    this.setState({
      isCartClicked : true,
    })
  }

  render() {
    return (
      <>
      {this.state.isCartClicked && ReactDOM.createPortal(<Modal onClick={this.onModalClick.bind(this)}/>, document.getElementById('modal'))}
      <div className={classes.header}>
        <div className={classes.logo}>React Tour</div>
        <Cart className={classes.cart} onClick={this.onCartClick.bind(this)}/>
      </div>
      </>
    );
  }
}

export default Header;