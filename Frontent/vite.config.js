import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // ✅ Base path auto-switch
  // - Dev (npm run dev): "/"
  // - Vercel Deploy: "/"
  // - GitHub Pages (production build): "/Bhupendra_verma/"
  base:
    mode === "production"
      ? "/Bhupendra_verma/" // GitHub Pages (repo name)
      : "/",                // Dev + Vercel

  server: {
    proxy: {
      // ✅ All /api/* requests go to backend
      "/api": {
        target: "https://backendpf-xvn8.onrender.com",
        changeOrigin: true
      }
    }
  }
}));
