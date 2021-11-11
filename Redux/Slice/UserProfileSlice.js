import {createSlice} from '@reduxjs/toolkit';

export const UserProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfile: null,
    // userImage: null,
  },

  reducers: {
    userProfileDetails: (state, action) => {
      state.userProfile = action.payload;
    },

    // UserImage: (state, action) => {
    //   state.userImage = action.payload;
    // },
  },
});

export const {userProfileDetails} = UserProfileSlice.actions;

export const selectProfileDetails = state => state.userProfile.userProfile;
// export const selectUserImage = state => state.user.UserImage;

export default UserProfileSlice.reducer;
