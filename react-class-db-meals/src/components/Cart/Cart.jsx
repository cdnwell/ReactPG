import { Component } from "react";

import classes from "./Cart.module.css";

import { BsCart2 } from "react-icons/bs";

class Cart extends Component {
    constructor() {
        super();
    }

  IsCartClicked() {
    this.props.onClick();
  }

  render() {
    return (
      <div
        className={`${this.props.className} ${classes.cart}`}
        onClick={this.IsCartClicked.bind(this)}
      >
        <BsCart2 className={classes.cart_image} />
        <div className={classes.cart_title}>Cart</div>
        <div className={classes.cart_ea}>1</div>
      </div>
    );
  }
}

export default Cart;
