ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS type VARCHAR(30) NOT NULL DEFAULT 'info' AFTER message,
  ADD COLUMN IF NOT EXISTS module VARCHAR(100) NOT NULL DEFAULT 'system' AFTER type,
  ADD COLUMN IF NOT EXISTS target_route VARCHAR(255) NULL AFTER module,
  ADD COLUMN IF NOT EXISTS target_label VARCHAR(100) NULL AFTER target_route;

DELETE FROM notifications
WHERE title = 'Escalation Alert'
  AND message = 'Document SLA exceeded'
  AND target_route IS NULL;
