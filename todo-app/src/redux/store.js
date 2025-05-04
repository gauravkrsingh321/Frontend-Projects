import { configureStore } from "@reduxjs/toolkit";
import todoSlicesReducer from './slices/todoSlices'

export const store = configureStore({
  reducer: todoSlicesReducer
})