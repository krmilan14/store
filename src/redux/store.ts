import ProductReducer from "./slices/ProductsSlice";
import WishlistReducer from "./slices/WishlistSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    wishlist: WishlistReducer
  },
});
