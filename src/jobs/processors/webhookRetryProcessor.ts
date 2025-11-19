import { Worker } from "bullmq";
import { redis } from "../../db/redis";
import { logger } from "../../config/logger";

export const webhookRetryWorker = new Worker(
  "webhook-retry",
  async (job) => {
    logger.info({ job }, "Processing webhook retry job");
    // TODO: Implement real retry logic
  },
  { connection: redis.options }
);

webhookRetryWorker.on("completed", (job) =>
  logger.info({ id: job.id }, "Webhook retry completed")
);

webhookRetryWorker.on("failed", (job, err) =>
  logger.error({ id: job?.id, err }, "Webhook retry failed")
);