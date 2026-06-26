import path from "path";

export function safeSegment(value) {
  return String(value || "untitled")
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

export function buildSafeUploadName(documentNumber, originalName) {
  const extension = path.extname(originalName || "").toLowerCase();
  const baseName = safeSegment(path.basename(originalName || "document", extension));
  const safeDocumentNumber = safeSegment(documentNumber);
  return `${safeDocumentNumber}-${Date.now()}-${baseName}${extension}`;
}
