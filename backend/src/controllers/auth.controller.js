import { login, logout, me } from "../services/auth.service.js";
import { success } from "../utils/response.js";

export async function loginController(req, res) {
  const { username = "", password = "" } = req.body || {};
  return success(res, await login(username, password), "Login success");
}

export async function logoutController(req, res) {
  await logout(req.user);
  return success(res, null, "Logout success");
}

export async function meController(req, res) {
  return success(res, await me(req.user.id), "Profile fetched");
}
