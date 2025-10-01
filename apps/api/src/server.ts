import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { requireAdmin } from "./middleware/auth";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./env";
import customersRouter from "./routes/customers";
import casesRouter from "./routes/cases";
import reportRouter from "./routes/report";

export function buildServer() {
  const app = express();

  // Security
  app.use(helmet());
  app.use(
    cors({
      origin:
        env.NODE_ENV === "production"
          ? ["https://yourdomain.com"] // TODO: Configure actual domain
          : true,
      credentials: true,
    })
  );
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

  // Body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Health check (no auth required)
  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
    });
  });

  // Authentication - all routes below require admin
  app.use(requireAdmin);

  // Routes
  app.use("/customers", customersRouter);
  app.use("/cases", casesRouter);
  app.use("/report", reportRouter);

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Error handler - must be last
  app.use(errorHandler);

  return app;
}
