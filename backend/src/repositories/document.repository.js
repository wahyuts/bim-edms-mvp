import { pool } from "../database/mysql.js";

const SORT_COLUMNS = {
  id: "d.id",
  document_number: "d.document_number",
  documentNumber: "d.document_number",
  title: "d.title",
  discipline: "d.discipline",
  status: "d.status",
  revision: "d.revision",
  created_at: "d.created_at",
  createdAt: "d.created_at",
  updated_at: "d.updated_at",
  updatedAt: "d.updated_at",
};

function buildDocumentWhere(filters = {}) {
  const where = ["d.deleted_at IS NULL"];
  const params = {};

  if (filters.search) {
    where.push(
      "(d.document_number LIKE :search OR d.title LIKE :search OR d.description LIKE :search)"
    );
    params.search = `%${filters.search}%`;
  }

  if (filters.status) {
    where.push("d.status = :status");
    params.status = filters.status;
  }

  if (filters.discipline) {
    where.push("d.discipline = :discipline");
    params.discipline = filters.discipline;
  }

  return { whereSql: where.join(" AND "), params };
}

function getOrder(sort = "updated_at", order = "desc") {
  const sortColumn = SORT_COLUMNS[sort] || SORT_COLUMNS.updated_at;
  const sortOrder = String(order).toLowerCase() === "asc" ? "ASC" : "DESC";
  return `${sortColumn} ${sortOrder}`;
}

async function list(filters, pagination) {
  const { whereSql, params } = buildDocumentWhere(filters);
  const orderSql = getOrder(filters.sort, filters.order);

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS totalItems
    FROM documents d
    WHERE ${whereSql}`,
    params
  );

  const [rows] = await pool.execute(
    `SELECT d.*, r.name AS repository_name
    FROM documents d
    LEFT JOIN repositories r ON r.id = d.repository_id
    WHERE ${whereSql}
    ORDER BY ${orderSql}
    LIMIT :pageSize OFFSET :offset`,
    {
      ...params,
      pageSize: pagination.pageSize,
      offset: pagination.offset,
    }
  );

  return {
    rows,
    totalItems: Number(countRows[0]?.totalItems || 0),
  };
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT d.*, r.name AS repository_name
    FROM documents d
    LEFT JOIN repositories r ON r.id = d.repository_id
    WHERE d.deleted_at IS NULL AND d.id = :id
    LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

async function findByDocumentNumber(documentNumber) {
  const [rows] = await pool.execute(
    `SELECT id
    FROM documents
    WHERE deleted_at IS NULL AND document_number = :documentNumber
    LIMIT 1`,
    { documentNumber }
  );

  return rows[0] || null;
}

async function create(data, connection = pool) {
  const [result] = await connection.execute(
    `INSERT INTO documents (
      document_number,
      title,
      description,
      discipline,
      area,
      revision,
      status,
      sla_status,
      sla_due_at,
      sla_started_at,
      repository_id,
      file_path,
      file_name,
      file_size,
      mime_type
    ) VALUES (
      :document_number,
      :title,
      :description,
      :discipline,
      :area,
      :revision,
      :status,
      :sla_status,
      :sla_due_at,
      :sla_started_at,
      :repository_id,
      :file_path,
      :file_name,
      :file_size,
      :mime_type
    )`,
    data
  );

  return result.insertId;
}

async function update(id, data, connection = pool) {
  await connection.execute(
    `UPDATE documents
    SET
      document_number = :document_number,
      title = :title,
      description = :description,
      discipline = :discipline,
      area = :area,
      revision = :revision,
      status = :status,
      sla_status = :sla_status,
      sla_due_at = :sla_due_at,
      sla_started_at = :sla_started_at,
      repository_id = :repository_id,
      file_path = :file_path,
      file_name = :file_name,
      file_size = :file_size,
      mime_type = :mime_type
    WHERE id = :id AND deleted_at IS NULL`,
    { ...data, id }
  );
}

async function softDelete(id, connection = pool) {
  await connection.execute(
    `DELETE FROM documents
    WHERE id = :id`,
    { id }
  );
}

async function countBySlaStatus(slaStatus) {
  const [rows] = await pool.execute(
    `SELECT COUNT(*) AS totalItems
    FROM documents d
    WHERE d.deleted_at IS NULL
      AND d.sla_status = :slaStatus`,
    { slaStatus }
  );

  return Number(rows[0]?.totalItems || 0);
}

export const documentRepository = {
  list,
  findById,
  findByDocumentNumber,
  create,
  update,
  softDelete,
  countBySlaStatus,
};
