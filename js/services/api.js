import { API_BASE_URL, COLLECTIONS } from "../utils/constants.js";
import { getSingle } from "./storage.js";

function getToken() {
  return getSingle(COLLECTIONS.session)?.token || "";
}

export async function requestApi(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false) {
    const error = new Error(payload.message || "API request failed");
    error.errors = payload.errors || null;
    throw error;
  }

  return payload;
}

export function getApi(path) {
  return requestApi(path);
}

export function postApi(path, data) {
  return requestApi(path, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function putApi(path, data) {
  return requestApi(path, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteApi(path) {
  return requestApi(path, {
    method: "DELETE",
  });
}

export function postFormApi(path, formData) {
  return requestApi(path, {
    method: "POST",
    body: formData,
  });
}

export function putFormApi(path, formData) {
  return requestApi(path, {
    method: "PUT",
    body: formData,
  });
}

function getFileNameFromDisposition(disposition) {
  const match = /filename="?([^"]+)"?/i.exec(disposition || "");
  return match?.[1] || "download";
}

export async function downloadApi(path) {
  const headers = {
    Accept: "application/octet-stream",
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { headers });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Download failed");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = getFileNameFromDisposition(response.headers.get("content-disposition"));
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
