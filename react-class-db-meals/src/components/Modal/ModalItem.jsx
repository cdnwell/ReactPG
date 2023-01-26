import { Component } from "react";
import TourContext from "../store/tour-context";

import classes from "./ModalItem.module.css";

class ModalItem extends Component {
  constructor() {
    super();
  }

  static contextType = TourContext;

  addItemHandler() {
    this.context.addItem({ ...this.props.item, amount: 1 });
  }

  removeItemHandler() {
    this.context.removeItem(this.props.item.id);
  }

  render() {
    return (
        <div className={classes.modal_item_box}>
      <div className={classes.modal_item}>
        <div className={classes.name_amount}>
          <span className={classes.name}>{this.props.item.name}</span>
          <span className={classes.amount}>x {this.props.item.amount}</span>
        </div>
        <div>
          <button className={classes.button} onClick={this.addItemHandler.bind(this)}>+</button>
          <button className={classes.button} onClick={this.removeItemHandler.bind(this)}>-</button>
        </div>
      </div>
      <hr />
      </div>
    );
  }
}

export default ModalItem;
