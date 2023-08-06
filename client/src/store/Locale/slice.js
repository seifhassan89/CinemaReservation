import { createSlice } from "@reduxjs/toolkit";

export const localeSlice = createSlice({
  name: "locale",
  initialState: {
    locale: localStorage.getItem("locale") || "en",
    isRtl:
      !!localStorage.getItem("locale") &&
      localStorage.getItem("locale") !== "en",
  },
  reducers: {
    toggleLocale: (state) => {
      localStorage.setItem("locale", state.locale === "en" ? "ar" : "en");
      state.locale = state.locale === "en" ? "ar" : "en";
      state.isRtl = !state.isRtl;
    },
  },
});

export const { toggleLocale } = localeSlice.actions;
export default localeSlice.reducer;
