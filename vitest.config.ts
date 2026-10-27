import { defineConfig } from "vitest/config";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
    workspace: [
      {
        test: {
          include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
          environment: "node",
        },
      },
      {
        test: {
          include: ["client/**/*.test.tsx", "client/**/*.spec.tsx"],
          environment: "jsdom",
          setupFiles: ["client/src/lib/test-setup.ts"],
        },
      },
    ],
  },
});
