import React, { useEffect, useState } from "react";
import api from "../services/api";
import GlassCard from "../components/GlassCard";

export default function GPAStatus() {
  const [gpa, setGpa] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/grades/gpa").then(res => {
      setGpa(res.data.gpa);
      setStatus(res.data.status);
    }).catch(()=>{});
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-2 md:px-0">
      <GlassCard className="p-6 md:p-8 text-center">
        <h2 className="text-lg font-semibold mb-3">GPA & Graduation Status</h2>
        <div className="text-5xl font-bold mb-2">{gpa !== null ? gpa.toFixed(2) : "—"}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">{status || "Loading..."}</div>
        <p className="text-sm text-gray-700 dark:text-gray-300">This report is indicative. Use final clearance for official confirmation.</p>
      </GlassCard>
    </div>
  );
}
