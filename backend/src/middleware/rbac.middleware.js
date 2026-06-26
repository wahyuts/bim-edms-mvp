import { forbidden } from "../utils/api-error.js";

export function requirePermission(permission) {
  return (req, res, next) => {
    const role = req.user?.role || "Client";
    const permissions = req.user?.permissions || [];
    const allowed =
      role === "Administrator" ||
      permissions.includes(permission) ||
      permission === "dashboard.view";

    if (!allowed) {
      return next(forbidden());
    }

    return next();
  };
}
