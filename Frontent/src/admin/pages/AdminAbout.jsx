import { useEffect, useState } from "react";
import { adminFetch } from "../lib/adminApi";

export default function AdminAbout() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    adminFetch("/api/admin/content").then(d => setContent(d.content)).catch(e => setErr(e.message));
  }, []);

  const save = async () => {
    setSaving(true); setErr(""); setOk("");
    try {
      await adminFetch("/api/admin/content", { method: "PUT", body: JSON.stringify(content) });
      setOk("Saved");
    } catch (e) { setErr(e.message); }
    finally { setSaving(false); }
  };

  if (!content) return <div className="text-slate-300">Loading...</div>;

  const about = content.about;

  const updateParagraph = (i, v) => {
    const next = [...(about.paragraphs || [])];
    next[i] = v;
    setContent(p => ({ ...p, about: { ...p.about, paragraphs: next } }));
  };

  const addParagraph = () => {
    setContent(p => ({ ...p, about: { ...p.about, paragraphs: [...(p.about.paragraphs || []), ""] } }));
  };

  const removeParagraph = (i) => {
    const next = (about.paragraphs || []).filter((_, idx) => idx !== i);
    setContent(p => ({ ...p, about: { ...p.about, paragraphs: next } }));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">About</h1>

      <div className="space-y-3">
        {(about.paragraphs || []).map((t, i) => (
          <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-slate-300">Paragraph {i + 1}</div>
              <button onClick={() => removeParagraph(i)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500">Remove</button>
            </div>
            <textarea
              className="w-full min-h-24 p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
              value={t}
              onChange={(e) => updateParagraph(i, e.target.value)}
            />
          </div>
        ))}
        <button onClick={addParagraph} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">
          Add paragraph
        </button>
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
