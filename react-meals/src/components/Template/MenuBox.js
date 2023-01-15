import FoodItem from "../Content/FoodItem";

const menuItems = [
  {
    menu_name: "Sushi",
    menu_explain: "Finest fish and veggies",
    menu_price: "$22.99",
  },
  {
    menu_name: "Schnitzel",
    menu_explain: "A german specialty!",
    menu_price: "$16.50",
  },
  {
    menu_name: "Barbecue Burger",
    menu_explain: "American, raw, meaty",
    menu_price: "$12.99",
  },
  {
    menu_name: "Green Bowl",
    menu_explain: "Healthy... and green...",
    menu_price: "$18.99",
  },
];

const MenuBox = (props) => {
  return (
    <div className={props.className}>
      {menuItems.map((item) => {
        return (
          <div key={item.menu_name}>
            <FoodItem
              menu_name={item.menu_name}
              menu_explain={item.menu_explain}
              menu_price={item.menu_price}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default MenuBox;
