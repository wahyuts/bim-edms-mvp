export function addHours(date, hours) {
  const nextDate = new Date(date);
  nextDate.setHours(nextDate.getHours() + hours);
  return nextDate;
}

export function diffMinutes(fromDate, toDate) {
  return Math.max(0, Math.floor((new Date(toDate) - new Date(fromDate)) / 60000));
}

export function formatDuration(minutes) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const restMinutes = minutes % 60;
  return `${days}d ${String(hours).padStart(2, "0")}h ${String(restMinutes).padStart(2, "0")}m`;
}
