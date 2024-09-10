import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [], // Initialize as an empty array
    isLoading: false,
  },
  reducers: {
    addProduct(state, action) {
      state.data = action.payload;
      state.isLoading = false; // Assuming loading is finished
    },
    setLoading(state, action) {
      state.isLoading = action.payload; // Set loading state
    },
  },
});

export const { addProduct, setLoading } = ProductsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.data;
export const selectIsLoading = (state) => state.products.isLoading;

export default ProductsSlice.reducer;
