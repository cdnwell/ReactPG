import classes from "./MainItem.module.css";

import MenuItem from "../Menu/MenuItem";

const MainItem = (props) => {
  const menu_map = props.item.map((item) => (
    <MenuItem
      key={item.id}
      id={item.id}
      menu={item.menu}
      price={item.price}
      description={item.description}
    />
  ));

  return <div className={classes["main-item"]}>{menu_map}</div>;
};

export default MainItem;
