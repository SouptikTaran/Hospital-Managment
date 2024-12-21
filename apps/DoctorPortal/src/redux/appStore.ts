import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Configure the Redux store with type safety
const appStore = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof appStore.getState>;

// Define AppDispatch type based on the store's dispatch
export type AppDispatch = typeof appStore.dispatch;

// Export the configured store
export default appStore;
