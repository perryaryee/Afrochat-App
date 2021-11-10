import {createSlice} from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: ' Open_Modal',
  initialState: {
    Open_Modal: false,
  },

  reducers: {
    Show_Modal: (state, action) => {
      state.Open_Modal = true;
    },

    Close_Modal: (state, action) => {
      state.Open_Modal = false;
    },
  },
});

export const {Show_Modal, Close_Modal} = modalSlice.actions;

export const selectModal = state => state.Open_Modal.Open_Modal;

export default modalSlice.reducer;
