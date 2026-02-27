import { useEffect, useState } from "react";
import { adminFetch } from "../lib/adminApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, messages: 0, downloads: 0 });
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      adminFetch("/api/projects"),
      adminFetch("/api/admin/messages"),
      adminFetch("/api/admin/events")
    ])
      .then(([p, m, e]) => {
        if (!alive) return;
        setStats({
          projects: (p.projects || []).length,
          messages: (m.messages || []).length,
          downloads: (e.events || []).filter(x => x.type === "resume_download").length
        });
      })
      .catch((x) => setErr(x.message));
    return () => { alive = false; };
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="text-sm text-slate-300 mt-1">Quick overview.</p>

      {err && <div className="text-red-400 text-sm mt-3">{err}</div>}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card title="Projects" value={stats.projects} />
        <Card title="Messages" value={stats.messages} />
        <Card title="Resume downloads" value={stats.downloads} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
      <div className="text-sm text-slate-300">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
