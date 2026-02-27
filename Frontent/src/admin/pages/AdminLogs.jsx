import { useEffect, useState } from "react";
import { adminFetch } from "../lib/adminApi";

export default function AdminLogs() {
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    adminFetch("/api/admin/events")
      .then(d => setEvents(d.events || []))
      .catch(e => setErr(e.message));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold">Download Logs</h1>
      {err && <div className="text-red-400 text-sm mt-3">{err}</div>}

      <div className="mt-4 space-y-2">
        {events.slice().reverse().map((e, i) => (
          <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm">
            <div className="text-slate-300">{e.type}</div>
            <div className="text-xs text-slate-400">{e.timestamp} • {e.ipHash}</div>
          </div>
        ))}
        {!events.length && <div className="text-slate-300">No events.</div>}
      </div>
    </div>
  );
}
