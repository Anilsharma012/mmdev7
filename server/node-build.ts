// ✅ Core Imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ✅ App Entry (your Express server)
import { createServer } from "./index";

// ✅ Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Express App
const app = createServer();
const port = process.env.PORT || 3000;

// ✅ Path to built frontend (adjust if needed)
const distPath = path.join(__dirname, "../spa");

// ✅ Serve static frontend files
app.use(express.static(distPath));

// ✅ React Router fallback: Serve index.html for all non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// ✅ Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
git 