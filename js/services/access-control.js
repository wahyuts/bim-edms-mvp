import { currentSession } from "./auth.js";
//tes update
const rolePermissions = {
  Administrator: {
    all: ["view", "create", "edit", "delete", "download", "upload"],
  },
  "Project Manager": {
    all: ["view", "create", "edit", "delete", "download", "upload"],
  },
  "Document Controller": {
    document: ["view", "create", "edit", "delete", "download", "upload"],
    transmittal: ["view", "create", "edit", "delete", "download"],
    escalation: ["view", "edit"],
    audit: ["view"],
    storage: ["view", "create", "edit"],
    notification: ["view", "edit", "delete"],
  },
  Engineer: {
    document: ["view", "create", "edit", "download", "upload"],
    transmittal: ["view"],
    escalation: ["view"],
    audit: ["view"],
    storage: ["view"],
    notification: ["view", "edit", "delete"],
  },
  Client: {
    document: ["view", "edit", "download"],
    transmittal: ["view"],
    escalation: [],
    audit: ["view"],
    storage: ["view"],
    notification: ["view", "edit", "delete"],
  },
};

export function can(moduleName, action) {
  const role = currentSession().role || "Client";
  if (moduleName === "transmittal") {
    return role === "Administrator" && ["view", "create", "edit", "delete", "download"].includes(action);
  }
  if (moduleName === "user-management") {
    return role === "Administrator" && ["view", "create", "edit", "delete"].includes(action);
  }
  if (moduleName === "storage" && ["edit", "delete", "download"].includes(action)) {
    return role === "Administrator";
  }
  const permissions = rolePermissions[role] || rolePermissions.Client;
  if (permissions.all?.includes(action)) {
    return true;
  }
  return permissions[moduleName]?.includes(action) || false;
}

export function visibleActions(moduleName, actions) {
  return actions.filter((action) => can(moduleName, action));
}

export function canView(moduleName) {
  return can(moduleName, "view");
}
