import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "../lib/adminApi";
import { clearToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  demoLink: "",
  codeLink: ""
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  async function load() {
    setError("");
    setLoading(true);
    try {
      const data = await adminFetch("/api/projects");
      setProjects(data.projects || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const logout = () => {
    clearToken();
    navigate("/admin/login");
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title || "",
      description: p.description || "",
      image: p.image || "",
      demoLink: p.demoLink || "",
      codeLink: p.codeLink || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isEditing) {
        await adminFetch(`/api/projects/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(form)
        });
      } else {
        await adminFetch("/api/projects", {
          method: "POST",
          body: JSON.stringify(form)
        });
      }
      await load();
      cancelEdit();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    setError("");
    try {
      await adminFetch(`/api/projects/${id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Admin • Projects</h1>
            <p className="text-xs text-slate-300">Create / Update / Delete projects.</p>
          </div>
          <button onClick={logout} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold">{isEditing ? "Edit Project" : "Add Project"}</h2>

          <form onSubmit={onSave} className="mt-4 space-y-3">
            {["title", "description", "image", "demoLink", "codeLink"].map((k) => (
              <input
                key={k}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                value={form[k]}
                onChange={(e) => setForm((prev) => ({ ...prev, [k]: e.target.value }))}
                placeholder={k}
              />
            ))}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
              >
                {saving ? "Saving..." : (isEditing ? "Update" : "Create")}
              </button>

              {isEditing && (
                <button type="button" onClick={cancelEdit} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">
                  Cancel
                </button>
              )}
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}
          </form>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold">All Projects</h2>

          {loading ? (
            <div className="text-slate-300 mt-4">Loading...</div>
          ) : (
            <div className="mt-4 space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{p.title}</div>
                      <div className="text-sm text-slate-300 line-clamp-2">{p.description}</div>
                      <div className="text-xs text-slate-400 mt-1 truncate">{p.id}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => startEdit(p)} className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">
                        Edit
                      </button>
                      <button onClick={() => onDelete(p.id)} className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!projects.length && <div className="text-slate-300">No projects found.</div>}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
