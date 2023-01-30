import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    name : 'Test Item',
    amount : 0,
    totalPrice : 0,
    isCartClicked : false,
}

const itemSlice = createSlice({
    name : "item",
    initialState,
    reducers : {
        addItem(state, action) {
            state.amount += 1;
            state.totalPrice += 6;
        },
        removeItem(state, action) {
            if(state.amount === 0){
                return;
            }
            state.amount -= 1;
            state.totalPrice -= 6;
        },
        onCartButtonClick(state) {
            state.isCartClicked = !state.isCartClicked;
        }
    }
})

const store = configureStore({
    reducer : itemSlice.reducer
})

export const itemActions = itemSlice.actions;

export default store;