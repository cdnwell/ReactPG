import { Component } from "react";

import classes from "./Introduce.module.css";

import { GrRefresh } from "react-icons/gr";
import TourList from "./TourList";

class Introduce extends Component {
  constructor() {
    super();
    this.state = {
      buttonClicked: true,
    };
  }

  onButtonClick = () => {
    this.props.onClick(this.state.buttonClicked);
  };

  render() {
    const introduce_tray = this.props.items.map((item, idx) => (
      <div key={idx}>
        <span>{item}</span>
        <br />
      </div>
    ));

    return (
      <div
        className={`${this.props.className} ${classes.introduce_root}`}
        style={this.props.style}
      >
        <div className={classes.introduce}>
          {introduce_tray}
          <div className={classes.refresh_icon} onClick={this.onButtonClick}>
            <GrRefresh />
          </div>
        </div>
        <div className={classes.tour_list}>
          <TourList list={this.props.list} />
        </div>
      </div>
    );
  }
}

export default Introduce;
