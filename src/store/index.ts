import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import categoryReducer from "./slices/categorySlice"
import productReducer from "./slices/productSlice"


const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  products: productReducer,

});

export const store = configureStore({
  reducer: rootReducer,
});
