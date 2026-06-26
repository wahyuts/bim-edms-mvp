import {
  changePassword,
  updateProfile,
} from "../services/profile.service.js";
import { success } from "../utils/response.js";

export async function updateProfileController(req, res) {
  return success(res, await updateProfile(req.user, req.body), "Profile updated");
}

export async function changePasswordController(req, res) {
  return success(res, await changePassword(req.user, req.body), "Password updated");
}
