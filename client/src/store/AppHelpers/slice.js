import { createSlice } from "@reduxjs/toolkit";

export const appHelpersSlice = createSlice({
  name: "appHelpers",
  initialState: {
    appBarTitle: "",
    showFilters: false,
    appBarContent: <></>,
    appBarMobileContent: [],
  },
  reducers: {
    setAppBarTitle: (state, action) => {
      state.appBarTitle = action.payload;
    },
    toggleShowFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    setShowFilters: (state, action) => {
      state.showFilters = action.payload;
    },
    setAppBarContent: (state, action) => {
      state.appBarContent = action.payload;
    },
    setAppBarMobileContent: (state, action) => {
      state.appBarMobileContent = action.payload;
    },
  },
});

export const {
  setAppBarTitle,
  toggleShowFilters,
  setShowFilters,
  setAppBarContent,
  setAppBarMobileContent,
} = appHelpersSlice.actions;
export default appHelpersSlice.reducer;
