
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slice/authSlice";
import locationReducer from "./slice/locationSlice";
import driverReducer from "./slice/driverSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  driver: driverReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 2,
  migrate: async (state) => {
    if (!state) return state;

    return {
      ...state,
      auth: {
        ...state.auth,
        loginUser: state?.auth?.loginUser ?? null,
      },
      location: {
        userLatitude: state?.location?.userLatitude ?? null,
        userLongitude: state?.location?.userLongitude ?? null,
        userAddress: state?.location?.userAddress ?? null,
        destinationLatitude: state?.location?.destinationLatitude ?? null,
        destinationLongitude: state?.location?.destinationLongitude ?? null,
        destinationAddress: state?.location?.destinationAddress ?? null,
      },
    };
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


