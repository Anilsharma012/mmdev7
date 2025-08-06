// vite.server.config.ts

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/node-build.ts"), // ✅ Your entry point
      name: "server",
      fileName: "node-build",
      formats: ["es"],
    },
    outDir: "dist/server", // ✅ Output dir
    target: "node18",       // ✅ Use node18 or 20 (node22 is new)
    ssr: true,
    rollupOptions: {
      external: [
        // Node.js built-ins
        "fs", "path", "url", "http", "https", "os", "crypto",
        "stream", "util", "events", "buffer", "querystring", "child_process",
        // npm dependencies (don't bundle them)
        "express", "cors", "mongoose", "dotenv"
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs", // Output as node-build.mjs
      },
    },
    minify: false,   // Easier to debug
    sourcemap: true, // Helpful during errors
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
