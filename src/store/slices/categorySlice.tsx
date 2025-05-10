import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, fetchCaterotyProducts } from '../asyncThunks';

interface Category {
  id: string;
  name: string;
  slug: string;
}
interface CategoryState {
  categories: Category[];
  categoryProducts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
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
