import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center gap-2 px-2 py-1 rounded border border-white/20 hover:bg-white/10 transition"
    >
      {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm hidden sm:inline">{mode === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

