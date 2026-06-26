export function formatDateTime(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 16).replace("T", " ");
}

export function formatCount(value) {
  return Number(value || 0).toLocaleString("en-US");
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
