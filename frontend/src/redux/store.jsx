import { configureStore } from "@reduxjs/toolkit";
import cartslice from "./cartslice";
import wishslice from "./wishslice";

export const store = configureStore({
  reducer: {
    cart: cartslice,
    wish: wishslice,
  },
  devTools: true,
});
