import classes from "./FoodItem.module.css";

const FoodItem = (props) => {
  return (
    <div className={`${props.className} ${classes.food_item}`}>
      <div className={`${classes.food_item__menu}`}>
        <span className={`${classes.food_item__menu_name}`}>{props.menu_name}</span>
        <span className={`${classes.food_item__menu_explain}`}>{props.menu_explain}</span>
        <span className={`${classes.food_item__menu_price}`}>{props.menu_price}</span>
      </div>
      <div className={`${classes.food_item__buttons}`}>
        <div className={`${classes.food_item__amount}`}>
          <span>Amount</span>
          <input type="number" min="1" max="100" placeholder="1"/>
        </div>
        <button>+ Add</button>
      </div>
    </div>
  );
};

export default FoodItem;
