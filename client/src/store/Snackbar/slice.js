import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    showSnackbar: false,
    message: "",
    type: "success",
  },
  reducers: {
    showHideSnackbar: (state, action) => {
      state.showSnackbar = action.payload.isOpen;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { showHideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
