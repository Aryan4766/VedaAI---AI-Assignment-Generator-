import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/vedaai",
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
  openRouterKey: process.env.OPENROUTER_API_KEY ?? "",
  openRouterModel:
    process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001",
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000",
};
