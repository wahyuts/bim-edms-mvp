import { notificationRepository } from "../repositories/notification.repository.js";
import { validationError } from "../utils/api-error.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";

const notificationTypes = ["info", "success", "warning", "error"];

export async function createNotification(userId, data = {}) {
  const errors = {};
  if (!data.title?.trim()) errors.title = "Title is required";
  if (!data.message?.trim()) errors.message = "Message is required";
  if (data.type && !notificationTypes.includes(data.type)) {
    errors.type = "Invalid notification type";
  }
  if (Object.keys(errors).length) {
    throw validationError(errors);
  }

  return notificationRepository.create({
    user_id: userId ?? null,
    title: data.title.trim(),
    message: data.message.trim(),
    type: data.type || "info",
    module: data.module || "system",
    target_route: data.target_route || data.targetRoute || "/dashboard",
    target_label: data.target_label || data.targetLabel || "Open",
  });
}

export async function listNotifications(userId, query = {}) {
  const pagination = getPagination(query);
  const result = await notificationRepository.list(userId, pagination);
  return {
    data: result.rows,
    meta: buildPaginationMeta(pagination.page, pagination.pageSize, result.totalItems),
  };
}

export async function markNotificationRead(id, userId) {
  await notificationRepository.markRead(id, userId);
  return { id: Number(id), is_read: true };
}

export async function deleteNotification(id, userId) {
  await notificationRepository.remove(id, userId);
  return { id: Number(id) };
}
