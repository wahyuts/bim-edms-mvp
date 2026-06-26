import { Router } from "express";
import {
  changePasswordController,
  updateProfileController,
} from "../controllers/profile.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const profileRouter = Router();

profileRouter.put("/", requireAuth, asyncHandler(updateProfileController));
profileRouter.put("/change-password", requireAuth, asyncHandler(changePasswordController));
