import { useEffect, useState } from "react";
import { adminFetch } from "../lib/adminApi";

export default function AdminHome() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    adminFetch("/api/admin/content")
      .then(d => setContent(d.content))
      .catch(e => setErr(e.message));
  }, []);

  const save = async () => {
    setSaving(true); setErr(""); setOk("");
    try {
      await adminFetch("/api/admin/content", {
        method: "PUT",
        body: JSON.stringify(content)
      });
      setOk("Saved");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!content) return <div className="text-slate-300">Loading...</div>;

  const home = content.home;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Home (Hero)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input label="Name" value={home.name} onChange={(v) => setContent(p => ({...p, home:{...p.home, name:v}}))} />
        <Input label="Role" value={home.role} onChange={(v) => setContent(p => ({...p, home:{...p.home, role:v}}))} />
        <Input label="Hero text" value={home.heroText} onChange={(v) => setContent(p => ({...p, home:{...p.home, heroText:v}}))} />
        <Input label="Hero image URL" value={home.heroImage} onChange={(v) => setContent(p => ({...p, home:{...p.home, heroImage:v}}))} />
      </div>

      <div className="flex gap-2">
        <button disabled={saving} onClick={save} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60">
          {saving ? "Saving..." : "Save"}
        </button>
        {ok && <div className="text-green-400 text-sm self-center">{ok}</div>}
        {err && <div className="text-red-400 text-sm self-center">{err}</div>}
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-sm text-slate-300 mb-1">{label}</div>
      <input
        className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
