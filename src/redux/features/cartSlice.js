import { createSlice } from "@reduxjs/toolkit";

// ✅ Load cart items from sessionStorage (if any)
const storedCart = sessionStorage.getItem("cartItems");
const initialState = {
  cartItems: storedCart ? JSON.parse(storedCart) : [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.some(
        (cartItem) => cartItem._id === item._id
      );

      if (!exists) {
        state.cartItems.push(item);
        sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      sessionStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cart.actions;
export default cart.reducer;
