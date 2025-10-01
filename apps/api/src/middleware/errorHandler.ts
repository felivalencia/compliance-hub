import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/errors";
import { logger } from "../lib/logger";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Log the error
  logger.error(err.message, {
    name: err.name,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.flatten(),
    });
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "Resource already exists",
        field: (err.meta?.target as string[])?.join(", "),
      });
    }
    // Record not found
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Resource not found",
      });
    }
  }

  // Generic error fallback
  return res.status(500).json({
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { message: err.message }),
  });
}
