import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // use a key name, not 'cartReducer'
  },
});

// Custom selector hook (optional, just re-exporting useSelector)
export const useAppSelector = useSelector;
