import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const loggedInUser = createAsyncThunk(
    "auth/loggedInUser",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(
          "https://dummyjson.com/auth/login",
          payload,
          { withCredentials: true }
        );
        console.log("loggedInUser", response)
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
        const response = await axiosInstance.get('https://dummyjson.com/products/categories');
        console.log("fetchCategories", response)
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
      const response = await axiosInstance.get('https://dummyjson.com/products');
      console.log("fetchProducts", response)
      return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch products');
      }
    }
  );
