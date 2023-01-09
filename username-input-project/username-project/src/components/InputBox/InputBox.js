import { useState } from "react";
import Modal from "./Modal";

import styles from "./InputBox.module.css";

const InputBox = props => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);

  const onChangeName = (event) => {
    setUserName(event.target.value);
  };

  const onChangeAge = (event) => {
    setUserAge(event.target.value);
  };

  const onSubmitUserInfo = (event) => {
    event.preventDefault();

    if( userName.trim().length === 0 || userAge.trim().length === 0) {
      setIsModalOn(true);
      return false;
    }

    if (userAge < 0) {
      setIsModalOn(true);
      return false;
    }

    const itemsData = {
      id : Math.random().toString(),
      content : `${userName} (${userAge} Years)`
    }

    props.onAddItems(itemsData);
    setUserAge('');
    setUserName('');
  };

  return (
    <>
      <form className={`${styles.inputBox}`} onSubmit={onSubmitUserInfo}>
        <div className={`${styles.userNameBox}`}>
          <label>User Name</label>
          <input onChange={onChangeName} />
        </div>
        <div className={`${styles.userAgeBox}`}>
          <label>Age(Years)</label>
          <input onChange={onChangeAge} />
        </div>
        <button>Add User</button>
      </form>
      { isModalOn && 
      <Modal isModalOn={setIsModalOn} onClose={() => setIsModalOn(false)} title="Modal Title"> 
        <p>입력 값을 정확히 입력해주세요.</p>
      </Modal>}
    </>
  );
};

export default InputBox;
