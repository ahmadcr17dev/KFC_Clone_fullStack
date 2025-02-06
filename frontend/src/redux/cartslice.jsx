import { createSlice } from "@reduxjs/toolkit";

// Function to load cart from localStorage
const loadcartfromlocalstorage = () => {
  try {
    const cartdata = localStorage.getItem("cartitem");
    return cartdata ? JSON.parse(cartdata) : [];
  } catch (error) {
    console.log("Error loading cart from localStorage", error);
    return [];
  }
};

// Function to save cart to localStorage
const savecarttolocalstorage = (cart) => {
  localStorage.setItem("cartitem", JSON.stringify(cart));
  localStorage.setItem("cartcount", cart.length);
};

const initialState = {
  items: loadcartfromlocalstorage(),
  counter: 0,
  quantity: 1,
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      savecarttolocalstorage(state.items);
    },
    deletefromcart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      savecarttolocalstorage(state.items);
    },
    increment: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        savecarttolocalstorage(state.items); // Save the updated cart
      }
    },
    decrement: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        savecarttolocalstorage(state.items); // Save the updated cart
      }
    },
    clearcart: (state) => {
      state.items = [];
      localStorage.setItem('cartitem', JSON.stringify(state.items));
      state.cartcount = state.items.length;
    }
  },
});

export const { addtocart, deletefromcart, increment, decrement, clearcart } =
  cartslice.actions;
export default cartslice.reducer;
