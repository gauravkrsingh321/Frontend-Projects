import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from './slices/CartSlice';
export const store = configureStore({
  reducer:{
    cart: cartSliceReducer
  }
})