import { Component } from "react";

import Image from "../UI/Image";

import classes from "./Background.module.css";

const BACKGROUND_IMAGES = [
  { id: "im4", url: "images/turquoise-with-car.jpg" },
  { id: "im1", url: "images/cliff-with_sea.jpg" },
  { id: "im2", url: "images/town-along-the-river.jpg" },
  { id: "im3", url: "images/town-street.jpg" },
  { id: "im4", url: "images/turquoise-with-car.jpg" },
  { id: "im1", url: "images/cliff-with_sea.jpg" },
  { id: "im2", url: "images/town-along-the-river.jpg" },
  { id: "im3", url: "images/town-street.jpg" },
  { id: "im4", url: "images/turquoise-with-car.jpg" },
];

class Background extends Component {
  constructor() {
    super();
    this.state = {
      images: BACKGROUND_IMAGES,
      idx: 5,
      isMoving: false,
    };
  }

  left_image_move() {
    let copied_array = this.state.images.concat();
    for (let i = copied_array.length - 1; i > 0; i--) {
      copied_array[i] = copied_array[i - 1];
    }
    copied_array[0] = copied_array[copied_array.length - 1];

    return copied_array;
  }

  right_image_move() {
    let copied_array = this.state.images.concat();
    for (let i = 0; i < copied_array.length - 1; i++) {
      copied_array[i] = copied_array[i + 1];
    }
    copied_array[copied_array.length - 1] = copied_array[0];

    return copied_array;
  }

  left_move() {
    this.setState({
      idx: this.state.idx - 1,
      isMoving: true,
    });

    let copied_array = this.left_image_move();

    const timeout = setTimeout(() => {
      this.setState({
        isMoving: false,
        idx: this.state.idx + 1,
        images: [...copied_array],
      });
    }, 500);

    return () => clearTimeout(timeout);
  }

  right_move() {
    this.setState({
      idx: this.state.idx + 1,
      isMoving: true,
    });

    let copied_array = this.right_image_move();

    const timeout = setTimeout(() => {
      this.setState({
        isMoving: false,
        idx: this.state.idx - 1,
        images: [...copied_array],
      });
    }, 500);

    return () => clearTimeout(timeout);
  }

  dummy_move() {}

  render() {
    const imageTray = this.state.images.map((item, idx) => (
      <Image key={idx} url={item.url} id={item.id} />
    ));

    return (
      <div className={classes.image_hide_box}>
        <div
          className={`${classes.image_box} ${
            this.state.isMoving ? classes.move_animation : ""
          }`}
          style={{ transform: `translateX(-${this.state.idx}00%)` }}
        >
          {imageTray}
        </div>
        <button
          className={classes.left_arrow}
          onClick={!this.state.isMoving ? this.left_move.bind(this) : this.dummy_move}
        >
          {"<"}
        </button>
        <button
          className={classes.right_arrow}
          onClick={!this.state.isMoving ? this.right_move.bind(this) : this.dummy_move}
        >
          {">"}
        </button>
      </div>
    );
  }
}

export default Background;
