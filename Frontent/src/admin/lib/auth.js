const KEY = "admin_token";

// ✅ Function style exports
export function setToken(token) {
  localStorage.setItem(KEY, token);
}
export function getToken() {
  return localStorage.getItem(KEY);
}
export function clearToken() {
  localStorage.removeItem(KEY);
}
export function isAuthed() {
  return Boolean(getToken());
}

// ✅ Arrow function style exports (alternative)
export const setTokenAlt = (t) => localStorage.setItem(KEY, t);
export const getTokenAlt = () => localStorage.getItem(KEY);
export const clearTokenAlt = () => localStorage.removeItem(KEY);
export const isAuthedAlt = () => Boolean(getTokenAlt());
export const logout = () => {
  clearToken();
  window.location.href = "/admin/login";
}