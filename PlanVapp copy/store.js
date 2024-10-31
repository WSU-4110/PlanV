import { configureStore } from "@reduxjs/toolkit";
import savedSliceReducer from './SavedReducer';  // Adjusted path to the PlanV folder

// Create the store and combine reducers
const store = configureStore({
  reducer: {
    booking: savedSliceReducer,  // Register the booking reducer
  },
});

export default store;
