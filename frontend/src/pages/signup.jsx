import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";

export default function Signup() {
  const [form, setForm] = useState({
    admission_number: "",
    full_name: "",
    email: "",
    phone_number: "",
    password: ""
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signup(form);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErr(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h1 className="text-xl font-semibold mb-4">Signup</h1>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Admission Number" className="w-full border px-3 py-2 rounded" required value={form.admission_number} onChange={handle("admission_number")} />
        <input placeholder="Full name" className="w-full border px-3 py-2 rounded" required value={form.full_name} onChange={handle("full_name")} />
        <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" required value={form.email} onChange={handle("email")} />
        <input placeholder="Phone number" className="w-full border px-3 py-2 rounded" required value={form.phone_number} onChange={handle("phone_number")} />
        <input type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" required value={form.password} onChange={handle("password")} />
        <button className="w-full bg-emerald-700 text-white py-2 rounded">Create account</button>
      </form>
    </div>
  );
}
