// Simple logger with levels and timestamps
// Will be replaced with Pino on Day 6

type LogLevel = "info" | "warn" | "error" | "debug";

const colors = {
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  debug: "\x1b[35m",
  reset: "\x1b[0m",
};

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  const color = colors[level];
  const reset = colors.reset;

  const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
  console.log(
    `${color}[${level.toUpperCase()}]${reset} ${timestamp} - ${message}${metaStr}`
  );
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) =>
    log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) =>
    log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) =>
    log("error", message, meta),
  debug: (message: string, meta?: Record<string, unknown>) =>
    log("debug", message, meta),
};
