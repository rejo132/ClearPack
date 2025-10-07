import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get("/students/me/summary").then(res => {
      if (mounted) setSummary(res.data);
    }).catch(()=>{});
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <div className="bg-white rounded shadow p-5 mb-6">
        <h2 className="text-lg font-semibold">Quick actions</h2>
        <div className="mt-3 flex gap-3">
          <Link to="/add-marks" className="px-3 py-2 bg-emerald-600 text-white rounded">Add Marks</Link>
          <Link to="/gpa" className="px-3 py-2 bg-slate-200 rounded">View GPA</Link>
          <Link to="/payment" className="px-3 py-2 bg-slate-200 rounded">Payments</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Completed units</div>
          <div className="text-2xl font-bold">{summary?.completed_units ?? "—"}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Missing marks</div>
          <div className="text-2xl font-bold">{summary?.missing_units ?? "—"}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Estimated GPA</div>
          <div className="text-2xl font-bold">{summary?.gpa ? summary.gpa.toFixed(2) : "—"}</div>
        </div>
      </div>
    </div>
  );
}
