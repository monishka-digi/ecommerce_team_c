import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);