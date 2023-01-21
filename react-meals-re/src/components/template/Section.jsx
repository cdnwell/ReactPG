import classes from "./Section.module.css";

import Introduce from "../Main/Introduce";
import MainItem from "../Main/MainItem";
import Card from "../UI/Card";

const MESSAGE_ITEMS = [
  "In a food restaurant, some examples of popular meat dishes include:",
  "Steak: A cut of beef that is typically cooked by grilling, pan-frying, or broiling.",
  "Chicken breast: A lean cut of meat that is typically grilled or pan-fried.",
  "Pork chops: A cut of meat from the loin of the pig that is typically grilled or pan-fried.",
];

const MENU_ITEMS = [
  {
    id: "m1",
    menu: "Sushi",
    description:
      "Sushi is a traditional Japanese dish consisting of cooked vinegared rice.",
    price: 24.1,
  },
  {
    id: "m2",
    menu: "Meat roll",
    description:
      "A meat roll is a type of dish that typically consists of meat.",
    price: 35.74,
  },
  {
    id: "m3",
    menu: "Barbecue",
    description:
      "Barbecue (often shortened to BBQ) refers to a method of cooking meat, fish, or vegetables.",
    price: 47,
  },
];

const Section = () => {
  return (
    <div className={classes.section}>
      <Card className={classes['introduce-card']}>
        <Introduce content={MESSAGE_ITEMS} />
      </Card>
      <Card className={classes['main-item-card']}>
        <MainItem item={MENU_ITEMS} />
      </Card>
    </div>
  );
};

export default Section;
