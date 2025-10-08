import { configureStore } from "@reduxjs/toolkit";
import theme from "./themeSlice";

export const store = configureStore({
  reducer: {
    theme
  }
});

export default store;

