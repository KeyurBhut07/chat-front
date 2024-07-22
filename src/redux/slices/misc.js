import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobileMenuFriend: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: '',
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
  },
});
export const {} = miscSlice.actions;
export default miscSlice;
