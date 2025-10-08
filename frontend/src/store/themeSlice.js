import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "jkuat_tracker_theme";

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch (_) {}
  // fallback to prefers-color-scheme
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

const initialState = {
  mode: getInitialTheme()
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_KEY, state.mode);
      } catch (_) {}
    },
    setTheme(state, action) {
      state.mode = action.payload === "dark" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_KEY, state.mode);
      } catch (_) {}
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

