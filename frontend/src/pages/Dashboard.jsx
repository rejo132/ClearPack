import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { ChartLine, FileText, Wallet, ArrowUpRight, AlertCircle } from "lucide-react";
import GlassCard from "../components/GlassCard";

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
    <div className="app-gradient min-h-[calc(100vh-120px)] -mx-4 px-4 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto pt-6 md:pt-10">
        {/* GPA Hero */}
        <GlassCard className="p-6 md:p-8">
          <div className="text-center">
            <div className="text-sm uppercase tracking-wide text-slate-700 dark:text-slate-300">GPA</div>
            <div className="text-6xl md:text-7xl font-extrabold mt-2">{summary?.gpa ? summary.gpa.toFixed(2) : "—"}</div>
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <GlassCard className="p-4 text-center">
            <div className="text-sm text-slate-700 dark:text-slate-300">Units</div>
            <div className="text-3xl font-bold">{summary?.total_units ?? "—"}</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-sm text-slate-700 dark:text-slate-300">Completed</div>
            <div className="text-3xl font-bold">{summary?.completed_units ?? "—"}</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-sm text-slate-700 dark:text-slate-300">Missing</div>
            <div className="text-3xl font-bold">{summary?.missing_units ?? "—"}</div>
          </GlassCard>
          <GlassCard className="p-4 text-center hidden md:block">
            <div className="text-sm text-slate-700 dark:text-slate-300">Status</div>
            <div className="text-3xl font-bold">{summary?.status || "—"}</div>
          </GlassCard>
        </div>

        {/* Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold">You improved 12% this semester</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">Your GPA increased from last semester</div>
              </div>
              <Link to="/gpa" className="inline-flex items-center gap-1 text-emerald-600">
                View Details <ArrowUpRight size={16} />
              </Link>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-amber-500" />
                <div>
                  <div className="font-semibold">{summary?.missing_units ?? 0} missing grades detected</div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">Review and report missing marks</div>
                </div>
              </div>
              <Link to="/add-marks" className="px-4 py-2 bg-amber-500 text-white rounded-lg">Report</Link>
            </div>
          </GlassCard>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <Link to="/add-marks" className="px-4 py-4 rounded-xl inline-flex items-center gap-2 justify-center bg-emerald-600 text-white">
            <FileText size={18} /> Add Marks
          </Link>
          <Link to="/gpa" className="px-4 py-4 rounded-xl inline-flex items-center gap-2 justify-center bg-white/70 dark:bg-slate-800">
            <ChartLine size={18} /> View GPA
          </Link>
          <Link to="/payment" className="px-4 py-4 rounded-xl inline-flex items-center gap-2 justify-center bg-white/70 dark:bg-slate-800">
            <Wallet size={18} /> Payments
          </Link>
        </div>
      </div>
    </div>
  );
}
