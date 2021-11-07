import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    // userImage: null,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: state => {
      state.user = null;
    },

    // UserImage: (state, action) => {
    //   state.userImage = action.payload;
    // },
  },
});

export const {login, logout} = UserSlice.actions;

export const selectUser = state => state.user.user;
// export const selectUserImage = state => state.user.UserImage;

export default UserSlice.reducer;
