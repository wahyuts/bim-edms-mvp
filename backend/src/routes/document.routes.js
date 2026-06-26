import { Router } from "express";
import {
  createDocumentController,
  deleteDocumentController,
  downloadDocumentController,
  getDocumentController,
  listDocumentsController,
  updateDocumentController,
} from "../controllers/document.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { documentUpload } from "../middleware/upload.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const documentRouter = Router();

documentRouter.get(
  "/",
  requireAuth,
  requirePermission("document.view"),
  asyncHandler(listDocumentsController)
);
documentRouter.get(
  "/:id/download",
  requireAuth,
  requirePermission("document.download"),
  asyncHandler(downloadDocumentController)
);
documentRouter.get(
  "/:id",
  requireAuth,
  requirePermission("document.view"),
  asyncHandler(getDocumentController)
);
documentRouter.post(
  "/",
  requireAuth,
  requirePermission("document.create"),
  documentUpload,
  asyncHandler(createDocumentController)
);
documentRouter.put(
  "/:id",
  requireAuth,
  requirePermission("document.edit"),
  documentUpload,
  asyncHandler(updateDocumentController)
);
documentRouter.delete(
  "/:id",
  requireAuth,
  requirePermission("document.delete"),
  asyncHandler(deleteDocumentController)
);
