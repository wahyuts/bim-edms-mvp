import {
  createDocument,
  deleteDocument,
  getDocumentDownload,
  getDocument,
  listDocuments,
  updateDocument,
} from "../services/document.service.js";
import { success } from "../utils/response.js";

export async function listDocumentsController(req, res) {
  const result = await listDocuments(req.query);
  return success(res, result.data, "Documents fetched", result.meta);
}

export async function getDocumentController(req, res) {
  return success(res, await getDocument(req.params.id), "Document fetched");
}

export async function createDocumentController(req, res) {
  return success(
    res.status(201),
    await createDocument(req.body, req.file, req.user),
    "Document created"
  );
}

export async function updateDocumentController(req, res) {
  return success(
    res,
    await updateDocument(req.params.id, req.body, req.file, req.user),
    "Document updated"
  );
}

export async function deleteDocumentController(req, res) {
  return success(
    res,
    await deleteDocument(req.params.id, req.user),
    "Document deleted"
  );
}

export async function downloadDocumentController(req, res) {
  const file = await getDocumentDownload(req.params.id);
  return res.download(file.path, file.fileName);
}
