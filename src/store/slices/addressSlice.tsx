import { createSlice } from '@reduxjs/toolkit';
interface Address {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}
interface AddressState {
  addresses: Address[];
  selectedAddressIndex: number;
}

const initialState: AddressState = {
  addresses: [],
  selectedAddressIndex: 0,
};

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
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
