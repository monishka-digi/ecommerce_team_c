import { createSlice } from '@reduxjs/toolkit';
import { addToCartAPI } from '../asyncThunks';

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
        state.cartItems = [];
      },
  },
  extraReducers: (builder) => {
    builder
    .addCase(addToCartAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        const { products } = action.payload;
        state.cartItems = [...state.cartItems, ...products];
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {resetCart} = cartSlice.actions;

export default cartSlice.reducer;
