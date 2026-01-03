import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLatitude: null,
    userLongitude: null,
    destinationLatitude: null,
    destinationLongitude: null

}

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
        setDestinationLatitude: (state, action) => {
            state.destinationLatitude = action.payload;
        },
        setDestinationLongitude: (state, action) => {
            state.destinationLongitude = action.payload;
        },

    },
});
// destructuring declaration
export const { setUserLatitude, setUserLongitude, setDestinationLatitude, setDestinationLongitude } = locationSlice.actions;

export default locationSlice.reducer;
