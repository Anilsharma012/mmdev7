// client/vite.config.ts

import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import copy from "rollup-plugin-copy";
import { createServer } from "../server"; // adjust path if needed

export default defineConfig({
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "../dist/spa"), // ✅ dist/spa (match Netlify)
    emptyOutDir: true,
  },
  plugins: [react()],
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
