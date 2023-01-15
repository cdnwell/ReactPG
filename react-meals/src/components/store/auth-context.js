import React, { useState } from "react";

const AuthContext = React.createContext({
  cartItem: [],
  plusCount: () => {},
  minusCount: () => {},
});

export const AuthProvider = (props) => {
  const [cartItem, setCartItem] = useState([{ menu_name: "Sushi", menu_price: 22.99, menu_ea: 1 }]);
  const [count, setCount] = useState(0);

  const plusCount = () => {
    if (count === 100) return;

    setCount(count + 1);
  };

  const minusCount = () => {
    if (count === 0) return;

    setCount(count - 1);
  };

  return (
    <AuthContext.Provider
      value={{
        cartItem,
        plusCount,
        minusCount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
