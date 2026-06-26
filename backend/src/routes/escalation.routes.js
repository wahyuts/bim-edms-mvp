import { Router } from "express";
import {
  getEscalationController,
  listEscalationController,
} from "../controllers/escalation.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const escalationRouter = Router();

escalationRouter.get(
  "/",
  requireAuth,
  requirePermission("escalation.view"),
  asyncHandler(listEscalationController)
);
escalationRouter.get(
  "/:id",
  requireAuth,
  requirePermission("escalation.view"),
  asyncHandler(getEscalationController)
);
