import app from "./app";
import { logger } from "./config/logger";
import { config } from "./config/env";
import { initJobs } from "./jobs";
initJobs ();
const port = config.PORT;

app.listen(port, () => {
  logger.info(`🚀 Server running on port ${port} in ${config.NODE_ENV} mode`);
});