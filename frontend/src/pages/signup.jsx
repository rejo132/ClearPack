import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../services/auth";

export default function Signup() {
  const [err, setErr] = React.useState("");
  const navigate = useNavigate();

  const schema = z.object({
    admission_number: z.string().min(6, "Admission number is required"),
    full_name: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    phone_number: z.string().min(7, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      admission_number: "",
      full_name: "",
      email: "",
      phone_number: "",
      password: ""
    }
  });

  const submit = async (values) => {
    setErr("");
    try {
      await signup(values);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErr(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 dark:bg-slate-900">
      <h1 className="text-xl font-semibold mb-4">Signup</h1>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      <form onSubmit={handleSubmit(submit)} className="space-y-3 text-left">
        <div>
          <input placeholder="Admission Number" className="w-full border px-3 py-2 rounded dark:bg-slate-800" aria-invalid={!!errors.admission_number} {...register("admission_number")} />
          {errors.admission_number && <div className="text-xs text-red-600 mt-1">{errors.admission_number.message}</div>}
        </div>
        <div>
          <input placeholder="Full name" className="w-full border px-3 py-2 rounded dark:bg-slate-800" aria-invalid={!!errors.full_name} {...register("full_name")} />
          {errors.full_name && <div className="text-xs text-red-600 mt-1">{errors.full_name.message}</div>}
        </div>
        <div>
          <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded dark:bg-slate-800" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email.message}</div>}
        </div>
        <div>
          <input placeholder="Phone number" className="w-full border px-3 py-2 rounded dark:bg-slate-800" aria-invalid={!!errors.phone_number} {...register("phone_number")} />
          {errors.phone_number && <div className="text-xs text-red-600 mt-1">{errors.phone_number.message}</div>}
        </div>
        <div>
          <input type="password" placeholder="Password" className="w-full border px-3 py-2 rounded dark:bg-slate-800" aria-invalid={!!errors.password} {...register("password")} />
          {errors.password && <div className="text-xs text-red-600 mt-1">{errors.password.message}</div>}
        </div>
        <button disabled={isSubmitting} className="w-full bg-emerald-700 text-white py-2 rounded disabled:opacity-60">{isSubmitting ? "Creating..." : "Create account"}</button>
      </form>
    </div>
  );
}
