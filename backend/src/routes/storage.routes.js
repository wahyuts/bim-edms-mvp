import { Router } from "express";
import {
  createStorageController,
  deleteStorageController,
  getStorageController,
  listStorageController,
  updateStorageController,
} from "../controllers/storage.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const storageRouter = Router();

storageRouter.get(
  "/",
  requireAuth,
  requirePermission("storage.view"),
  asyncHandler(listStorageController)
);
storageRouter.get(
  "/:id",
  requireAuth,
  requirePermission("storage.view"),
  asyncHandler(getStorageController)
);
storageRouter.post(
  "/",
  requireAuth,
  requirePermission("storage.create"),
  asyncHandler(createStorageController)
);
storageRouter.put(
  "/:id",
  requireAuth,
  requirePermission("storage.edit"),
  asyncHandler(updateStorageController)
);
storageRouter.delete(
  "/:id",
  requireAuth,
  requirePermission("storage.delete"),
  asyncHandler(deleteStorageController)
);
