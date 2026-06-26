const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/;
const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const SLA_ON_TRACK_MAX_DAYS = 6;
const SLA_AT_RISK_DAY = 7;
const SLA_OVERDUE_START_DAY = 8;
const MAX_ESCALATION_LEVEL = 4;
const SLA_FINAL_STATUSES = ["Approved", "Final As-Built"];

function hasSlaDate(value) {
  return DATE_ONLY_PATTERN.test(String(value || ""));
}

function parseDateTime(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  const dateTimeMatch = DATE_TIME_PATTERN.exec(String(value || ""));
  if (dateTimeMatch) {
    const [, year, month, day, hour, minute] = dateTimeMatch;
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  }

  const match = DATE_ONLY_PATTERN.exec(String(value || ""));
  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return null;
}

function getSlaStartDate(documentItem) {
  if (!hasSlaDate(documentItem?.sla)) {
    return null;
  }

  return parseDateTime(documentItem?.slaStartedAt || documentItem?.updatedAt || documentItem?.createdAt || documentItem?.sla);
}

function getSlaElapsedMs(documentItem, now = new Date()) {
  const startDate = getSlaStartDate(documentItem);
  if (!startDate) {
    return null;
  }

  return Math.max(0, now.getTime() - startDate.getTime());
}

export function getDocumentSlaElapsedDays(documentItem, now = new Date()) {
  const elapsedMs = getSlaElapsedMs(documentItem, now);
  if (elapsedMs === null) {
    return null;
  }
  return Math.floor(elapsedMs / DAY_IN_MS);
}

export function formatSlaCountUp(documentItem, now = new Date()) {
  const elapsedMs = getSlaElapsedMs(documentItem, now);
  if (elapsedMs === null) {
    return "-";
  }

  const days = Math.floor(elapsedMs / DAY_IN_MS);
  const hours = Math.floor((elapsedMs % DAY_IN_MS) / HOUR_IN_MS);
  const minutes = Math.floor((elapsedMs % HOUR_IN_MS) / MINUTE_IN_MS);

  return `${days}d ${hours}h ${minutes}m`;
}

export function formatDocumentSlaTimer(documentItem, now = new Date()) {
  if (documentItem?.status === "Approved") {
    return "Done";
  }
  return formatSlaCountUp(documentItem, now);
}

export function getDocumentSlaOverviewStatus(documentItem, now = new Date()) {
  if (SLA_FINAL_STATUSES.includes(documentItem?.status)) {
    return "Final As-Built";
  }

  const elapsedDays = getDocumentSlaElapsedDays(documentItem, now);
  if (elapsedDays === null) {
    return null;
  }
  if (elapsedDays <= SLA_ON_TRACK_MAX_DAYS) {
    return "On Track";
  }
  if (elapsedDays === SLA_AT_RISK_DAY) {
    return "At Risk";
  }
  return "Overdue";
}

export function isDocumentSlaOverdue(documentItem, now = new Date()) {
  return getDocumentSlaOverviewStatus(documentItem, now) === "Overdue";
}

export function getDocumentEscalationLevel(documentItem, now = new Date()) {
  if (SLA_FINAL_STATUSES.includes(documentItem?.status)) {
    return null;
  }
  const elapsedDays = getDocumentSlaElapsedDays(documentItem, now);
  if (elapsedDays === null || elapsedDays < SLA_OVERDUE_START_DAY) {
    return null;
  }
  return Math.min(MAX_ESCALATION_LEVEL, elapsedDays - SLA_OVERDUE_START_DAY + 1);
}

export function getDocumentSlaTimerClass(documentItem, now = new Date()) {
  const slaStatus = getDocumentSlaOverviewStatus(documentItem, now);
  const classes = {
    "On Track": "text-green-300 font-semibold",
    "At Risk": "text-amber-300 font-semibold",
    Overdue: "text-red-300 font-semibold",
    "Final As-Built": "text-blue-300 font-semibold",
  };
  return classes[slaStatus] || "text-slate-200";
}
