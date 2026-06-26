import {
  createNotification,
  deleteNotification,
  listNotifications,
  markNotificationRead,
} from "../services/notification.service.js";
import { success } from "../utils/response.js";

export async function createNotificationController(req, res) {
  return success(
    res,
    await createNotification(req.user.id, req.body),
    "Notification created"
  );
}

export async function listNotificationsController(req, res) {
  const result = await listNotifications(req.user.id, req.query);
  return success(res, result.data, "Notifications fetched", result.meta);
}

export async function markNotificationReadController(req, res) {
  return success(
    res,
    await markNotificationRead(req.params.id, req.user.id),
    "Notification marked as read"
  );
}

export async function deleteNotificationController(req, res) {
  return success(
    res,
    await deleteNotification(req.params.id, req.user.id),
    "Notification deleted"
  );
}
