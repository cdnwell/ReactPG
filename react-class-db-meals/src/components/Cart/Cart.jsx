import { Component } from "react";

import classes from "./Cart.module.css";

import { BsCart2 } from "react-icons/bs";
import TourContext from "../store/tour-context";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      totalCount : 0,
    }
  }

  static contextType = TourContext;
  
  IsCartClicked() {
    this.props.onClick();
  }

  countAmount() {
    const totalEa = this.context.items.length;
    this.setState({
      totalCount : totalEa,
    });
  }

  componentDidMount() {
    this.countAmount();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.totalCount !== this.context.items.length) {
      this.countAmount();
    }
  }


  render() {
    return (
      <div
        className={`${this.props.className} ${classes.cart}`}
        onClick={this.IsCartClicked.bind(this)}
      >
        <BsCart2 className={classes.cart_image} />
        <div className={classes.cart_title}>Cart</div>
        <div className={classes.cart_ea}>{this.state.totalCount}</div>
      </div>
    );
  }
}

export default Cart;
