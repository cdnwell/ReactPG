import { Component } from "react";

import classes from './Image.module.css';

class Image extends Component {
  render() {
    return (
      <>
        <img src={this.props.url} className={classes.image} alt="백그라운드 이미지.jpg" />
      </>
    );
  }
}

export default Image;
