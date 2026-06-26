import { pool } from "../database/mysql.js";

async function list() {
  const [rows] = await pool.execute(
    `SELECT *
    FROM repositories
    WHERE deleted_at IS NULL
    ORDER BY name ASC`
  );

  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT *
    FROM repositories
    WHERE id = :id AND deleted_at IS NULL
    LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

async function create(data) {
  const [result] = await pool.execute(
    `INSERT INTO repositories (name, path, status, storage_type)
    VALUES (:name, :path, :status, :storage_type)`,
    data
  );

  return result.insertId;
}

async function update(id, data) {
  await pool.execute(
    `UPDATE repositories
    SET name = :name,
      path = :path,
      status = :status,
      storage_type = :storage_type
    WHERE id = :id AND deleted_at IS NULL`,
    { ...data, id }
  );
}

async function remove(id) {
  await pool.execute(
    `UPDATE repositories
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = :id AND deleted_at IS NULL`,
    { id }
  );
}

export const storageRepository = {
  list,
  findById,
  create,
  update,
  remove,
};
