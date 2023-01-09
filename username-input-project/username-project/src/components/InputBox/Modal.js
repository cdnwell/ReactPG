import React , { useRef, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget){
        props.onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      style={{ opacity: props.isModalOn ? "1" : "0" }}
      onClick={handleOverlayClick}
    >
      <div
        className={styles.window}
        style={{ opacity: props.isModalOn ? "1" : "0" }}
      >
        <div className={styles.header}>
          <h3>{props.title}</h3>
          <span className={styles.closeButton} onClick={props.onClose}>
            &times;
          </span>
        </div>
        <div className={styles.body}>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
