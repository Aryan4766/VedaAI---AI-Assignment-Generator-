import IORedis from "ioredis";
import { createRedisConnection } from "../lib/redis";

const CHANNEL = "generation:updates";

export interface GenerationEventPayload {
  assignmentId: string;
  status: string;
  message?: string;
}

let publisher: IORedis | null = null;

function getPublisher(): IORedis {
  if (!publisher) {
    publisher = createRedisConnection();
  }
  return publisher;
}

/** Publish from API or worker process — API subscribes and emits Socket.io */
export async function publishGenerationEvent(
  payload: GenerationEventPayload,
): Promise<void> {
  await getPublisher().publish(CHANNEL, JSON.stringify(payload));
}

/** Subscribe in API process only */
export function subscribeToGenerationEvents(
  onEvent: (payload: GenerationEventPayload) => void,
): void {
  const subscriber = createRedisConnection();
  subscriber.subscribe(CHANNEL);
  subscriber.on("message", (_channel, message) => {
    try {
      onEvent(JSON.parse(message) as GenerationEventPayload);
    } catch {
      console.error("Invalid generation event payload");
    }
  });
}
