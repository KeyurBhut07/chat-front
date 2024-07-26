import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.js';
import api from './api/api.js';
import miscSlice from './slices/misc.js';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
