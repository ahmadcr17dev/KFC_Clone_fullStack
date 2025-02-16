import { createSlice } from "@reduxjs/toolkit";

const loadwishlistfromlocalstorage = () => {
  try {
    const wishlistdata = localStorage.getItem("wishlist");
    return wishlistdata ? JSON.parse(wishlistdata) : [];
  } catch (error) {
    console.log("Error in loading wishlist from localstorage:", error);
    return [];
  }
};

const savewishlisttolocalstorage = (wish) => {
  localStorage.setItem("wishlist", JSON.stringify(wish));
  localStorage.setItem("wishcount", wish.length);
};

const initialState = {
  items: loadwishlistfromlocalstorage(),
  counter: 0,
  quantity: 1,
};

const wishslice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addtowishlist: (state, action) => {
      const existeditem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existeditem) {
        existeditem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      savewishlisttolocalstorage(state.items);
    },
    deletefromwishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      savewishlisttolocalstorage(state.items);
    },
    clearwishlist: (state) => {
      state.items = [];
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      state.cartcount = state.items.length;
    },
  },
});

export const { addtowishlist, deletefromwishlist, clearwishlist } =
  wishslice.actions;
export default wishslice.reducer;
