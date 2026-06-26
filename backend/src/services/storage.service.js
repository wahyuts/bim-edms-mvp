import { storageRepository } from "../repositories/storage.repository.js";
import { notFound, validationError } from "../utils/api-error.js";

function normalizePayload(body = {}) {
  return {
    name: body.name,
    path: body.path,
    status: body.status || "Online",
    storage_type: body.storage_type || body.storageType || "Local",
  };
}

function validatePayload(data) {
  const errors = {};
  if (!data.name) errors.name = "Name is required";
  if (!data.path) errors.path = "Path is required";
  if (!data.status) errors.status = "Status is required";

  if (Object.keys(errors).length) {
    throw validationError(errors);
  }
}

export async function listStorageRepositories() {
  return storageRepository.list();
}

export async function getStorageRepository(id) {
  const repository = await storageRepository.findById(id);
  if (!repository) {
    throw notFound("Storage repository not found");
  }

  return repository;
}

export async function createStorageRepository(body) {
  const payload = normalizePayload(body);
  validatePayload(payload);
  const id = await storageRepository.create(payload);
  return getStorageRepository(id);
}

export async function updateStorageRepository(id, body) {
  const existing = await getStorageRepository(id);
  const payload = { ...existing, ...normalizePayload(body) };
  validatePayload(payload);
  await storageRepository.update(id, payload);
  return getStorageRepository(id);
}

export async function deleteStorageRepository(id) {
  await getStorageRepository(id);
  await storageRepository.remove(id);
  return { id: Number(id) };
}
