import React, { useEffect, useState } from "react";
import api from "../services/api";

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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-center">
      <h2 className="text-lg font-semibold mb-3">GPA & Graduation Status</h2>
      <div className="text-4xl font-bold mb-2">{gpa !== null ? gpa.toFixed(2) : "—"}</div>
      <div className="text-sm text-gray-600 mb-4">{status || "Loading..."}</div>
      <p className="text-sm text-gray-700">This report is indicative. Use final clearance for official confirmation.</p>
    </div>
  );
}
