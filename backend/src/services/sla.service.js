import { slaRepository } from "../repositories/sla.repository.js";
import { notFound } from "../utils/api-error.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";
import { withSlaDerivedFields } from "../utils/sla.js";

export async function listAtRiskDocuments(query = {}) {
  const pagination = getPagination(query);
  const result = await slaRepository.listAtRisk(query, pagination);
  return {
    data: result.rows.map(withSlaDerivedFields),
    meta: buildPaginationMeta(pagination.page, pagination.pageSize, result.totalItems),
  };
}

export async function getAtRiskDocument(id) {
  const document = await slaRepository.findAtRiskById(id);
  if (!document) {
    throw notFound("SLA document not found");
  }

  return withSlaDerivedFields(document);
}
