import { useEffect, useState } from 'react';

import classes from "./BgImage.module.css";

const imageItems = [
    'images/dessert.jpg',
    'images/chocolate-cake.jpg',
    'images/meat-dish.jpg'
];

const BgImage = (props) => {
    const [imageNum, setImageNum] = useState(0);
    const [imageClass, setImageClass] = useState('');

    useEffect(() => {
        const timeout = setTimeout(()=> {
            setImageClass(classes.blur);
        }, 4000);

        return () => clearTimeout(timeout);
    },[]);

    useEffect(() => {
        const interval = setInterval(()=>{
            setImageClass(classes.clear);
            if (imageNum === imageItems.length - 1){
                setImageNum(0);
            } else {
                setImageNum(imageNum + 1);
            }
            setTimeout(()=> {
                setImageClass(classes.blur);
            }, 4000);
        }, 6000);

        return () => clearInterval(interval);
    }, [imageNum]);

  return (
    <img
      className={`${classes.background_image} ${imageClass}`}
      src={imageItems[imageNum]}
      alt="음식과 배경.jpg"
    />
  );
};

export default BgImage;
