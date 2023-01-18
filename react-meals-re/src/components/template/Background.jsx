import { useState } from "react";
import classes from "./Background.module.css";

const IMG_SRC = [
  "hamburger.jpg",
  "meats.jpg",
  "food_dishes.jpg",
  "hamburger.jpg",
];

const Background = () => {
  const [imageTray, setImageTray] = useState(IMG_SRC);
  const [activeIndex, setActiveIndex] = useState(100);
  const [isSlideOn, setIsSlideOn] = useState(false);
  const [isClickAble, setIsClickAble] = useState(true);

  const leftBtnClick = () => {
    setIsSlideOn(true);
    setActiveIndex((prevState) => prevState - 100);
    setIsClickAble(false);
    setTimeout(()=>{
        setIsSlideOn(false);
        setActiveIndex((prevState) => prevState + 100);
        
        const imageDummy = imageTray.concat();

        for(let i=imageDummy.length - 1;i > 0 ;i--){
            imageDummy[i] = imageDummy[i-1];
        }
        imageDummy[0] = imageDummy[imageDummy.length-1];

        setImageTray([...imageDummy]);
        setIsClickAble(true);
    },500);
  };

  const rightBtnClick = () => {
    setIsSlideOn(true);
    setActiveIndex((prevState) => prevState + 100);
    setIsClickAble(false);
    setTimeout(()=>{
        setIsSlideOn(false);
        setActiveIndex((prevState) => prevState - 100);
        
        const imageDummy = imageTray.concat();

        for(let i=0;i<imageDummy.length - 1;i++){
            imageDummy[i] = imageDummy[i+1];
        }
        imageDummy[imageDummy.length-1] = imageDummy[0];

        setImageTray([...imageDummy]);
        setIsClickAble(true);
    },500);
  };

  const dummyClick = () => {};

  return (
    <div className={classes.background}>
      <div className={classes.imageFlowHideBox}>
        <div
          className={`${classes.imageFlowBox} ${isSlideOn ? classes.slideMotion : ''}`}
          style={{ transform: `translateX(-${activeIndex}%)` }}
        >
          {imageTray.map((item) => {
            return <img className={classes.backgroundImage} src={item} />;
          })}
        </div>
      </div>
      <div className={`${classes.imageChangeBox} `}>
        <button className={classes["left-arrow"]} onClick={isClickAble ? leftBtnClick : dummyClick}>
          {"<"}
        </button>
        <button className={classes["round-button"]}></button>
        <button className={classes["round-button"]}></button>
        <button className={classes["round-button"]}></button>
        <button className={classes["right-arrow"]} onClick={isClickAble ? rightBtnClick : dummyClick}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Background;
