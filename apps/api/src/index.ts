import { buildServer } from "./server";
import { env } from "./env";
import { logger } from "./lib/logger";

const app = buildServer();
const port = Number(env.PORT);

app.listen(port, () => {
  logger.info(`🚀 Server started`, {
    port,
    environment: env.NODE_ENV,
    url: `http://localhost:${port}`,
  });
});

// Graceful shutdown handlers
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
