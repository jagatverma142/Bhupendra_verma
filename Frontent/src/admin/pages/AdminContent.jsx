import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "../lib/adminApi";

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function AdminContent() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    adminFetch("/api/admin/content")
      .then((d) => setContent(d.content))
      .catch((e) => setErr(e.message));
  }, []);

  const services = useMemo(() => content?.services?.items || [], [content]);

  const save = async () => {
    setSaving(true); setErr(""); setOk("");
    try {
      await adminFetch("/api/admin/content", { method: "PUT", body: JSON.stringify(content) });
      setOk("Saved");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    const next = clone(content);
    next.services = next.services || {};
    next.services.items = next.services.items || [];
    next.services.items.push({
      id: "srv_" + Math.random().toString(16).slice(2),
      title: "",
      desc: "",
      icon: "code",
      order: (next.services.items.length + 1),
      published: true,
      list: []
    });
    setContent(next);
  };

  const updateService = (id, patch) => {
    const next = clone(content);
    next.services.items = (next.services.items || []).map(s => s.id === id ? { ...s, ...patch } : s);
    setContent(next);
  };

  const deleteService = (id) => {
    const next = clone(content);
    next.services.items = (next.services.items || []).filter(s => s.id !== id);
    setContent(next);
  };

  if (!content) return <div className="text-slate-300">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold">Content Manager</h1>
          <p className="text-sm text-slate-300">Hero, About, Services, Contact CTA, Footer</p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={saving}
            onClick={save}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      {ok && <div className="text-green-400 text-sm">{ok}</div>}
      {err && <div className="text-red-400 text-sm">{err}</div>}

      {/* HERO */}
      <Section title="Hero">
        <Grid2>
          <Field label="Title" value={content.hero?.title} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, title: v } }))} />
          <Field label="Subtitle" value={content.hero?.subtitle} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, subtitle: v } }))} />
          <Field label="Hero text" value={content.hero?.heroText} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, heroText: v } }))} />
          <Field label="Hero image URL" value={content.hero?.heroImage} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, heroImage: v } }))} />
          <Field label="CTA Primary text" value={content.hero?.ctaPrimary?.text} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, ctaPrimary: { ...p.hero.ctaPrimary, text: v } } }))} />
          <Field label="CTA Primary link" value={content.hero?.ctaPrimary?.link} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, ctaPrimary: { ...p.hero.ctaPrimary, link: v } } }))} />
          <Field label="CTA Secondary text" value={content.hero?.ctaSecondary?.text} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, ctaSecondary: { ...p.hero.ctaSecondary, text: v } } }))} />
          <Field label="CTA Secondary link" value={content.hero?.ctaSecondary?.link} onChange={(v) => setContent(p => ({ ...p, hero: { ...p.hero, ctaSecondary: { ...p.hero.ctaSecondary, link: v } } }))} />
        </Grid2>
      </Section>

      {/* ABOUT */}
      <Section title="About">
        <Grid2>
          <Field label="Title" value={content.about?.title} onChange={(v) => setContent(p => ({ ...p, about: { ...p.about, title: v } }))} />
          <Field label="Location text" value={content.about?.locationText} onChange={(v) => setContent(p => ({ ...p, about: { ...p.about, locationText: v } }))} />
        </Grid2>

        <label className="block mt-3">
          <div className="text-sm text-slate-300 mb-1">Paragraphs (one per line)</div>
          <textarea
            className="w-full min-h-28 p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
            value={(content.about?.paragraphs || []).join("\n")}
            onChange={(e) =>
              setContent(p => ({
                ...p,
                about: { ...p.about, paragraphs: e.target.value.split("\n").filter(Boolean) }
              }))
            }
          />
        </label>

        <label className="block mt-3">
          <div className="text-sm text-slate-300 mb-1">Highlights (one per line)</div>
          <textarea
            className="w-full min-h-24 p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
            value={(content.about?.highlights || []).join("\n")}
            onChange={(e) =>
              setContent(p => ({
                ...p,
                about: { ...p.about, highlights: e.target.value.split("\n").filter(Boolean) }
              }))
            }
          />
        </label>
      </Section>

      {/* SERVICES */}
      <Section title="Services">
        <div className="flex gap-2">
          <button onClick={addService} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">
            Add service
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {services.map((s) => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold truncate">{s.title || "Untitled service"}</div>
                  <div className="text-xs text-slate-400">{s.id}</div>
                </div>
                <button onClick={() => deleteService(s.id)} className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500">
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                <input className="p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                  placeholder="title" value={s.title || ""} onChange={(e) => updateService(s.id, { title: e.target.value })} />
                <input className="p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                  placeholder="icon (code/layers/palette)" value={s.icon || ""} onChange={(e) => updateService(s.id, { icon: e.target.value })} />
                <input className="p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                  placeholder="order" value={String(s.order ?? "")} onChange={(e) => updateService(s.id, { order: Number(e.target.value || 0) })} />
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={!!s.published} onChange={(e) => updateService(s.id, { published: e.target.checked })} />
                  Published
                </label>
              </div>

              <textarea className="mt-2 w-full min-h-20 p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                placeholder="desc" value={s.desc || ""} onChange={(e) => updateService(s.id, { desc: e.target.value })} />

              <label className="block mt-2">
                <div className="text-sm text-slate-300 mb-1">List items (one per line)</div>
                <textarea
                  className="w-full min-h-20 p-3 rounded-lg bg-slate-950 border border-slate-800 outline-none"
                  value={(s.list || []).join("\n")}
                  onChange={(e) => updateService(s.id, { list: e.target.value.split("\n").filter(Boolean) })}
                />
              </label>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT CTA */}
      <Section title="Contact CTA">
        <Grid2>
          <Field label="CTA title" value={content.contact?.ctaTitle} onChange={(v) => setContent(p => ({ ...p, contact: { ...p.contact, ctaTitle: v } }))} />
          <Field label="CTA accent" value={content.contact?.ctaAccent} onChange={(v) => setContent(p => ({ ...p, contact: { ...p.contact, ctaAccent: v } }))} />
          <Field label="CTA desc" value={content.contact?.ctaDesc} onChange={(v) => setContent(p => ({ ...p, contact: { ...p.contact, ctaDesc: v } }))} />
          <Field label="CTA email" value={content.contact?.ctaEmail} onChange={(v) => setContent(p => ({ ...p, contact: { ...p.contact, ctaEmail: v } }))} />
        </Grid2>
      </Section>

      {/* FOOTER */}
      <Section title="Footer">
        <Grid2>
          <Field label="Brand" value={content.footer?.brand} onChange={(v) => setContent(p => ({ ...p, footer: { ...p.footer, brand: v } }))} />
          <Field label="Tagline" value={content.footer?.tagline} onChange={(v) => setContent(p => ({ ...p, footer: { ...p.footer, tagline: v } }))} />
          <Field label="Copyright text" value={content.footer?.copyrightText} onChange={(v) => setContent(p => ({ ...p, footer: { ...p.footer, copyrightText: v } }))} />
        </Grid2>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Grid2({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>;
}

function Field({ label, value, onChange }) {
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
