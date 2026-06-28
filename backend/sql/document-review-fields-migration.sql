ALTER TABLE documents
  ADD COLUMN IF NOT EXISTS verify_deadline_date DATE NULL AFTER sla_due_at,
  ADD COLUMN IF NOT EXISTS review_comment TEXT NULL AFTER verify_deadline_date;
