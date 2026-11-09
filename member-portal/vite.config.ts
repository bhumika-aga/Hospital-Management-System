import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    // Keep CRA's output folder so Render's `serve -s build` and the Dockerfile keep working.
    outDir: "build",
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});
