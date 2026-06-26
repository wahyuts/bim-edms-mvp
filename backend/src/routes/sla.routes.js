import { Router } from "express";
import { getSlaController, listSlaController } from "../controllers/sla.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const slaRouter = Router();

slaRouter.get(
  "/",
  requireAuth,
  requirePermission("document.view"),
  asyncHandler(listSlaController)
);
slaRouter.get(
  "/:id",
  requireAuth,
  requirePermission("document.view"),
  asyncHandler(getSlaController)
);
