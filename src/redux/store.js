import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.js';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});

export default store;
