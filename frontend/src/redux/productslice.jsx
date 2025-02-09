import { createSlice } from "@reduxjs/toolkit";

const loadproductsfromlocalstorage = () => {
  try {
    const productdata = localStorage.getItem("products");
    return productdata ? JSON.parse(productdata) : [];
  } catch (error) {
    console.log("Error in loading products from Local Storage: ", error);
    return [];
  }
};

const saveproductstolocalstorage = (item) => {
  localStorage.setItem("products", JSON.stringify(item));
};

const initialState = {
  items: loadproductsfromlocalstorage(),
  quantity: 0,
};

const productslice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addtoproceed: (state, action) => {
      const existeditem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existeditem) {
        existeditem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveproductstolocalstorage(state.items);
    },
  },
});

export const { addtoproceed } = productslice.actions;
export default productslice.reducer;
