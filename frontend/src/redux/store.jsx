import { configureStore } from "@reduxjs/toolkit";
import cartslice from "./cartslice";

export const store = configureStore({
  reducer: {
    cart: cartslice,
  },
  devTools: true,
});
