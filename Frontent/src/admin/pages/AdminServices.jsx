import { useEffect, useState } from "react";
import { adminFetch } from "../lib/adminApi";

function makeId() {
  return "srv_" + Math.random().toString(16).slice(2);
}

export default function AdminServices() {
  const [content, setContent] = useState(null);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    adminFetch("/api/admin/content").then(d => setContent(d.content)).catch(e => setErr(e.message));
  }, []);

  const save = async () => {
    setErr(""); setOk("");
    try {
      await adminFetch("/api/admin/content", { method: "PUT", body: JSON.stringify(content) });
      setOk("Saved");
    } catch (e) { setErr(e.message); }
  };

  if (!content) return <div className="text-slate-300">Loading...</div>;

  const services = content.services || [];

  const add = () => {
    setContent(p => ({
      ...p,
      services: [
        ...services,
        { id: makeId(), title: "", desc: "", icon: "", order: services.length + 1, published: true }
      ]
    }));
  };

  const update = (id, patch) => {
    setContent(p => ({
      ...p,
      services: (p.services || []).map(s => s.id === id ? { ...s, ...patch } : s)
    }));
  };

  const del = (id) => {
    setContent(p => ({ ...p, services: (p.services || []).filter(s => s.id !== id) }));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Services</h1>

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex justify-between gap-2 mb-2">
              <div className="font-semibold">{s.title || "Untitled service"}</div>
              <button onClick={() => del(s.id)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500">Delete</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input className="p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                placeholder="title" value={s.title || ""} onChange={(e) => update(s.id, { title: e.target.value })} />
              <input className="p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                placeholder="icon" value={s.icon || ""} onChange={(e) => update(s.id, { icon: e.target.value })} />
              <input className="p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                placeholder="order" value={String(s.order ?? "")} onChange={(e) => update(s.id, { order: Number(e.target.value || 0) })} />
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={!!s.published} onChange={(e) => update(s.id, { published: e.target.checked })} />
                Published
              </label>
            </div>

            <textarea className="mt-2 w-full min-h-20 p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
              placeholder="description" value={s.desc || ""} onChange={(e) => update(s.id, { desc: e.target.value })} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={add} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">Add service</button>
        <button onClick={save} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">Save</button>
        {ok && <div className="text-green-400 text-sm self-center">{ok}</div>}
        {err && <div className="text-red-400 text-sm self-center">{err}</div>}
      </div>
    </div>
  );
}
