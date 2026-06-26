import { getAtRiskDocument, listAtRiskDocuments } from "../services/sla.service.js";
import { success } from "../utils/response.js";

export async function listSlaController(req, res) {
  const result = await listAtRiskDocuments(req.query);
  return success(res, result.data, "SLA Monitoring fetched", result.meta);
}

export async function getSlaController(req, res) {
  return success(res, await getAtRiskDocument(req.params.id), "SLA document fetched");
}
