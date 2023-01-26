import { useReducer } from "react";
import TourContext from "./tour-context";

const defaultData = {
  items: [],
  totalAmount: 0,
};

const tourReducer = (state, action) => {
  if (action.type === "ADD") {
    let totalAmount =
      state.totalAmount + action.item.number * action.item.amount;
    totalAmount = totalAmount.toFixed(2);
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let currentItems = state.items.concat();
    if (existingItemIndex !== -1) {
      // 헷갈리는 점 : 배열을 지정하고 모든 값을 넣어주면 amount도 자동으로 업데이트 되는가?
      let currentAmount = +currentItems[existingItemIndex].amount;
      currentAmount = currentAmount + action.item.amount;
      currentItems[existingItemIndex] = {
        ...currentItems[existingItemIndex],
        amount: currentAmount,
      };
    } else {
      currentItems = currentItems.concat(action.item);
    }

    return {
      items: currentItems,
      totalAmount: +totalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const prevItem = state.items;
    const currentItem = prevItem[existingItemIndex];
    let totalAmount = state.totalAmount - +currentItem.number;
    totalAmount = totalAmount.toFixed(2);
    let updatedItem;

    if (currentItem.amount === 1) {
      updatedItem = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedCurrentItem = {
        ...currentItem,
        amount: currentItem.amount - 1,
      };
      updatedItem = [...state.items];
      updatedItem[existingItemIndex] = updatedCurrentItem;
    }

    return {
      items: updatedItem,
      totalAmount: +totalAmount,
    };
  }

  return defaultData;
};

const TourProvider = (props) => {
  const [tourState, dispatchTourAction] = useReducer(tourReducer, defaultData);

  const addItemHandler = (item) => {
    dispatchTourAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchTourAction({ type: "REMOVE", id: id });
  };

  const tourContext = {
    items: tourState.items,
    totalAmount: tourState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <TourContext.Provider value={tourContext}>
      {props.children}
    </TourContext.Provider>
  );
};

export default TourProvider;
