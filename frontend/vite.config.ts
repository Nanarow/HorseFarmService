import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
const env = loadEnv("", process.cwd());
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shadcn": path.resolve(__dirname, "./src/lib/components"),
      "@cn": path.resolve(__dirname, "./src/lib"),
      "@src": path.resolve(__dirname, "./src/"),
    },
  },
  define: {
    VITE_BACKEND_URL: env.VITE_BACKEND_URL,
  },
});
