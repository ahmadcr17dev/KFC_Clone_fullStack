import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productslice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productincrement: (state, action) => {
      const productitem = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (productitem) {
        productitem.quantity += 1;
      }
    },
  },
});

export const { productincrement } = productslice.actions;
export default productslice.reducer;
