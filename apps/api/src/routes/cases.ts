import { Router } from "express";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../lib/asyncHandler";

const router = Router();

// GET /cases - List all cases
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const cases = await prisma.case.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            curp: true,
            riskScore: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(cases);
  })
);

export default router;
