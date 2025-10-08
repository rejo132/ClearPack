import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import AddMarks from "./pages/AddMarks";
import GPAStatus from "./pages/GPAStatus";
import Payment from "./pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute";
import MobileTabBar from "./components/MobileTabBar";
import "./index.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function App() {
  const mode = useSelector((s) => s.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-marks" element={<ProtectedRoute><AddMarks /></ProtectedRoute>} />
          <Route path="/gpa-status" element={<ProtectedRoute><GPAStatus /></ProtectedRoute>} />
          <Route path="/gpa" element={<Navigate to="/gpa-status" replace />} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
