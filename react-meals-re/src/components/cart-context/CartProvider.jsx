import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items : [],
    totalAmount : 0,
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmount = 
        state.totalAmount + action.item.price * action.item.amount;
        // findIndex(JS 내장 함수)는 함수가 true일 경우 index를 반환한다.
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount,
            };
            
        }

    }
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type : "ADD", item : item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type : "REMOVE", id : id });
    };

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler,
        removeItem : removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;