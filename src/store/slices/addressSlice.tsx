import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'addresses',
  initialState: {
    addresses: [],
    selectedAddressIndex: 0,
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    setSelectedAddressIndex: (state, action) => {
      state.selectedAddressIndex = action.payload;
    },
  },
});

export const { addAddress, setSelectedAddressIndex } = addressSlice.actions;

export default addressSlice.reducer;
