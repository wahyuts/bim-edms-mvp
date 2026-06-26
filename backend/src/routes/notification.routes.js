import { Router } from "express";
import {
  createNotificationController,
  deleteNotificationController,
  listNotificationsController,
  markNotificationReadController,
} from "../controllers/notification.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const notificationRouter = Router();

notificationRouter.get(
  "/",
  requireAuth,
  requirePermission("notification.view"),
  asyncHandler(listNotificationsController)
);
notificationRouter.post(
  "/",
  requireAuth,
  requirePermission("notification.edit"),
  asyncHandler(createNotificationController)
);
notificationRouter.put(
  "/:id/read",
  requireAuth,
  requirePermission("notification.edit"),
  asyncHandler(markNotificationReadController)
);
notificationRouter.delete(
  "/:id",
  requireAuth,
  requirePermission("notification.delete"),
  asyncHandler(deleteNotificationController)
);
