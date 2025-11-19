import { Queue } from "bullmq";
import { redis } from "../../db/redis";

export const webhookRetryQueue = new Queue("webhook-retry", {
  connection: redis.options
});