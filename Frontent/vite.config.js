import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // ✅ GitHub repo name (IMPORTANT: trailing slash)
  base: "/Bhupendra_verma/",

  plugins: [react()],

  server: {
    proxy: {
      // ✅ All /api/* requests go to backend
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});
