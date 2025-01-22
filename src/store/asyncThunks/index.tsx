import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import API_ENDPOINTS from "../../constants/apiConstant";

export const loggedInUser = createAsyncThunk(
    "auth/loggedInUser",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.LOGIN,
          payload,
        );
        return response?.data;
      } catch (error) {
        return rejectWithValue(error.message || "An error occurred during login");
      }
    }
  );

  export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch categories');
      }
    }
  );

  export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
      try {
      const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS);
      return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch products');
      }
    }
  );

  export const fetchCaterotyProducts = createAsyncThunk(
    'products/fetchCaterotyProducts',
    async (categoryName, { rejectWithValue }) => {
      try {
      const response = await axiosInstance.get(API_ENDPOINTS.CATEGORY_PRODUCTS(categoryName));
      return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch category products');
      }
    }
  );

  export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async ( payload , { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADD_TO_CART, payload);
      return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to add products in cart');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
    const response = await axiosInstance.get(API_ENDPOINTS.SEARCH_PRODUCTS(query));
    return response?.data; 
  } catch (error) {
    return rejectWithValue(error?.response?._data || 'Failed to search products');
}
  }
);

