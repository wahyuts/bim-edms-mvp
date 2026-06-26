import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/rbac.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const userRouter = Router();

userRouter.get("/", requireAuth, requirePermission("user.view"), asyncHandler(listUsersController));
userRouter.get("/:id", requireAuth, requirePermission("user.view"), asyncHandler(getUserController));
userRouter.post("/", requireAuth, requirePermission("user.create"), asyncHandler(createUserController));
userRouter.put("/:id", requireAuth, requirePermission("user.edit"), asyncHandler(updateUserController));
userRouter.delete("/:id", requireAuth, requirePermission("user.delete"), asyncHandler(deleteUserController));
