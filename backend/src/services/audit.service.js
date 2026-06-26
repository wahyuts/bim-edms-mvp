import { auditRepository } from "../repositories/audit.repository.js";
import { notFound } from "../utils/api-error.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";

export async function listAuditTrail(query = {}) {
  const pagination = getPagination(query);
  const result = await auditRepository.list(query, pagination);
  return {
    data: result.rows,
    meta: buildPaginationMeta(pagination.page, pagination.pageSize, result.totalItems),
  };
}

export async function getAuditTrail(id) {
  const audit = await auditRepository.findById(id);
  if (!audit) {
    throw notFound("Audit trail not found");
  }

  return audit;
}
