import FoodItem from "../Content/FoodItem";

const MENU_ITEMS = [
  {
    id: "m1",
    menu_name: "Sushi",
    menu_explain: "Finest fish and veggies",
    menu_price: 22.99,
  },
  {
    id: "m2",
    menu_name: "Schnitzel",
    menu_explain: "A german specialty!",
    menu_price: 16.50,
  },
  {
    id: "m3",
    menu_name: "Barbecue Burger",
    menu_explain: "American, raw, meaty",
    menu_price: 12.99,
  },
  {
    id: "m4",
    menu_name: "Green Bowl",
    menu_explain: "Healthy... and green...",
    menu_price: 18.99,
  },
];

const MenuBox = (props) => {
  return (
    <div className={props.className}>
      {MENU_ITEMS.map((item) => {
        return (
          <FoodItem
            key={item.id}
            id={item.id}
            menu_name={item.menu_name}
            menu_explain={item.menu_explain}
            menu_price={item.menu_price}
          />
        );
      })}
    </div>
  );
};

export default MenuBox;
