import dotenv from "dotenv";

dotenv.config();

function resolveRedisUrl(): string {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("REDIS_URL environment variable is required in production");
  }
  return "redis://localhost:6379";
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/vedaai",
  redisUrl: resolveRedisUrl(),
  openRouterKey: process.env.OPENROUTER_API_KEY ?? "",
  openRouterModel:
    process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001",
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000",
};
