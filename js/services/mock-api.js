import { create, get, getById, remove, update } from "./storage.js";

export function list(collectionName) {
  return get(collectionName);
}

export function detail(collectionName, id) {
  return getById(collectionName, id);
}

export function store(collectionName, data) {
  return create(collectionName, data);
}

export function save(collectionName, id, data) {
  return update(collectionName, id, data);
}

export function destroy(collectionName, id) {
  return remove(collectionName, id);
}
