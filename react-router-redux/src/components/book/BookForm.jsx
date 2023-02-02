import { useRef, useState } from "react";

import classes from "./BookForm.module.css";

const BookForm = (props) => {
    const [posData, setPosData] = useState(props.posData);

  const nameRef = useRef();
  const phoneRef = useRef();
  const textRef = useRef();

  const submitBookHandler = (event) => {
    event.preventDefault();

    console.log('이름',nameRef.current.value);
    console.log('전화번호',phoneRef.current.value);
    console.log('내용',textRef.current.value);
    console.log('위치', props.posData);
  };

  return (
    <form onSubmit={submitBookHandler}>
      <p>
        예약자 성함
        <input type="text" ref={nameRef} />
      </p>
      <p>
        전화번호
        <input type="text" ref={phoneRef} />
      </p>
      <p></p>
      <p>예약 사항</p>
      <textarea name="" cols="30" rows="10" ref={textRef}></textarea>
      <button>제출</button>
    </form>
  );
};

export default BookForm;
