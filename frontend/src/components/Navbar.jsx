import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/tokenStorage";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  return (
    <nav className="bg-emerald-800 text-white">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">JKUAT Tracker</div>
          <span className="text-sm opacity-80">Marks & Graduation</span>
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <Link className="text-sm hover:underline" to="/dashboard">Dashboard</Link>
              <Link className="text-sm hover:underline" to="/gpa">GPA</Link>
              <Link className="text-sm hover:underline" to="/payment">Payments</Link>
              <button
                onClick={handleLogout}
                className="ml-3 px-3 py-1 bg-red-600 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-sm hover:underline" to="/">Login</Link>
              <Link className="text-sm hover:underline" to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
