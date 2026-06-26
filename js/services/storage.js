import { COLLECTIONS } from "../utils/constants.js";
import { formatDateTime } from "../utils/formatter.js";

const defaultData = {
  users: [
    {
      id: 1,
      username: "deny",
      password: "123456",
      name: "Bpk. Deny",
      email: "deny@sena.local",
      role: "Administrator",
      department: "Engineering",
      status: "Active",
      avatar: "",
    },
  ],
  documents: [
    {
      id: 1,
      documentNo: "P-CDU-PFD-001",
      description: "Process Flow Diagram Area 2",
      discipline: "PFD",
      area: "CDU",
      revision: 1,
      status: "Approved",
      sla: "2026-06-22",
      slaStartedAt: "2026-06-22 09:00",
      nasLocation: "\\\\NAS\\LAB\\CDU\\PFD001",
      createdAt: "2025-05-27 14:30",
      createdBy: "Bpk. Deny",
    },
    {
      id: 2,
      documentNo: "P-CDU-PID-010",
      description: "Heater System",
      discipline: "PID",
      area: "CDU",
      revision: 2,
      status: "Client Review",
      sla: "2026-06-20",
      slaStartedAt: "2026-06-20 14:32",
      nasLocation: "\\\\NAS\\LAB\\CDU\\PID010",
      createdAt: "2025-05-27 14:32",
      createdBy: "Bpk. Deny",
    },
  ],
  pfd: [
    { id: 1, documentNo: "P-CDU-PFD-001", title: "Process Flow Diagram Area 2", revision: 1, status: "Approved" },
  ],
  pid: [{ id: 1, documentNo: "P-CDU-PID-010", title: "Heater System", revision: 2, status: "Client Review" }],
  incomingTransmittal: [
    { id: 1, transmittalNo: "TR-IN-2025-001", sender: "Client", date: "2025-05-27", documents: 5, status: "Received" },
  ],
  outgoingTransmittal: [
    { id: 1, transmittalNo: "TR-OUT-2025-001", destination: "BEUK", date: "2025-05-27", documents: 8, status: "Sent" },
  ],
  auditTrail: [
    {
      id: 1,
      time: "2025-05-27 14:32",
      user: "Bpk. Deny",
      action: "Change Status",
      document: "P-CDU-PID-010",
      detail: "Status changed to Client Review",
    },
  ],
  sla: [{ id: 1, documentNo: "P-CDU-PFD-002", status: "At Risk", remaining: "2d 05h 10m" }],
  escalation: [{ id: 1, documentNo: "P-CDU-PID-013", level: 2, status: "Overdue", message: "SLA exceeded" }],
  storageRepository: [{ id: 1, name: "NAS", status: "Online", path: "\\\\NAS\\LAB" }],
  notifications: [],
  session: { isLoggedIn: false },
};

function readRaw(key) {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function writeRaw(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureCollection(collectionName) {
  if (!Object.values(COLLECTIONS).includes(collectionName)) {
    writeRaw(collectionName, []);
    return;
  }
  if (readRaw(collectionName) === null) {
    writeRaw(collectionName, defaultData[collectionName] ?? []);
  }
}

export function seed() {
  Object.values(COLLECTIONS).forEach(ensureCollection);
}

export function get(collectionName) {
  ensureCollection(collectionName);
  const value = readRaw(collectionName);
  return Array.isArray(value) ? value : [];
}

export function getSingle(collectionName) {
  ensureCollection(collectionName);
  return readRaw(collectionName);
}

export function getById(collectionName, id) {
  return get(collectionName).find((item) => Number(item.id) === Number(id)) ?? null;
}

export function replace(collectionName, array) {
  writeRaw(collectionName, Array.isArray(array) ? array : []);
}

export function replaceSingle(collectionName, value) {
  writeRaw(collectionName, value);
}

function prepareDocumentSlaTracking(data, currentItem = null, now = new Date()) {
  if (!Object.prototype.hasOwnProperty.call(data, "sla")) {
    return data;
  }

  if (!data.sla) {
    return { ...data, slaStartedAt: "" };
  }

  if (currentItem && data.sla === currentItem.sla) {
    return data;
  }

  return { ...data, slaStartedAt: formatDateTime(now) };
}

export function create(collectionName, data) {
  const collection = get(collectionName);
  const nextId = collection.reduce((highestId, item) => Math.max(highestId, Number(item.id) || 0), 0) + 1;
  const session = readRaw(COLLECTIONS.session) || {};
  const preparedData = collectionName === COLLECTIONS.documents ? prepareDocumentSlaTracking(data) : data;
  const insertedItem = {
    id: nextId,
    ...preparedData,
    createdAt: formatDateTime(),
    createdBy: session.name || session.username || "System",
  };
  replace(collectionName, [...collection, insertedItem]);
  return insertedItem;
}

export function update(collectionName, id, data) {
  const collection = get(collectionName);
  const session = readRaw(COLLECTIONS.session) || {};
  const itemIndex = collection.findIndex((item) => Number(item.id) === Number(id));
  if (itemIndex === -1) {
    return null;
  }
  const preparedData = collectionName === COLLECTIONS.documents ? prepareDocumentSlaTracking(data, collection[itemIndex]) : data;
  const updatedItem = {
    ...collection[itemIndex],
    ...preparedData,
    updatedAt: formatDateTime(),
    updatedBy: session.name || session.username || "System",
  };
  collection[itemIndex] = updatedItem;
  replace(collectionName, collection);
  return updatedItem;
}

export function remove(collectionName, id) {
  const collection = get(collectionName);
  const nextCollection = collection.filter((item) => Number(item.id) !== Number(id));
  if (nextCollection.length === collection.length) {
    return false;
  }
  replace(collectionName, nextCollection);
  return true;
}

export function clear(collectionName) {
  writeRaw(collectionName, []);
}

export function clearAll() {
  Object.values(COLLECTIONS).forEach((collectionName) => localStorage.removeItem(collectionName));
}

export function getSetting(key, defaultValue = null) {
  const value = readRaw(key);
  return value ?? defaultValue;
}

export function setSetting(key, value) {
  writeRaw(key, value);
}
