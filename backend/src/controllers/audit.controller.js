import { getAuditTrail, listAuditTrail } from "../services/audit.service.js";
import { success } from "../utils/response.js";

export async function listAuditTrailController(req, res) {
  const result = await listAuditTrail(req.query);
  return success(res, result.data, "Audit trail fetched", result.meta);
}

export async function getAuditTrailController(req, res) {
  return success(res, await getAuditTrail(req.params.id), "Audit trail fetched");
}
