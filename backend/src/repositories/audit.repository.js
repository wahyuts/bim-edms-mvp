import { pool } from "../database/mysql.js";

async function create(data, connection = pool) {
  const [result] = await connection.execute(
    `INSERT INTO audit_trail (user_id, action, entity, entity_id, detail)
    VALUES (:user_id, :action, :entity, :entity_id, :detail)`,
    data
  );

  return result.insertId;
}

async function list(filters, pagination) {
  const where = ["1 = 1"];
  const params = {};

  if (filters.search) {
    where.push("(a.action LIKE :search OR a.entity LIKE :search OR a.detail LIKE :search)");
    params.search = `%${filters.search}%`;
  }

  if (filters.user_id) {
    where.push("a.user_id = :user_id");
    params.user_id = filters.user_id;
  }

  if (filters.action) {
    where.push("a.action = :action");
    params.action = filters.action;
  }

  if (filters.date_from) {
    where.push("a.created_at >= :date_from");
    params.date_from = filters.date_from;
  }

  if (filters.date_to) {
    where.push("a.created_at <= :date_to");
    params.date_to = filters.date_to;
  }

  const whereSql = where.join(" AND ");
  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS totalItems FROM audit_trail a WHERE ${whereSql}`,
    params
  );
  const [rows] = await pool.execute(
    `SELECT a.*, u.username, u.full_name
    FROM audit_trail a
    LEFT JOIN users u ON u.id = a.user_id
    WHERE ${whereSql}
    ORDER BY a.created_at DESC
    LIMIT :pageSize OFFSET :offset`,
    { ...params, pageSize: pagination.pageSize, offset: pagination.offset }
  );

  return { rows, totalItems: Number(countRows[0]?.totalItems || 0) };
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT a.*, u.username, u.full_name
    FROM audit_trail a
    LEFT JOIN users u ON u.id = a.user_id
    WHERE a.id = :id
    LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

export const auditRepository = {
  create,
  list,
  findById,
};
