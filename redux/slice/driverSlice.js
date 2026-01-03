import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    drivers: [],
    selectedDriver: null,

}

const driverSlice = createSlice({
    name: "driver",
    initialState,
    reducers: {
        setDrivers: (state, action) => {
            state.drivers = action.payload;
        },
        setSelectedDriver: (state, action) => {
            state.selectedDriver = action.payload;
        },
        clearDrivers: (state) => {
            state.drivers = null;
        },
        clearSelectedDriver: (state) => {
            state.selectedDriver = null;
        },
    },
});
// destructuring declaration
export const { setDrivers, setSelectedDriver, clearDrivers, clearSelectedDriver } = driverSlice.actions;

export default driverSlice.reducer;
