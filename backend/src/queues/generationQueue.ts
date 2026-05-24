import { Queue } from "bullmq";
import IORedis from "ioredis";
import { env } from "../config/env";

const connection = new IORedis(env.redisUrl, {
  maxRetriesPerRequest: null,
});

export const GENERATION_QUEUE = "assignment-generation";

export interface GenerationJobData {
  assignmentId: string;
}

export const generationQueue = new Queue<GenerationJobData>(GENERATION_QUEUE, {
  connection,
});
