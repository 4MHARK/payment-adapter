import Redis from "ioredis";
import { config } from "../config/env";

export const redis = new Redis(config.REDIS_URL);

// Health log
redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error", err));