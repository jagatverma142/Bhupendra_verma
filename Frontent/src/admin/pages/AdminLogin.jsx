import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../lib/auth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || "Login failed");

      setToken(data.token);

      // ✅ Correct redirect (dashboard index route)
      navigate("/admin", { replace: true });

      // (Optional) If you really want projects page:
      // navigate("/admin/projects", { replace: true });
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 text-white rounded-xl p-6 border border-slate-800">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-slate-300 text-sm mt-1">Enter admin password.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            required
          />

          <button
            className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {err && <div className="text-red-400 text-sm">{err}</div>}
        </form>
      </div>
    </div>
  );
}
