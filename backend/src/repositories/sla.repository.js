import { pool } from "../database/mysql.js";

async function listAtRisk(filters, pagination) {
  const params = {};
  const searchSql = filters.search
    ? "AND (d.document_number LIKE :search OR d.title LIKE :search)"
    : "";
  if (filters.search) {
    params.search = `%${filters.search}%`;
  }

  const condition = `d.deleted_at IS NULL
    AND d.status NOT IN ('Approved', 'Final As-Built')
    AND (
      d.sla_status = 'At Risk'
      OR (
        d.sla_due_at IS NOT NULL
        AND d.sla_due_at >= UTC_TIMESTAMP()
        AND d.sla_due_at <= DATE_ADD(UTC_TIMESTAMP(), INTERVAL 24 HOUR)
      )
    )
    ${searchSql}`;

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS totalItems FROM documents d WHERE ${condition}`,
    params
  );

  const [rows] = await pool.execute(
    `SELECT d.*, r.name AS repository_name
    FROM documents d
    LEFT JOIN repositories r ON r.id = d.repository_id
    WHERE ${condition}
    ORDER BY d.sla_due_at ASC, d.updated_at DESC
    LIMIT :pageSize OFFSET :offset`,
    { ...params, pageSize: pagination.pageSize, offset: pagination.offset }
  );

  return { rows, totalItems: Number(countRows[0]?.totalItems || 0) };
}

async function findAtRiskById(id) {
  const [rows] = await pool.execute(
    `SELECT d.*, r.name AS repository_name
    FROM documents d
    LEFT JOIN repositories r ON r.id = d.repository_id
    WHERE d.deleted_at IS NULL
      AND d.id = :id
      AND d.status NOT IN ('Approved', 'Final As-Built')
      AND (
        d.sla_status = 'At Risk'
        OR (
          d.sla_due_at IS NOT NULL
          AND d.sla_due_at >= UTC_TIMESTAMP()
          AND d.sla_due_at <= DATE_ADD(UTC_TIMESTAMP(), INTERVAL 24 HOUR)
        )
      )
    LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

export const slaRepository = {
  listAtRisk,
  findAtRiskById,
};
