import React, { useState } from "react";
import api from "../services/api";
import GlassCard from "../components/GlassCard";

export default function AddMarks() {
  const [rows, setRows] = useState([{ course_code: "", marks: "" }]);
  const [loading, setLoading] = useState(false);

  const addRow = () => setRows([...rows, { course_code: "", marks: "" }]);
  const update = (i, k) => (e) => {
    const copy = [...rows];
    copy[i][k] = e.target.value;
    setRows(copy);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/grades/bulk", { grades: rows });
      alert("Saved");
      setRows([{ course_code: "", marks: "" }]);
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-6 max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Add / Upload Marks (MVP)</h2>
      <form onSubmit={submit} className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-2">
            <input required placeholder="Course code" value={r.course_code} onChange={update(i, "course_code")} className="flex-1 border px-2 py-2 rounded dark:bg-slate-800" />
            <input required placeholder="Marks (0-100)" value={r.marks} onChange={update(i, "marks")} className="w-28 border px-2 py-2 rounded dark:bg-slate-800" />
          </div>
        ))}
        <div className="flex gap-2">
          <button type="button" onClick={addRow} className="px-3 py-2 bg-slate-200 rounded">Add row</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-700 text-white rounded">
            {loading ? "Saving..." : "Save marks"}
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
