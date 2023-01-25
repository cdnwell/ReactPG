import { Component } from "react";

import classes from "./SendForm.module.css";

import { GrRefresh } from "react-icons/gr";

class SendForm extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      name: "",
      text : "",
    };
  }

  input_number(e) {
    const number = e.target.value;
    const onlyNumber = number.replace(/[^0-9]/g, "");
    this.setState({
      number: onlyNumber,
    });
  }

  input_name(e) {
    const name = e.target.value;
    this.setState({
      name : name,
    })
  }

  input_text(e) {
    const text = e.target.value;
    this.setState({
      text : text,
    })
  }

  async form_submit(event) {
    event.preventDefault();

    const data = {
      name : this.state.name,
      number : this.state.number,
      text : this.state.text
    };

    // console.log(data);
    // console.log('json',JSON.stringify(data));

    const response = await fetch('https://react-http-73797-default-rtdb.firebaseio.com/tour-list.json',{
      method : 'POST',
      body : JSON.stringify(data),
      headers : {
        'Content-Type' : 'application/json',
      }
    });

    await alert('글이 성공적으로 전송되었습니다.');
    await this.setState({
      name : '',
      number : '',
      text : '',
    })
  }

  onRefreshBtnClick() {
    this.props.onClick();
  }

  render() {
    return (
      <form
        className={`${this.props.className} ${classes.send_form}`}
        style={this.props.style}
        onSubmit={this.form_submit.bind(this)}
      >
        <div className={classes.text_box}>
          <p>Write about a tour description</p>
          <p>
            <label htmlFor="name">Tour name :</label>
            <input
              className={classes.name_input}
              id="name"
              type="text"
              onChange={this.input_name.bind(this)}
              value={this.state.name}
            />
          </p>
          <p>
            <label htmlFor="price">Tour price :</label>
            <input
              className={classes.price_input}
              id="price"
              type="text"
              onChange={this.input_number.bind(this)}
              value={this.state.number}
            />
          </p>
          <label htmlFor="description" className={classes.dsc_label}>
            Description :{" "}
          </label>
          <textarea
            className={classes.description}
            id="description"
            cols="32"
            rows="10"
            value={this.state.text}
            onChange={this.input_text.bind(this)}
          ></textarea>
          <button className={classes.button}>Submit</button>
        </div>
        <div
          className={classes.refresh_btn}
          onClick={this.onRefreshBtnClick.bind(this)}
        >
          <GrRefresh />
        </div>
      </form>
    );
  }
}

export default SendForm;
