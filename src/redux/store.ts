import { configureStore } from "@reduxjs/toolkit";
import { productsAPI } from "@/redux/slice/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});
setupListeners(store.dispatch);
