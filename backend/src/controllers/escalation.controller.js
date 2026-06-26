import {
  getOverdueDocument,
  listOverdueDocuments,
} from "../services/escalation.service.js";
import { success } from "../utils/response.js";

export async function listEscalationController(req, res) {
  const result = await listOverdueDocuments(req.query);
  return success(res, result.data, "Escalation fetched", result.meta);
}

export async function getEscalationController(req, res) {
  return success(
    res,
    await getOverdueDocument(req.params.id),
    "Escalation document fetched"
  );
}
