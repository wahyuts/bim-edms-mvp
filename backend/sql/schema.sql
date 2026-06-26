-- SENA EDMS MVP
-- MySQL 8+ initial schema

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- CREATE DATABASE IF NOT EXISTS edms_db
--   CHARACTER SET utf8mb4
--   COLLATE utf8mb4_unicode_ci;

-- USE edms_db;

CREATE TABLE IF NOT EXISTS roles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS permissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_permissions_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id BIGINT UNSIGNED NOT NULL,
  permission_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_role_permissions_role
    FOREIGN KEY (role_id) REFERENCES roles (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_role_permissions_permission
    FOREIGN KEY (permission_id) REFERENCES permissions (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  role_id BIGINT UNSIGNED NOT NULL,
  department VARCHAR(100) NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Active',
  avatar VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role_id (role_id),
  KEY idx_users_status (status),
  CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES roles (id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS repositories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  path TEXT NOT NULL,
  status VARCHAR(50) NOT NULL,
  storage_type VARCHAR(50) NOT NULL DEFAULT 'NAS',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_repositories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS documents (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  document_number VARCHAR(200) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  discipline VARCHAR(50) NOT NULL,
  area VARCHAR(100) NULL,
  revision INT NOT NULL DEFAULT 1,
  status VARCHAR(100) NOT NULL,
  sla_status VARCHAR(50) NULL,
  sla_due_at DATETIME NULL,
  sla_started_at DATETIME NULL,
  repository_id BIGINT UNSIGNED NULL,
  file_path TEXT NULL,
  file_name VARCHAR(255) NULL,
  file_size BIGINT UNSIGNED NULL,
  mime_type VARCHAR(100) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_documents_document_number (document_number),
  KEY idx_documents_status (status),
  KEY idx_documents_discipline (discipline),
  KEY idx_documents_sla_due_at (sla_due_at),
  KEY idx_documents_repository_id (repository_id),
  CONSTRAINT fk_documents_repository
    FOREIGN KEY (repository_id) REFERENCES repositories (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS transmittals (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  transmittal_number VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  sender VARCHAR(255) NULL,
  destination VARCHAR(255) NULL,
  transmittal_date DATETIME NULL,
  status VARCHAR(100) NOT NULL,
  remarks TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_transmittals_number (transmittal_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS transmittal_documents (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  transmittal_id BIGINT UNSIGNED NOT NULL,
  document_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_transmittal_documents_pair (transmittal_id, document_id),
  KEY idx_transmittal_documents_transmittal_id (transmittal_id),
  KEY idx_transmittal_documents_document_id (document_id),
  CONSTRAINT fk_transmittal_documents_transmittal
    FOREIGN KEY (transmittal_id) REFERENCES transmittals (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_transmittal_documents_document
    FOREIGN KEY (document_id) REFERENCES documents (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_trail (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NULL,
  action VARCHAR(100) NOT NULL,
  entity VARCHAR(100) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  detail TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_audit_trail_user_id (user_id),
  KEY idx_audit_trail_created_at (created_at),
  CONSTRAINT fk_audit_trail_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(30) NOT NULL DEFAULT 'info',
  module VARCHAR(100) NOT NULL DEFAULT 'system',
  target_route VARCHAR(255) NULL,
  target_label VARCHAR(100) NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  PRIMARY KEY (id),
  KEY idx_notifications_user_id (user_id),
  KEY idx_notifications_is_read (is_read),
  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sla_rules (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  status_name VARCHAR(100) NOT NULL,
  duration_hours INT NOT NULL,
  escalation_level INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sla_rules_status_name (status_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS escalation_logs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  document_id BIGINT UNSIGNED NOT NULL,
  escalation_level INT NOT NULL,
  escalated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  remarks TEXT NULL,
  PRIMARY KEY (id),
  KEY idx_escalation_logs_document_id (document_id),
  KEY idx_escalation_logs_escalated_at (escalated_at),
  CONSTRAINT fk_escalation_logs_document
    FOREIGN KEY (document_id) REFERENCES documents (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO roles (name, description) VALUES
  ('Administrator', 'Full access'),
  ('Project Manager', 'Project management access'),
  ('Document Controller', 'Document control access'),
  ('Engineer', 'Engineering access'),
  ('Client', 'Client access')
ON DUPLICATE KEY UPDATE description = VALUES(description);

INSERT INTO permissions (code, name) VALUES
  ('document.create', 'Create Document'),
  ('document.view', 'View Document'),
  ('document.edit', 'Edit Document'),
  ('document.delete', 'Delete Document'),
  ('document.download', 'Download Document'),
  ('document.upload', 'Upload Document'),
  ('dashboard.view', 'View Dashboard'),
  ('user.view', 'View User'),
  ('user.create', 'Create User'),
  ('user.edit', 'Edit User'),
  ('user.delete', 'Delete User'),
  ('escalation.view', 'View Escalation'),
  ('audit.view', 'View Audit Trail'),
  ('storage.view', 'View Storage Repository'),
  ('storage.create', 'Create Storage Repository'),
  ('storage.edit', 'Edit Storage Repository'),
  ('storage.delete', 'Delete Storage Repository'),
  ('notification.view', 'View Notification'),
  ('notification.edit', 'Mark Notification Read'),
  ('notification.delete', 'Delete Notification')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
WHERE
  (r.name = 'Administrator' AND p.code IN ('dashboard.view', 'user.view', 'user.create', 'user.edit', 'user.delete', 'document.create', 'document.view', 'document.edit', 'document.delete', 'document.download', 'document.upload', 'escalation.view', 'audit.view', 'storage.view', 'storage.create', 'storage.edit', 'storage.delete', 'notification.view', 'notification.edit', 'notification.delete'))
  OR (r.name = 'Project Manager' AND p.code IN ('dashboard.view', 'document.create', 'document.view', 'document.edit', 'document.delete', 'document.download', 'document.upload', 'escalation.view', 'audit.view', 'storage.view', 'storage.create', 'notification.view', 'notification.edit', 'notification.delete'))
  OR (r.name = 'Document Controller' AND p.code IN ('dashboard.view', 'document.create', 'document.view', 'document.edit', 'document.delete', 'document.download', 'document.upload', 'escalation.view', 'audit.view', 'storage.view', 'storage.create', 'notification.view', 'notification.edit', 'notification.delete'))
  OR (r.name = 'Engineer' AND p.code IN ('dashboard.view', 'document.create', 'document.view', 'document.edit', 'document.download', 'document.upload', 'escalation.view', 'audit.view', 'storage.view', 'notification.view', 'notification.edit', 'notification.delete'))
  OR (r.name = 'Client' AND p.code IN ('dashboard.view', 'document.view', 'document.download', 'audit.view', 'storage.view', 'notification.view', 'notification.edit', 'notification.delete'))
ON DUPLICATE KEY UPDATE permission_id = VALUES(permission_id);

INSERT INTO sla_rules (status_name, duration_hours, escalation_level) VALUES
  ('Internal Draft', 72, 1),
  ('Internal Review', 120, 1),
  ('Client Review', 168, 2),
  ('Revision Requested', 72, 1),
  ('Approved', 0, 0),
  ('Final As-Built', 0, 0)
ON DUPLICATE KEY UPDATE duration_hours = VALUES(duration_hours), escalation_level = VALUES(escalation_level);

INSERT INTO repositories (name, path, status, storage_type) VALUES
  ('NAS', '\\\\NAS\\LAB', 'Offline', 'NAS'),
  ('Local Uploads', 'uploads', 'Online', 'Local')
ON DUPLICATE KEY UPDATE path = VALUES(path), status = VALUES(status), storage_type = VALUES(storage_type);

INSERT INTO users (username, password_hash, full_name, email, role_id, department, status, avatar)
SELECT
  'deny',
  '$2a$10$TQqCIIZyD/4LT.G/y4WKG.PFUsqCs64yvo9zUaHI4MJNJMArnH2si',
  'Bpk. Deny',
  'deny@sena.local',
  r.id,
  'Engineering',
  'Active',
  ''
FROM roles r
WHERE r.name = 'Administrator'
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), email = VALUES(email), role_id = VALUES(role_id), department = VALUES(department), status = VALUES(status), avatar = VALUES(avatar);

INSERT INTO documents (
  document_number,
  title,
  description,
  discipline,
  area,
  revision,
  status,
  sla_status,
  sla_due_at,
  sla_started_at,
  repository_id,
  file_path,
  file_name,
  file_size,
  mime_type
)
SELECT
  'P-CDU-PFD-001',
  'Process Flow Diagram Area 2',
  'Process Flow Diagram Area 2',
  'PFD',
  'CDU',
  1,
  'Approved',
  'Final As-Built',
  '2026-06-22 09:00:00',
  '2026-06-22 09:00:00',
  repo.id,
  '\\\\NAS\\LAB\\CDU\\PFD001',
  'P-CDU-PFD-001.pdf',
  1024000,
  'application/pdf'
FROM repositories repo
WHERE repo.name = 'NAS'
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), discipline = VALUES(discipline), area = VALUES(area), revision = VALUES(revision), status = VALUES(status), sla_status = VALUES(sla_status), sla_due_at = VALUES(sla_due_at), sla_started_at = VALUES(sla_started_at), repository_id = VALUES(repository_id), file_path = VALUES(file_path), file_name = VALUES(file_name), file_size = VALUES(file_size), mime_type = VALUES(mime_type);

INSERT INTO documents (
  document_number,
  title,
  description,
  discipline,
  area,
  revision,
  status,
  sla_status,
  sla_due_at,
  sla_started_at,
  repository_id,
  file_path,
  file_name,
  file_size,
  mime_type
)
SELECT
  'P-CDU-PID-010',
  'Heater System',
  'Heater System',
  'PID',
  'CDU',
  2,
  'Client Review',
  'At Risk',
  '2026-06-20 14:32:00',
  '2026-06-20 14:32:00',
  repo.id,
  '\\\\NAS\\LAB\\CDU\\PID010',
  'P-CDU-PID-010.pdf',
  2048000,
  'application/pdf'
FROM repositories repo
WHERE repo.name = 'NAS'
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), discipline = VALUES(discipline), area = VALUES(area), revision = VALUES(revision), status = VALUES(status), sla_status = VALUES(sla_status), sla_due_at = VALUES(sla_due_at), sla_started_at = VALUES(sla_started_at), repository_id = VALUES(repository_id), file_path = VALUES(file_path), file_name = VALUES(file_name), file_size = VALUES(file_size), mime_type = VALUES(mime_type);

INSERT INTO transmittals (transmittal_number, type, sender, destination, transmittal_date, status, remarks) VALUES
  ('TR-IN-2025-001', 'Incoming', 'Client', NULL, '2025-05-27 09:00:00', 'Received', 'Initial incoming transmittal'),
  ('TR-OUT-2025-001', 'Outgoing', NULL, 'BEUK', '2025-05-27 14:00:00', 'Sent', 'Initial outgoing transmittal')
ON DUPLICATE KEY UPDATE type = VALUES(type), sender = VALUES(sender), destination = VALUES(destination), transmittal_date = VALUES(transmittal_date), status = VALUES(status), remarks = VALUES(remarks);

INSERT INTO transmittal_documents (transmittal_id, document_id)
SELECT t.id, d.id
FROM transmittals t
JOIN documents d
WHERE t.transmittal_number = 'TR-IN-2025-001' AND d.document_number = 'P-CDU-PFD-001'
ON DUPLICATE KEY UPDATE document_id = VALUES(document_id);

INSERT INTO audit_trail (user_id, action, entity, entity_id, detail)
SELECT u.id, 'Login', 'session', NULL, 'Seed login event'
FROM users u
WHERE u.username = 'deny'
ON DUPLICATE KEY UPDATE detail = VALUES(detail);
