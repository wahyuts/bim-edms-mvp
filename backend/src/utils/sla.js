const CLOSED_STATUSES = new Set(["Approved", "Final As-Built"]);
const AT_RISK_HOURS = 24;

export function getHoursElapsed(slaStartedAt, now = new Date()) {
  if (!slaStartedAt) {
    return null;
  }

  const started = new Date(slaStartedAt);
  if (Number.isNaN(started.getTime())) {
    return null;
  }

  return Math.max(Math.floor((now.getTime() - started.getTime()) / 36e5), 0);
}

export function getDerivedSlaStatus(document, now = new Date()) {
  if (CLOSED_STATUSES.has(document.status)) {
    return "Final As-Built";
  }

  if (!document.sla_started_at || !document.sla_due_at) {
    return document.sla_status || "On Track";
  }

  const dueAt = new Date(document.sla_due_at);
  if (Number.isNaN(dueAt.getTime())) {
    return document.sla_status || "On Track";
  }

  const hoursToDue = Math.ceil((dueAt.getTime() - now.getTime()) / 36e5);
  if (hoursToDue < 0) {
    return "Overdue";
  }

  if (hoursToDue <= AT_RISK_HOURS) {
    return "At Risk";
  }

  return "On Track";
}

export function getSlaTimer(document, now = new Date()) {
  const elapsedHours = getHoursElapsed(document.sla_started_at, now);
  if (elapsedHours === null) {
    return null;
  }

  const days = Math.floor(elapsedHours / 24);
  const hours = elapsedHours % 24;

  return {
    elapsedHours,
    label: `${days}d ${hours}h`,
  };
}

export function withSlaDerivedFields(document, now = new Date()) {
  const sla_status = getDerivedSlaStatus(document, now);
  return {
    ...document,
    sla_status,
    sla_timer: getSlaTimer(document, now),
    escalation_level: sla_status === "Overdue" ? 1 : 0,
  };
}
