import { documentRepository } from "../repositories/document.repository.js";
import { auditRepository } from "../repositories/audit.repository.js";
import { pool } from "../database/mysql.js";
import { badRequest, conflict, notFound, validationError } from "../utils/api-error.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";
import { withSlaDerivedFields } from "../utils/sla.js";
import { deleteDocumentFile, getDocumentAbsolutePath, saveDocumentFile } from "./storage/local-disk.storage.js";

const DOCUMENT_STATUSES = new Set([
  "Internal Draft",
  "Internal Review",
  "Client Review",
  "Revision Requested",
  "Approved",
  "Final As-Built",
]);

function normalizeDocumentPayload(body, existing = {}) {
  const document_number = body.document_number ?? body.documentNumber ?? existing.document_number;
  const title = body.title ?? existing.title;
  const discipline = body.discipline ?? existing.discipline;
  const revision = Number(body.revision ?? existing.revision ?? 1);
  const status = body.status ?? existing.status;
  const sla_due_at = body.sla_due_at ?? body.slaDueAt ?? existing.sla_due_at ?? null;
  const verify_deadline_date =
    body.verify_deadline_date ?? body.verifyDeadlineDate ?? existing.verify_deadline_date ?? null;
  const review_comment = body.review_comment ?? body.reviewComment ?? existing.review_comment ?? null;
  const sla_started_at =
    body.sla_started_at ?? body.slaStartedAt ?? existing.sla_started_at ?? (sla_due_at ? new Date() : null);

  return {
    document_number,
    title,
    description: body.description ?? existing.description ?? null,
    discipline,
    area: body.area ?? existing.area ?? null,
    revision,
    status,
    sla_status: body.sla_status ?? body.slaStatus ?? existing.sla_status ?? null,
    sla_due_at,
    verify_deadline_date,
    review_comment,
    sla_started_at,
    repository_id: body.repository_id ?? body.repositoryId ?? existing.repository_id ?? null,
    file_path: existing.file_path ?? null,
    file_name: existing.file_name ?? null,
    file_size: existing.file_size ?? null,
    mime_type: existing.mime_type ?? null,
  };
}

function validateDocumentPayload(data, requireFile, file) {
  const errors = {};

  if (!data.document_number) errors.document_number = "Document number is required";
  if (!data.title) errors.title = "Title is required";
  if (!data.discipline) errors.discipline = "Discipline is required";
  if (!Number.isFinite(data.revision) || data.revision < 0) {
    errors.revision = "Revision must be a valid number";
  }
  if (!data.status) errors.status = "Status is required";
  if (data.status && !DOCUMENT_STATUSES.has(data.status)) {
    errors.status = "Invalid status";
  }
  if (requireFile && !file) errors.file = "File is required";

  if (Object.keys(errors).length) {
    throw validationError(errors);
  }
}

function serializeDocument(document) {
  return withSlaDerivedFields(document);
}

export async function listDocuments(query = {}) {
  const pagination = getPagination(query);
  const result = await documentRepository.list(query, pagination);
  return {
    data: result.rows.map(serializeDocument),
    meta: buildPaginationMeta(pagination.page, pagination.pageSize, result.totalItems),
  };
}

export async function getDocument(id) {
  const document = await documentRepository.findById(id);
  if (!document) {
    throw notFound("Document not found");
  }

  return serializeDocument(document);
}

export async function createDocument(body, file, user) {
  const payload = normalizeDocumentPayload(body);
  validateDocumentPayload(payload, true, file);

  const duplicate = await documentRepository.findByDocumentNumber(payload.document_number);
  if (duplicate) {
    throw conflict("Duplicate document number", {
      document_number: "Document number already exists",
    });
  }

  const fileMeta = await saveDocumentFile(payload.document_number, file);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const documentId = await documentRepository.create({ ...payload, ...fileMeta }, connection);
    await auditRepository.create(
      {
        user_id: user.id,
        action: "Create",
        entity: "documents",
        entity_id: documentId,
        detail: `Created document ${payload.document_number}`,
      },
      connection
    );
    await connection.commit();
    return getDocument(documentId);
  } catch (error) {
    await connection.rollback();
    await deleteDocumentFile(fileMeta?.file_path);
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateDocument(id, body, file, user) {
  const existing = await documentRepository.findById(id);
  if (!existing) {
    throw notFound("Document not found");
  }

  const payload = normalizeDocumentPayload(body, existing);
  validateDocumentPayload(payload, false, file);

  const duplicate = await documentRepository.findByDocumentNumber(payload.document_number);
  if (duplicate && Number(duplicate.id) !== Number(id)) {
    throw conflict("Duplicate document number", {
      document_number: "Document number already exists",
    });
  }

  const fileMeta = file ? await saveDocumentFile(payload.document_number, file) : null;
  const nextPayload = fileMeta ? { ...payload, ...fileMeta } : payload;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await documentRepository.update(id, nextPayload, connection);
    await auditRepository.create(
      {
        user_id: user.id,
        action: "Edit",
        entity: "documents",
        entity_id: id,
        detail: `Updated document ${payload.document_number}`,
      },
      connection
    );
    await connection.commit();

    if (fileMeta && existing.file_path) {
      await deleteDocumentFile(existing.file_path);
    }

    return getDocument(id);
  } catch (error) {
    await connection.rollback();
    await deleteDocumentFile(fileMeta?.file_path);
    throw error;
  } finally {
    connection.release();
  }
}

export async function deleteDocument(id, user) {
  const existing = await documentRepository.findById(id);
  if (!existing) {
    throw notFound("Document not found");
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await documentRepository.softDelete(id, connection);
    await auditRepository.create(
      {
        user_id: user.id,
        action: "Delete",
        entity: "documents",
        entity_id: id,
        detail: `Deleted document ${existing.document_number}`,
      },
      connection
    );
    await connection.commit();
    await deleteDocumentFile(existing.file_path);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  return { id: Number(id) };
}

export async function getDocumentDownload(id) {
  const document = await documentRepository.findById(id);
  if (!document) {
    throw notFound("Document not found");
  }
  if (!document.file_path) {
    throw notFound("Document file not found");
  }

  return {
    path: getDocumentAbsolutePath(document.file_path),
    fileName: document.file_name || `${document.document_number}.pdf`,
  };
}
