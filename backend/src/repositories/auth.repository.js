import { pool } from "../database/mysql.js";

async function findByUsername(username) {
  const [rows] = await pool.execute(
    `SELECT
      u.id,
      u.username,
      u.password_hash,
      u.full_name,
      u.email,
      u.department,
      u.status,
      u.avatar,
      r.name AS role_name
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.deleted_at IS NULL
      AND u.status = 'Active'
      AND (u.username = :username OR u.email = :username)
    LIMIT 1`,
    { username }
  );

  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT
      u.id,
      u.username,
      u.full_name,
      u.email,
      u.department,
      u.status,
      u.avatar,
      r.name AS role_name
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.deleted_at IS NULL AND u.id = :id
    LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

async function listPermissionCodes(userId) {
  const [rows] = await pool.execute(
    `SELECT p.code
    FROM users u
    JOIN roles r ON r.id = u.role_id
    JOIN role_permissions rp ON rp.role_id = r.id
    JOIN permissions p ON p.id = rp.permission_id
    WHERE u.id = :userId AND u.deleted_at IS NULL
    ORDER BY p.code`,
    { userId }
  );

  return rows.map((row) => row.code);
}

export const authRepository = {
  findByUsername,
  findById,
  listPermissionCodes,
};
