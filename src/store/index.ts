import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import categoryReducer from "./slices/categorySlice"


const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
