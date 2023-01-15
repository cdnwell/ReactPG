import classes from "./MainText.module.css";

const textItem = [
  "Fine dining restaurants are another popular type of food restaurant. These restaurants have a more upscale atmosphere and typically offer a more extensive menu.",
  "They often have a dress code and may require reservations.",
  "Examples of fine dining restaurants include The French Laundry, Per Se, and Eleven Madison Park.",
  "Food restaurants can also be categorized based on the type of cuisine they serve.",
];

const MainText = (props) => {
  return (
    <div className={props.className}>
      {textItem.map((txt) => {
        return (
          <div key={Math.random().toString()}>
            <span>{txt}</span>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default MainText;
