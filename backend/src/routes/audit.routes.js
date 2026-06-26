import { Router } from "express";
import {
  getAuditTrailController,
  listAuditTrailController,
} from "../controllers/audit.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const auditRouter = Router();

auditRouter.get(
  "/",
  requireAuth,
  requirePermission("audit.view"),
  asyncHandler(listAuditTrailController)
);
auditRouter.get(
  "/:id",
  requireAuth,
  requirePermission("audit.view"),
  asyncHandler(getAuditTrailController)
);
