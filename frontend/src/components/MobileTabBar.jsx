import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart3, ClipboardList, User } from "lucide-react";

const Tab = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "flex flex-col items-center justify-center text-xs py-2 flex-1 " +
      (isActive ? "text-emerald-500" : "text-slate-400")
    }
  >
    <Icon size={18} />
    <span className="mt-1">{label}</span>
  </NavLink>
);

export default function MobileTabBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur border-t border-white/20">
      <div className="max-w-xl mx-auto flex">
        <Tab to="/dashboard" icon={Home} label="Dashboard" />
        <Tab to="/gpa-status" icon={BarChart3} label="Results" />
        <Tab to="/add-marks" icon={ClipboardList} label="Planner" />
        <Tab to="/payment" icon={User} label="Profile" />
      </div>
    </div>
  );
}

