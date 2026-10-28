import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["client/src/lib/test-setup.ts"],
    include: ["client/**/*.test.tsx", "client/**/*.spec.tsx"],
  },
});
