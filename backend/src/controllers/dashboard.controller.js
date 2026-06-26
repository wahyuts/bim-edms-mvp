import { getDashboard } from "../services/dashboard.service.js";
import { success } from "../utils/response.js";

export async function getDashboardController(req, res) {
  return success(res, await getDashboard(req.user.id), "Dashboard fetched");
}
