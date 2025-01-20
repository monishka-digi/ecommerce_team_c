import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import categoryReducer from "./slices/categorySlice"
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"
import addressReducer from "./slices/addressSlice"

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
  addresses: addressReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
