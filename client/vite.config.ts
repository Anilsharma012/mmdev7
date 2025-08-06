// client/vite.config.ts

import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import copy from "rollup-plugin-copy";
import { createServer } from "../server"; // adjust path if needed

export default defineConfig({
  root: path.resolve(__dirname), // ✅ root = client
  build: {
    outDir: path.resolve(__dirname, "dist"), // ✅ inside client/dist
    emptyOutDir: true,
  },
  plugins: [
    react(),
    expressPlugin(),
    copy({
      targets: [
        {
          src: path.resolve(__dirname, "public/_redirects"),
          dest: path.resolve(__dirname, "dist"), // ✅ to client/dist
        },
      ],
      hook: "writeBundle",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
});

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
