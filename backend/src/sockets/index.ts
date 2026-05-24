import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env";

let io: Server | null = null;

export function initSocket(server: HttpServer): Server {
  io = new Server(server, {
    cors: {
      origin: env.clientOrigin,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-assignment", (assignmentId: string) => {
      socket.join(`assignment:${assignmentId}`);
    });

    socket.on("leave-assignment", (assignmentId: string) => {
      socket.leave(`assignment:${assignmentId}`);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

export function emitGenerationUpdate(
  assignmentId: string,
  payload: { status: string; message?: string },
): void {
  if (!io) return;
  io.to(`assignment:${assignmentId}`).emit("generation:update", {
    assignmentId,
    ...payload,
  });
}
