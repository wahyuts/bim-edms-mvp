import {
  createStorageRepository,
  deleteStorageRepository,
  getStorageRepository,
  listStorageRepositories,
  updateStorageRepository,
} from "../services/storage.service.js";
import { success } from "../utils/response.js";

export async function listStorageController(req, res) {
  return success(res, await listStorageRepositories(), "Storage repositories fetched");
}

export async function getStorageController(req, res) {
  return success(res, await getStorageRepository(req.params.id), "Storage repository fetched");
}

export async function createStorageController(req, res) {
  return success(
    res.status(201),
    await createStorageRepository(req.body),
    "Storage repository created"
  );
}

export async function updateStorageController(req, res) {
  return success(
    res,
    await updateStorageRepository(req.params.id, req.body),
    "Storage repository updated"
  );
}

export async function deleteStorageController(req, res) {
  return success(
    res,
    await deleteStorageRepository(req.params.id),
    "Storage repository deleted"
  );
}
