import { Router } from "express";
import { asyncHandler } from "../lib/asyncHandler";

const router = Router();

// GET /report/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO Day 5: Implement report generation
    res.json({
      reportId: id,
      status: "ok",
      message: "Report generation placeholder - to be implemented on Day 5",
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
