import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep frontend assets under `frontend/public` now that `src/` lives in `frontend/src`.
  // This avoids breaking absolute URLs like `/products/...`.
  publicDir: "frontend/public",
  server: {
    port: 5173,
  },
});
