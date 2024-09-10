import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreProduct, WishlistState } from "../../common/types";

const initialState: WishlistState = {
  data: [],
};
const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishList(state, action: PayloadAction<StoreProduct>) {
      let tempData = state.data;
      tempData.push(action.payload);
      state.data = tempData;
    },
  },
});

export const { addWishList} = WishlistSlice.actions;
export default WishlistSlice.reducer;
