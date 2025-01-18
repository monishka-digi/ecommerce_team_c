import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const loggedInUser = createAsyncThunk(
    "auth/loggedInUser",
    async (payload, { rejectWithValue }) => {
      console.log("payload111111", payload)
      try {
        const response = await axiosInstance.post(
          "https://dummyjson.com/auth/login",
          payload,
          { withCredentials: true }
        );
        console.log("********", response);
        // if (response?.data?.success === false) {
        //   return rejectWithValue(response?.data?.errorMessage);
        // }
        return response?.data;
      } catch (error) {
        return rejectWithValue(error.message || "An error occurred during login");
      }
    }
  );
