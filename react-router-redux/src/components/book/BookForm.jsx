import { useRef, useState } from "react";

import Calendar from "../api/Calendar";

import classes from "./BookForm.module.css";

const BookForm = (props) => {
  const [posData, setPosData] = useState(props.posData);

  const nameRef = useRef();
  const phoneRef = useRef();
  const textRef = useRef();

  const submitBookHandler = (event) => {
    event.preventDefault();

    console.log("이름", nameRef.current.value);
    console.log("전화번호", phoneRef.current.value);
    console.log("내용", textRef.current.value);
    console.log("위치", props.posData);

    setPosData(props.posData);
  };

  return (
    <form className={classes.book_form} onSubmit={submitBookHandler}>
      <p className={classes.name_p}>
        예약자 성함
        <input className={classes.name_input} type="text" ref={nameRef} />
      </p>
      <p className={classes.phone_p}>
        전화번호
        <input className={classes.phone_input} type="text" ref={phoneRef} />
      </p>
      <p>예약일</p>
      <Calendar />
      <p className={classes.book_p}>예약 사항</p>
      <textarea
        className={classes.textarea}
        cols="30"
        rows="10"
        ref={textRef}
      ></textarea>
      <button className={classes.submit_button}>제출</button>
    </form>
  );
};

export default BookForm;
