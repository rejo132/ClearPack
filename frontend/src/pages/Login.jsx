import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErr(error?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-emerald-700 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
