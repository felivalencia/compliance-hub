import { Request, Response, NextFunction } from "express";
import { env } from "../env";
import { UnauthorizedError } from "../lib/errors";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");

  if (!key) {
    throw new UnauthorizedError("Missing API key");
  }

  if (key !== env.ADMIN_API_KEY) {
    throw new UnauthorizedError("Invalid API key");
  }

  next();
}
