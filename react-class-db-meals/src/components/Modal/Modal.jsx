import { Component } from "react";
import TourContext from "../store/tour-context";

import classes from "./Modal.module.css";
import ModalItem from "./ModalItem";

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      totalAmount: 0,
    };
  }

  static contextType = TourContext;

  storeContextItem() {
    this.setState({
      items: this.context.items,
      totalAmount: this.context.totalAmount,
    });
  }

  isModalClicked() {
    this.props.onClick();
  }

  componentDidMount() {
    this.storeContextItem();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.items !== this.context.items) {
      this.storeContextItem();
    }
  } 


  render() {
    const modalTray = this.state.items.map((item) => {
      return <ModalItem key={item.id} item={item} />;
    });

    return (
      <div>
        <div
          className={classes.background_overlay}
          onClick={this.isModalClicked.bind(this)}
        ></div>
        <div className={classes.modal}>
          {modalTray}
          <div className={classes.total_amount_box}>
            <span className={classes.total_amount}>Total Amount :</span>
            <span className={classes.total_amount_price}>$ {this.state.totalAmount}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
