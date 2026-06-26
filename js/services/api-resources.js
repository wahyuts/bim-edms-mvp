import { deleteApi, downloadApi, getApi, postApi, postFormApi, putApi, putFormApi } from "./api.js";

const resourcePaths = {
  documents: "/documents",
  pfd: "/pfd",
  pid: "/pid",
  storage: "/storage",
  audit: "/audit-trail",
  sla: "/sla",
  escalation: "/escalation",
};

function toDateInput(value) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

export function mapDocumentFromApi(row) {
  return {
    id: row.id,
    documentNo: row.document_number,
    description: row.description || row.title,
    title: row.title,
    discipline: row.discipline,
    area: row.area || "",
    revision: row.revision,
    status: row.status,
    sla: toDateInput(row.sla_due_at),
    slaStartedAt: row.sla_started_at || "",
    slaStatus: row.sla_status || "",
    slaTimer: row.sla_timer?.label || "",
    nasLocation: row.file_path || row.repository_name || "",
    fileName: row.file_name || "",
    createdAt: row.created_at || "",
    updatedAt: row.updated_at || "",
    createdBy: row.created_by || "",
    raw: row,
  };
}

function mapStorageFromApi(row) {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    path: row.path,
    storageType: row.storage_type,
  };
}

function mapAuditFromApi(row) {
  return {
    id: row.id,
    time: row.created_at,
    user: row.full_name || row.username || "-",
    action: row.action,
    document: row.entity_id ? `${row.entity} #${row.entity_id}` : row.entity,
    detail: row.detail || "",
  };
}

function mapRows(resource, rows) {
  if (["documents", "pfd", "pid", "sla", "escalation"].includes(resource)) {
    return rows.map(mapDocumentFromApi);
  }
  if (resource === "storage") {
    return rows.map(mapStorageFromApi);
  }
  if (resource === "audit") {
    return rows.map(mapAuditFromApi);
  }
  return rows;
}

function getPath(resource) {
  return resourcePaths[resource] || `/${resource}`;
}

function appendIfPresent(formData, key, value) {
  if (value !== undefined && value !== null && value !== "") {
    formData.append(key, value);
  }
}

function documentFormData(formElement, data) {
  const formData = new FormData();
  const fileInput = formElement?.querySelector('input[type="file"]');
  const selectedFile = fileInput?.files?.[0];
  if (selectedFile) {
    formData.append("file", selectedFile);
  }

  appendIfPresent(formData, "document_number", data.documentNo);
  appendIfPresent(formData, "title", data.description);
  appendIfPresent(formData, "description", data.description);
  appendIfPresent(formData, "discipline", data.discipline);
  appendIfPresent(formData, "area", data.area);
  appendIfPresent(formData, "revision", data.revision);
  appendIfPresent(formData, "status", data.status);
  appendIfPresent(formData, "sla_due_at", data.sla);
  appendIfPresent(formData, "file_name", data.fileName);

  return formData;
}

function storagePayload(data) {
  return {
    name: data.name,
    path: data.path,
    status: data.status,
    storage_type: data.storageType || "Local",
  };
}

export async function listResource(resource, query = {}) {
  const params = new URLSearchParams({ pageSize: "1000", ...query });
  const response = await getApi(`${getPath(resource)}?${params.toString()}`);
  return mapRows(resource, response.data || []);
}

export async function createResource(resource, data, formElement = null) {
  if (["documents", "pfd", "pid"].includes(resource)) {
    const response = await postFormApi(getPath(resource), documentFormData(formElement, data));
    return mapDocumentFromApi(response.data);
  }
  if (resource === "storage") {
    const response = await postApi(getPath(resource), storagePayload(data));
    return mapStorageFromApi(response.data);
  }
  throw new Error("Create API is not configured for this resource");
}

export async function updateResource(resource, id, data, formElement = null) {
  if (["documents", "pfd", "pid"].includes(resource)) {
    const response = await putFormApi(`${getPath(resource)}/${id}`, documentFormData(formElement, data));
    return mapDocumentFromApi(response.data);
  }
  if (resource === "storage") {
    const response = await putApi(`${getPath(resource)}/${id}`, storagePayload(data));
    return mapStorageFromApi(response.data);
  }
  throw new Error("Update API is not configured for this resource");
}

export async function deleteResource(resource, id) {
  await deleteApi(`${getPath(resource)}/${id}`);
  return true;
}

export async function downloadResource(resource, record) {
  if (!record?.id) {
    throw new Error("Document is not available for download");
  }

  await downloadApi(`${getPath(resource)}/${record.id}/download`);
}
