export const APP_NAME = "SENA EDMS";
export const API_BASE_URL = window.EDMS_API_BASE_URL || "http://localhost:4000/api/v1";
// export const API_BASE_URL = window.EDMS_API_BASE_URL || "https://bim-edms-mvp-production.up.railway.app/api/v1";

export const ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  documentRegister: "/document-register",
  pfd: "/document-register/pfd",
  pid: "/document-register/pid",
  incoming: "/transmittal/incoming",
  outgoing: "/transmittal/outgoing",
  escalation: "/escalation",
  auditTrail: "/audit-trail",
  storage: "/storage/nas",
  sla: "/sla",
  notifications: "/notifications",
  profile: "/profile",
  createNewUser: "/create-new-user",
  editUserProfile: "/edit-user-profile",
  changePassword: "/change-password",
};

export const USER_ROLES = ["Administrator", "Project Manager", "Document Controller", "Engineer", "Client"];

export const COLLECTIONS = {
  users: "users",
  documents: "documents",
  pfd: "pfd",
  pid: "pid",
  incomingTransmittal: "incomingTransmittal",
  outgoingTransmittal: "outgoingTransmittal",
  auditTrail: "auditTrail",
  sla: "sla",
  escalation: "escalation",
  storageRepository: "storageRepository",
  notifications: "notifications",
  session: "session",
};

export const DEFAULT_PAGE_SIZE = 10;
export const TOAST_DURATION = 3000;

export const DOCUMENT_STATUSES = [
  "Internal Draft",
  "Internal Review",
  "Client Review",
  "Revision Requested",
  "Approved",
  "Final As-Built",
];

export const DOCUMENT_EDITABLE_STATUSES = DOCUMENT_STATUSES.filter((status) => status !== "Final As-Built");
export const DOCUMENT_STATUS_FILTER_OPTIONS = DOCUMENT_EDITABLE_STATUSES;

export const SLA_RULES = {
  "Internal Draft": 72,
  "Internal Review": 120,
  "Client Review": 168,
  "Revision Requested": 72,
  "Final As-Built": 0,
};
