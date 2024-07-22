import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.js';
import api from './api/api.js';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
