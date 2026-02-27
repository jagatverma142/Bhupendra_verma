import { useEffect, useState } from "react";
import { adminFetch } from "../lib/adminApi";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    const data = await adminFetch("/api/admin/messages");
    setMessages(data.messages || []);
  }

  useEffect(() => { load().catch(e => setErr(e.message)); }, []);

  const filtered = messages.filter(m =>
    (m.name || "").toLowerCase().includes(q.toLowerCase()) ||
    (m.email || "").toLowerCase().includes(q.toLowerCase()) ||
    (m.subject || "").toLowerCase().includes(q.toLowerCase())
  );

  const del = async (id) => {
    if (!confirm("Delete this message?")) return;
    await adminFetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Messages</h1>
      <div className="mt-4 flex gap-2">
        <input
          className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
          placeholder="Search by name/email/subject"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={() => load()} className="px-4 rounded-lg bg-slate-800 hover:bg-slate-700">Refresh</button>
      </div>

      {err && <div className="text-red-400 text-sm mt-3">{err}</div>}

      <div className="mt-4 space-y-3">
        {filtered.map(m => (
          <div key={m.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold truncate">{m.name} • {m.email}</div>
                <div className="text-xs text-slate-400">{m.timestamp}</div>
                <div className="text-sm text-slate-300 mt-2 whitespace-pre-wrap">{m.message}</div>
              </div>
              <button onClick={() => del(m.id)} className="px-3 py-2 h-fit rounded-lg bg-red-600 hover:bg-red-500">
                Delete
              </button>
            </div>
          </div>
        ))}
        {!filtered.length && <div className="text-slate-300">No messages.</div>}
      </div>
    </div>
  );
}
