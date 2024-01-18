import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shadcn": path.resolve(__dirname, "./src/lib/components"),
      "@cn": path.resolve(__dirname, "./src/lib"),
      "@src": path.resolve(__dirname, "./src/"),
    },
  },
});
