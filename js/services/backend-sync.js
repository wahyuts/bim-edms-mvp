import { listResource } from "./api-resources.js";
import { get, replace } from "./storage.js";
import { COLLECTIONS } from "../utils/constants.js";

export async function syncDocuments() {
  try {
    const documents = await listResource("documents");
    replace(COLLECTIONS.documents, documents);
    return documents;
  } catch (error) {
    return get(COLLECTIONS.documents);
  }
}

export async function syncStorageRepositories() {
  try {
    const repositories = await listResource("storage");
    replace(COLLECTIONS.storageRepository, repositories);
    return repositories;
  } catch (error) {
    return get(COLLECTIONS.storageRepository);
  }
}

export async function syncDashboardData() {
  const [documents, storageRepository] = await Promise.all([
    syncDocuments(),
    syncStorageRepositories(),
  ]);

  return { documents, storageRepository };
}
