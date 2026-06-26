import { pool } from "../database/mysql.js";

async function list() {
  const [rows] = await pool.execute(
    `SELECT
      u.id,
      u.username,
      u.full_name,
      u.email,
      u.department,
      u.status,
      u.avatar,
      r.name AS role
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.deleted_at IS NULL
    ORDER BY u.full_name ASC`
  );

  return rows;
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
      r.name AS role
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.deleted_at IS NULL AND u.id = :id
    LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

async function findPasswordById(id) {
  const [rows] = await pool.execute(
    `SELECT id, password_hash
    FROM users
    WHERE deleted_at IS NULL AND id = :id
    LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

async function findRoleId(roleName) {
  const [rows] = await pool.execute(
    `SELECT id FROM roles WHERE name = :roleName LIMIT 1`,
    { roleName }
  );

  return rows[0]?.id || null;
}

async function findByUsernameOrEmail(username, email, excludeId = null) {
  const params = { username, email, excludeId };
  const excludeSql = excludeId ? "AND id <> :excludeId" : "";
  const [rows] = await pool.execute(
    `SELECT id, username, email
    FROM users
    WHERE deleted_at IS NULL
      AND (username = :username OR email = :email)
      ${excludeSql}
    LIMIT 1`,
    params
  );

  return rows[0] || null;
}

async function create(data) {
  const [result] = await pool.execute(
    `INSERT INTO users (
      username,
      password_hash,
      full_name,
      email,
      role_id,
      department,
      status,
      avatar
    ) VALUES (
      :username,
      :password_hash,
      :full_name,
      :email,
      :role_id,
      :department,
      :status,
      :avatar
    )`,
    data
  );

  return result.insertId;
}

async function update(id, data) {
  const passwordSql = data.password_hash ? ", password_hash = :password_hash" : "";
  await pool.execute(
    `UPDATE users
    SET username = :username,
      full_name = :full_name,
      email = :email,
      role_id = :role_id,
      department = :department,
      status = :status,
      avatar = :avatar
      ${passwordSql}
    WHERE id = :id AND deleted_at IS NULL`,
    { ...data, id }
  );
}

async function remove(id) {
  await pool.execute(
    `DELETE FROM users
    WHERE id = :id`,
    { id }
  );
}

export const userRepository = {
  list,
  findById,
  findPasswordById,
  findRoleId,
  findByUsernameOrEmail,
  create,
  update,
  remove,
};
