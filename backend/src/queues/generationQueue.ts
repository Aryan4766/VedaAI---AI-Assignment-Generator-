import { Queue } from "bullmq";
import { createRedisConnection } from "../lib/redis";

const connection = createRedisConnection();

export const GENERATION_QUEUE = "assignment-generation";

export interface GenerationJobData {
  assignmentId: string;
}

export const generationQueue = new Queue<GenerationJobData>(GENERATION_QUEUE, {
  connection,
});
