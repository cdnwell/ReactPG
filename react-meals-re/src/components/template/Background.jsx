import { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Background.module.css";

const IMG_SRC = [
  { id: 2, src: "hamburger.jpg" },
  { id: 0, src: "meats.jpg" },
  { id: 1, src: "food_dishes.jpg" },
  { id: 2, src: "hamburger.jpg" },
  { id: 0, src: "meats.jpg" },
  { id: 1, src: "food_dishes.jpg" },
  { id: 2, src: "hamburger.jpg" },
];

const Background = () => {
  const [imageTray, setImageTray] = useState(IMG_SRC);
  const [activeIndex, setActiveIndex] = useState(400);
  const [isSlideOn, setIsSlideOn] = useState(false);
  const [isClickAble, setIsClickAble] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const leftBtnClick = () => {
    setIsSlideOn(true);
    setActiveIndex((prevState) => prevState - 100);
    setIsClickAble(false);
    setTimeout(() => {
      setIsSlideOn(false);
      setActiveIndex((prevState) => prevState + 100);

      const imageDummy = imageTray.concat();

      for (let i = imageDummy.length - 1; i > 0; i--) {
        imageDummy[i] = imageDummy[i - 1];
      }
      imageDummy[0] = imageDummy[imageDummy.length - 1];

      setImageTray([...imageDummy]);
      setIsClickAble(true);
      setCurrentIndex(imageDummy[1].id);
    }, 500);
    return;
  };

  const rightBtnClick = () => {
    setIsSlideOn(true);
    setActiveIndex((prevState) => prevState + 100);
    setIsClickAble(false);
    setTimeout(() => {
      setIsSlideOn(false);
      setActiveIndex((prevState) => prevState - 100);

      const imageDummy = imageTray.concat();

      for (let i = 0; i < imageDummy.length - 1; i++) {
        imageDummy[i] = imageDummy[i + 1];
      }
      imageDummy[imageDummy.length - 1] = imageDummy[0];

      setImageTray([...imageDummy]);
      setIsClickAble(true);
      setCurrentIndex(imageDummy[1].id);
    }, 500);
    return;
  };

  const rightBtnDbClick = () => {
    setIsSlideOn(true);
    setActiveIndex((prevState) => prevState + 200);
    setIsClickAble(false);
    setTimeout(() => {
      setIsSlideOn(false);
      setActiveIndex((prevState) => prevState - 200);

      const imageDummy = imageTray.concat();

      for (let i = 0; i < imageDummy.length - 1; i++) {
        imageDummy[i] = imageDummy[i + 1];
      }
      imageDummy[imageDummy.length - 1] = imageDummy[0];

      for (let i = 0; i < imageDummy.length - 1; i++) {
        imageDummy[i] = imageDummy[i + 1];
      }
      imageDummy[imageDummy.length - 1] = imageDummy[0];

      setImageTray([...imageDummy]);
      setIsClickAble(true);
      setCurrentIndex(imageDummy[1].id);
    }, 500);
    return;
  };

  const leftBtnDbClick = () => {
    setIsSlideOn(true);
    setActiveIndex((prevState) => prevState - 200);
    setIsClickAble(false);
    setTimeout(() => {
      setIsSlideOn(false);
      setActiveIndex((prevState) => prevState + 200);

      const imageDummy = imageTray.concat();

      for (let i = imageDummy.length - 1; i > 0; i--) {
        imageDummy[i] = imageDummy[i - 1];
      }
      imageDummy[0] = imageDummy[imageDummy.length - 1];

      for (let i = imageDummy.length - 1; i > 0; i--) {
        imageDummy[i] = imageDummy[i - 1];
      }
      imageDummy[0] = imageDummy[imageDummy.length - 1];

      setImageTray([...imageDummy]);
      setIsClickAble(true);
      setCurrentIndex(imageDummy[1].id);
    }, 500);
    return;
  };

  const dummyClick = () => {};

  const currentIndexCnt0 = currentIndex === 0 ? classes.currentBtn : "";
  const currentIndexCnt1 = currentIndex === 1 ? classes.currentBtn : "";
  const currentIndexCnt2 = currentIndex === 2 ? classes.currentBtn : "";

  const firstIdxClicked = () => {
    if (currentIndex === 0) return;
    if (currentIndex === 1) {
      leftBtnClick();
    }
    if (currentIndex === 2) {
      leftBtnDbClick();
    }
  };

  const secondIdxClicked = () => {
    if (currentIndex === 1) return;
    if (currentIndex === 0) {
      rightBtnClick();
      return;
    }
    if (currentIndex === 2) {
      leftBtnClick();
    }
  };

  const thirdIdxClicked = () => {
    if (currentIndex === 2) return;
    if (currentIndex === 0) {
      rightBtnDbClick();
    }
    if (currentIndex === 1) {
      rightBtnClick();
    }
  };

  return (
    <div className={classes.background}>
      <div className={classes.imageFlowHideBox}>
        <div
          className={`${classes.imageFlowBox} ${
            isSlideOn ? classes.slideMotion : ""
          }`}
          style={{ transform: `translateX(-${activeIndex}%)` }}
        >
          {imageTray.map((item, idx) => {
            return (
              <img
                key={idx}
                className={classes.backgroundImage}
                src={item.src}
              />
            );
          })}
        </div>
      </div>

      {ReactDOM.createPortal(
        <div className={classes["buttons-box"]}>
          <button
            className={classes["left-arrow"]}
            onClick={isClickAble ? leftBtnClick : dummyClick}
          >
            {"<"}
          </button>
          <button
            className={`${classes["round-button"]} ${currentIndexCnt0}`}
            onClick={firstIdxClicked}
          ></button>
          <button
            className={`${classes["round-button"]} ${currentIndexCnt1}`}
            onClick={secondIdxClicked}
          ></button>
          <button
            className={`${classes["round-button"]} ${currentIndexCnt2}`}
            onClick={thirdIdxClicked}
          ></button>
          <button
            className={classes["right-arrow"]}
            onClick={isClickAble ? rightBtnClick : dummyClick}
          >
            {">"}
          </button>
        </div>,
        document.getElementById("button-box")
      )}
    </div>
  );
};

export default Background;
