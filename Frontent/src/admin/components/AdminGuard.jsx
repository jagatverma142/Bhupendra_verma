import { Navigate } from "react-router-dom";
import { isAuthed } from "../lib/auth";

export default function AdminGuard({ children }) {
  if (!isAuthed()) return <Navigate to="/admin/login" replace />;
  return children;
}
export function AdminLoginGuard({ children }) {
  if (isAuthed()) return <Navigate to="/admin" replace />;
  return children;
}