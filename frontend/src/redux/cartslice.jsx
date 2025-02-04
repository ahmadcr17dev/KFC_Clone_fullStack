import { createSlice } from "@reduxjs/toolkit";

const loadcartfromlocalstorage = () => {
  try {
    const cartdata = localStorage.getItem("cartitem");
    return cartdata ? JSON.parse(cartdata) : [];
  } catch (error) {
    console.log("Error in loading cart from localstorage", error);
    return [];
  }
};

const savecarttolocalstorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
    items: loadcartfromlocalstorage(),
    counter: 0,
}

const updatecartforlocalstorage = (cartitem) => {
    localStorage.setItem('cartitem', JSON.stringify(cartitem));
    localStorage.setItem('cartcount', cartitem.length);
}

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('cartitem', JSON.stringify(state.items));
      state.cartcount = state.items.length;
      console.log('new product:', localStorage.getItem('cartitem'));
      updatecartforlocalstorage(state.items);
    },
  },
});

export const { addtocart } = cartslice.actions;
export default cartslice.reducer;
