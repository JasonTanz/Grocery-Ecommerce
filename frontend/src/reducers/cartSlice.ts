import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cart_qty: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      state.cart_qty = action.payload.cart_qty;
    },

    CLEAR_CART: (state) => {
      state.cart_qty = 0;
    },
    UPDATECART: (state, action: PayloadAction<any>) => {
      state.cart_qty = action.payload.cart_qty;
    },
  },
});

export const { ADD_TO_CART, CLEAR_CART, UPDATECART } = cartSlice.actions;
export default cartSlice.reducer;
