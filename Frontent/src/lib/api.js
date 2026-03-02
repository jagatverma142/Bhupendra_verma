// Frontend/src/lib/api.js

const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function apiFetch(path, options = {}) {
  // ✅ Build full URL
  const url = path.startsWith("http")
    ? path
    : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.error?.message ||
      data?.message ||
      `Request failed (HTTP ${res.status})`;
    throw new Error(msg);
  }

  return data;
}
