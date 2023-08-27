import { configureStore } from "@reduxjs/toolkit";
import { productsAPI } from "@/redux/slice/api";

export const store = configureStore({
  reducer: {
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
});
