import { Router } from "express";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../lib/asyncHandler";
import { createCustomerSchema } from "../validations/customer";
import { ValidationError } from "../lib/errors";

const router = Router();

// GET /customers - List all customers
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        curp: true,
        rfc: true,
        country: true,
        occupation: true,
        riskScore: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(customers);
  })
);

// POST /customers - Create a new customer
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = createCustomerSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors[0].message);
    }

    const customer = await prisma.customer.create({
      data: parsed.data,
    });

    res.status(201).json(customer);
  })
);

export default router;
