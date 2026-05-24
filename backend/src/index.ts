import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./config/env";
import assignmentRoutes from "./routes/assignmentRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { initSocket, emitGenerationUpdate } from "./sockets";
import { subscribeToGenerationEvents } from "./utils/generationEvents";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
  }),
);
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/assignments", assignmentRoutes);
app.use(errorHandler);

const server = http.createServer(app);
initSocket(server);

subscribeToGenerationEvents((payload) => {
  emitGenerationUpdate(payload.assignmentId, {
    status: payload.status,
    message: payload.message,
  });
});

async function start() {
  await mongoose.connect(env.mongoUri);
  console.log("Connected to MongoDB");

  server.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
