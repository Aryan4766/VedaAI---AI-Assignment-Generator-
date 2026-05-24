import type { Socket } from "socket.io-client";
import { SOCKET_URL } from "@/lib/constants";
import type { GenerationEvent } from "@/types/assignment";

let socket: Socket | null = null;
let socketPromise: Promise<Socket> | null = null;

/** Lazy-load socket.io-client in the browser only (avoids SSR module errors) */
async function getSocket(): Promise<Socket> {
  if (typeof window === "undefined") {
    throw new Error("Socket client is only available in the browser");
  }

  if (socket) return socket;

  if (!socketPromise) {
    socketPromise = import("socket.io-client").then(({ io }) => {
      socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        autoConnect: true,
      });
      return socket;
    });
  }

  return socketPromise;
}

export function subscribeToGeneration(
  assignmentId: string,
  handler: (event: GenerationEvent) => void,
): () => void {
  let active = true;
  let socketRef: Socket | null = null;

  const onUpdate = (event: GenerationEvent) => {
    if (event.assignmentId === assignmentId) handler(event);
  };

  getSocket()
    .then((s) => {
      if (!active) return;
      socketRef = s;
      s.emit("join-assignment", assignmentId);
      s.on("generation:update", onUpdate);
    })
    .catch(() => {
      /* socket unavailable — polling fallback on page handles updates */
    });

  return () => {
    active = false;
    if (socketRef) {
      socketRef.off("generation:update", onUpdate);
      socketRef.emit("leave-assignment", assignmentId);
    }
  };
}
