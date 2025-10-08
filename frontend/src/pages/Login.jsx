import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../services/auth";

export default function Login() {
  const [err, setErr] = React.useState("");
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" }
  });

  const submit = async (values) => {
    setErr("");
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErr(error?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 dark:bg-slate-900">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      <form onSubmit={handleSubmit(submit)} className="space-y-4 text-left">
        <div>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded dark:bg-slate-800"
            placeholder="Email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email.message}</div>}
        </div>
        <div>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded dark:bg-slate-800"
            placeholder="Password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && <div className="text-xs text-red-600 mt-1">{errors.password.message}</div>}
        </div>
        <button disabled={isSubmitting} className="w-full bg-emerald-700 text-white py-2 rounded disabled:opacity-60">
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
