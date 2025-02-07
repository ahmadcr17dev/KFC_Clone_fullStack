import { configureStore } from "@reduxjs/toolkit";
import cartslice from "./cartslice";
import wishslice from "./wishslice";
import productslice from "./productslice";

export const store = configureStore({
  reducer: {
    cart: cartslice,
    wish: wishslice,
    product: productslice,
  },
  devTools: true,
});
