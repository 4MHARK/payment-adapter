import { webhookRetryWorker } from "./processors/webhookRetryProcessor";

export function initJobs() {
  console.log("✅ BullMQ workers initialized");
  // Workers auto-start on import
}