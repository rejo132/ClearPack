import React from "react";

export default function GlassCard({ className = "", children }) {
  return (
    <div
      className={
        "rounded-2xl shadow-md border border-white/15 bg-white/20 " +
        "backdrop-blur-md dark:bg-slate-900/30 dark:border-white/10 " +
        className
      }
    >
      {children}
    </div>
  );
}

