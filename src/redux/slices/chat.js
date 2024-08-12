import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationCount: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationsCount: (state) => {
      state.notificationCount = 0;
    },
  },
});

const { incrementNotificationCount, resetNotificationsCount } =
  chatSlice.actions;

export default chatSlice;
