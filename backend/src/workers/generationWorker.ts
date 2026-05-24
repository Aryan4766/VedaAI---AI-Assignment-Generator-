import { Worker } from "bullmq";
import mongoose from "mongoose";
import { env } from "../config/env";
import { createRedisConnection } from "../lib/redis";
import { Assignment } from "../models/Assignment";
import { generateQuestionPaper } from "../services/aiService";
import {
  GENERATION_QUEUE,
  type GenerationJobData,
} from "../queues/generationQueue";
import { emitGenerationUpdate } from "../sockets";
import { publishGenerationEvent } from "../utils/generationEvents";

const connection = createRedisConnection();

async function processJob(data: GenerationJobData) {
  const { assignmentId } = data;

  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) throw new Error("Assignment not found");

  assignment.status = "processing";
  await assignment.save();
  emitGenerationUpdate(assignmentId, {
    status: "processing",
    message: "AI is generating your question paper",
  });
  void publishGenerationEvent({
    assignmentId,
    status: "processing",
    message: "AI is generating your question paper",
  });

  const paper = await generateQuestionPaper(assignment);

  assignment.generatedPaper = paper;
  assignment.status = "completed";
  assignment.errorMessage = undefined;
  await assignment.save();

  emitGenerationUpdate(assignmentId, {
    status: "completed",
    message: "Question paper ready",
  });
  void publishGenerationEvent({
    assignmentId,
    status: "completed",
    message: "Question paper ready",
  });
}

async function start() {
  await mongoose.connect(env.mongoUri);
  console.log("Worker connected to MongoDB");

  const worker = new Worker<GenerationJobData>(
    GENERATION_QUEUE,
    async (job) => {
      try {
        await processJob(job.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Generation failed";

        await Assignment.findByIdAndUpdate(job.data.assignmentId, {
          status: "failed",
          errorMessage: message,
        });

        emitGenerationUpdate(job.data.assignmentId, {
          status: "failed",
          message,
        });
        void publishGenerationEvent({
          assignmentId: job.data.assignmentId,
          status: "failed",
          message,
        });

        throw err;
      }
    },
    { connection },
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
  });

  console.log("Generation worker started");
}

start().catch((err) => {
  console.error("Worker failed to start:", err);
  process.exit(1);
});
