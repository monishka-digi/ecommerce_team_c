import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchCaterotyProducts } from '../asyncThunks';

const initialState = {
  categories: [],
  categoryProducts: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCaterotyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaterotyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchCaterotyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
