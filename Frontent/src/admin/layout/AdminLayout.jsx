import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearToken } from "../lib/auth";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg border border-slate-800 ${
      isActive ? "bg-slate-800 text-white" : "bg-slate-950 text-slate-300 hover:bg-slate-900"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden px-3 py-2 rounded-lg bg-slate-900 border border-slate-800"
              onClick={() => setOpen(v => !v)}
            >
              Menu
            </button>
            <div>
              <div className="font-semibold">Admin Panel</div>
              <div className="text-xs text-slate-300">Manage content</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/#/"
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800"
            >
              View site
            </a>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        {/* Sidebar */}
        <aside className={`bg-slate-900 border border-slate-800 rounded-xl p-3 lg:block ${open ? "block" : "hidden"} lg:sticky lg:top-20 h-fit`}>
          <nav className="space-y-2">
            <NavLink to="/admin" className={linkClass} end>Dashboard</NavLink>
            <NavLink to="/admin/projects" className={linkClass}>Projects</NavLink>
            <NavLink to="/admin/messages" className={linkClass}>Messages</NavLink>
            <NavLink to="/admin/logs" className={linkClass}>Download Logs</NavLink>
          </nav>
        </aside>

        {/* Page content */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 min-h-[60vh]">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
