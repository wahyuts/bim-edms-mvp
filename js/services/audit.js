import { COLLECTIONS } from "../utils/constants.js";
import { create, getSingle } from "./storage.js";
import { formatDateTime } from "../utils/formatter.js";

export function createAudit({ action, document = "-", detail = "", user = "" }) {
  const session = getSingle(COLLECTIONS.session) || {};
  return create(COLLECTIONS.auditTrail, {
    time: formatDateTime(),
    user: user || session.name || session.username || "System",
    action,
    document,
    detail,
  });
}
