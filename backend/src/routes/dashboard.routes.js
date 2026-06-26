import { Router } from "express";
import { getDashboardController } from "../controllers/dashboard.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  requireAuth,
  requirePermission("dashboard.view"),
  asyncHandler(getDashboardController)
);
