import { escalationRepository } from "../repositories/escalation.repository.js";
import { notFound } from "../utils/api-error.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";
import { withSlaDerivedFields } from "../utils/sla.js";

export async function listOverdueDocuments(query = {}) {
  const pagination = getPagination(query);
  const result = await escalationRepository.listOverdue(query, pagination);
  return {
    data: result.rows.map(withSlaDerivedFields),
    meta: buildPaginationMeta(pagination.page, pagination.pageSize, result.totalItems),
  };
}

export async function getOverdueDocument(id) {
  const document = await escalationRepository.findOverdueById(id);
  if (!document) {
    throw notFound("Escalation document not found");
  }

  return withSlaDerivedFields(document);
}
