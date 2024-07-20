import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null, // Add token to state
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userExits: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // Store the token
      state.loader = false;
      // Store data in localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    },
    userNotExits: (state) => {
      state.user = null;
      state.token = null;
      state.loader = false;
      // Remove data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});
export const { userExits, userNotExits } = authSlice.actions;
export default authSlice;
