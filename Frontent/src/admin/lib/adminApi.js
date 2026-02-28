import { getToken, clearToken } from "./auth";

export async function adminFetch(path, options = {}) {
  const token = getToken();

  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const data = await res.json().catch(() => ({}));

  // ✅ Handle expired session
  if (res.status === 401) {
    clearToken();
    throw new Error("Session expired. Please login again.");
  }

  // ✅ Handle other errors
  if (!res.ok) throw new Error(data?.error?.message || "Request failed");

  return data;
}

// ✅ Login helper
export async function login(email, password) {
  return adminFetch("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}
