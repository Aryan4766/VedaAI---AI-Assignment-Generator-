import IORedis, { type RedisOptions } from "ioredis";
import { env } from "../config/env";

console.log(
  "Using Redis URL:",
  process.env.REDIS_URL ? "ENV_FOUND" : "MISSING",
);

export function createRedisConnection(): IORedis {
  const url = env.redisUrl;
  const options: RedisOptions = {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };

  if (url.startsWith("rediss://")) {
    options.tls = {};
  }

  return new IORedis(url, options);
}
