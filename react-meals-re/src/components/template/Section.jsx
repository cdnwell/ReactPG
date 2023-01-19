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

const Section = () => {
  return (
    <>
      <Card>
        <Introduce content={MESSAGE_ITEMS} />
      </Card>
      <Card>
        <MainItem />
      </Card>
    </>
  );
};

export default Section;
