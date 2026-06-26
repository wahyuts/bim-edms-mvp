import fs from "fs/promises";
import path from "path";
import { env } from "../../config/env.js";
import { buildSafeUploadName, safeSegment } from "../../utils/file-path.js";

function getUploadRoot() {
  return path.resolve(process.cwd(), env.uploadRoot);
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function toAbsolutePath(relativePath) {
  const uploadRoot = getUploadRoot();
  const normalized = relativePath.replace(/^uploads[\\/]/, "");
  return path.resolve(uploadRoot, normalized);
}

export function getDocumentAbsolutePath(relativePath) {
  if (!relativePath) {
    return null;
  }

  return toAbsolutePath(relativePath);
}

export async function saveDocumentFile(documentNumber, file) {
  if (!file) {
    return null;
  }

  const safeDocumentNumber = safeSegment(documentNumber);
  const storedName = buildSafeUploadName(documentNumber, file.originalname);
  const directory = path.join(getUploadRoot(), "documents", safeDocumentNumber);
  const absolutePath = path.join(directory, storedName);

  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(absolutePath, file.buffer);

  const relativePath = toPosixPath(path.join("uploads", "documents", safeDocumentNumber, storedName));

  return {
    file_path: relativePath,
    file_name: file.originalname,
    file_size: file.size,
    mime_type: file.mimetype,
  };
}

export async function deleteDocumentFile(relativePath) {
  if (!relativePath) {
    return;
  }

  const absolutePath = toAbsolutePath(relativePath);
  try {
    await fs.unlink(absolutePath);
    await fs.rmdir(path.dirname(absolutePath));
  } catch (error) {
    if (!["ENOENT", "ENOTEMPTY"].includes(error.code)) {
      throw error;
    }
  }
}
