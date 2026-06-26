import { ROUTES } from "../utils/constants.js";
import { deleteApi, getApi, postApi, putApi } from "./api.js";

export async function createNotification({ title, message, type = "info", module = "system", targetRoute = ROUTES.dashboard, targetLabel = "Open" }) {
  const payload = {
    title,
    message,
    type,
    module,
    targetRoute,
    targetLabel,
  };

  try {
    const response = await postApi("/notifications", payload);
    return normalizeNotification(response.data);
  } catch {
    return null;
  }
}

function normalizeNotification(item = {}) {
  return {
    id: item.id,
    title: item.title || "Notification",
    message: item.message || "-",
    type: item.type || "info",
    module: item.module || "system",
    targetRoute: item.targetRoute || item.target_route || ROUTES.dashboard,
    targetLabel: item.targetLabel || item.target_label || "Open",
    createdAt: item.createdAt || item.created_at || "-",
    read: Boolean(item.read ?? item.is_read),
  };
}

export async function fetchNotifications() {
  try {
    const response = await getApi("/notifications?pageSize=1000");
    return (response.data || []).map(normalizeNotification);
  } catch {
    return [];
  }
}

export async function getUnreadNotificationCount() {
  const notifications = await fetchNotifications();
  return notifications.filter((notification) => !notification.read).length;
}

export async function markNotificationRead(id) {
  try {
    await putApi(`/notifications/${id}/read`, {});
    return true;
  } catch {
    return false;
  }
}

export async function deleteNotification(id) {
  try {
    await deleteApi(`/notifications/${id}`);
    return true;
  } catch {
    return false;
  }
}
