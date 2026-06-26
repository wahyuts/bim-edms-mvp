import { pool } from "../database/mysql.js";

async function create(data, connection = pool) {
  const [result] = await connection.execute(
    `INSERT INTO notifications
      (user_id, title, message, type, module, target_route, target_label, is_read)
    VALUES
      (:user_id, :title, :message, :type, :module, :target_route, :target_label, 0)`,
    data
  );

  const [rows] = await connection.execute(
    `SELECT *
    FROM notifications
    WHERE id = :id
    LIMIT 1`,
    { id: result.insertId }
  );

  return rows[0] || null;
}

async function list(userId, pagination) {
  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS totalItems
    FROM notifications
    WHERE deleted_at IS NULL AND (user_id IS NULL OR user_id = :userId)`,
    { userId }
  );

  const [rows] = await pool.execute(
    `SELECT *
    FROM notifications
    WHERE deleted_at IS NULL AND (user_id IS NULL OR user_id = :userId)
    ORDER BY created_at DESC
    LIMIT :pageSize OFFSET :offset`,
    { userId, pageSize: pagination.pageSize, offset: pagination.offset }
  );

  return { rows, totalItems: Number(countRows[0]?.totalItems || 0) };
}

async function markRead(id, userId) {
  await pool.execute(
    `UPDATE notifications
    SET is_read = 1
    WHERE id = :id
      AND deleted_at IS NULL
      AND (user_id IS NULL OR user_id = :userId)`,
    { id, userId }
  );
}

async function remove(id, userId) {
  await pool.execute(
    `UPDATE notifications
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = :id
      AND deleted_at IS NULL
      AND (user_id IS NULL OR user_id = :userId)`,
    { id, userId }
  );
}

async function countUnread(userId) {
  const [rows] = await pool.execute(
    `SELECT COUNT(*) AS totalItems
    FROM notifications
    WHERE deleted_at IS NULL
      AND is_read = 0
      AND (user_id IS NULL OR user_id = :userId)`,
    { userId }
  );

  return Number(rows[0]?.totalItems || 0);
}

export const notificationRepository = {
  create,
  list,
  markRead,
  remove,
  countUnread,
};
