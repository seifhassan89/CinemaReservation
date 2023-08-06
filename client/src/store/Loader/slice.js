import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
    skeletonObject: {},
    canShowEmptyState: false,
  },
  reducers: {
    showHideLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setSkeletonObject: (state, action) => {
      state.skeletonObject[action.payload?.field] = action.payload?.value;
    },
    setCanShowEmptyState: (state, action) => {
      state.canShowEmptyState = action.payload;
    },
    clearSkeletonObject: (state) => {
      state.skeletonObject = {};
    },
  },
});

export const {
  showHideLoader,
  setSkeletonObject,
  setCanShowEmptyState,
  clearSkeletonObject,
} = loaderSlice.actions;
export default loaderSlice.reducer;
