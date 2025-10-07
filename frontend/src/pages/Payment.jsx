import React, { useState } from "react";
import api from "../services/api";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const pay = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend should trigger M-Pesa STK push and return status
      await api.post("/payments/request", { amount: Number(amount) });
      alert("Payment request initiated. Check your phone for M-Pesa prompt.");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Payments</h2>
      <form onSubmit={pay} className="space-y-3">
        <input type="number" min="1" required value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Amount (KES)" />
        <button disabled={loading} className="w-full bg-emerald-700 text-white py-2 rounded">{loading ? "Processing..." : "Pay with M-Pesa"}</button>
      </form>
    </div>
  );
}
