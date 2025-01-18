import {createSlice} from "@reduxjs/toolkit";
import { loggedInUser } from "../asyncThunks";

const initialState = {
  user: {},
  loading: false,
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder .addCase(loggedInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.token = action.payload.token
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default userSlice.reducer;
