import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLatitude: (state, action) => {
      state.userLatitude = action.payload;
    },
    setUserLongitude: (state, action) => {
      state.userLongitude = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setDestinationLatitude: (state, action) => {
      state.destinationLatitude = action.payload;
    },
    setDestinationLongitude: (state, action) => {
      state.destinationLongitude = action.payload;
    },
    setDestinationAddress: (state, action) => {
      state.destinationAddress = action.payload;
    },
  },
});
// destructuring declaration
export const {
  setUserLatitude,
  setUserLongitude,
  setUserAddress,
  setDestinationLatitude,
  setDestinationLongitude,
  setDestinationAddress,
} = locationSlice.actions;

export default locationSlice.reducer;
