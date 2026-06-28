# BACKEND-READY-SCHEMA.md

# SENA Engineering Document Management System (EDMS)

Backend Ready Database Schema

Status: Source of Truth

---

# Common Audit Fields

Every table should include:

id

created_at

created_by

updated_at

updated_by

deleted_at (Soft Delete)

deleted_by

---

# users

| Field         | Type              |
| ------------- | ----------------- |
| id            | bigint            |
| username      | varchar(100)      |
| password_hash | varchar(255)      |
| full_name     | varchar(200)      |
| email         | varchar(200)      |
| role_id       | bigint            |
| department    | varchar(100)      |
| status        | varchar(50)       |
| created_at    | datetime          |
| updated_at    | datetime          |
| deleted_at    | datetime nullable |

---

# roles

| Field       | Type         |
| ----------- | ------------ |
| id          | bigint       |
| name        | varchar(100) |
| description | varchar(255) |

Example

Administrator

Project Manager

Document Controller

Engineer

Client

---

# permissions

| Field | Type         |
| ----- | ------------ |
| id    | bigint       |
| code  | varchar(100) |
| name  | varchar(100) |

Example

document.create

document.edit

document.delete

---

# role_permissions

role_id

permission_id

---

# documents

Source alignment:

Front-End MVP currently stores SLA tracking fields as:

* `sla`
* `slaStartedAt`

Backend schema may normalize this to `sla_due_at` or separate SLA tracking fields, but migration must preserve the latest Front-End count-up behavior.

| Field           | Type         |
| --------------- | ------------ |
| id              | bigint       |
| document_number | varchar(200) |
| title           | varchar(255) |
| description     | text         |
| discipline      | varchar(50)  |
| area            | varchar(100) |
| revision        | int          |
| status          | varchar(100) |
| sla_status      | varchar(50)  |
| sla_due_at      | datetime     |
| verify_deadline_date | date    |
| review_comment  | text         |
| repository_id   | bigint       |
| file_path       | text         |
| file_name       | varchar(255) |
| file_size       | bigint       |
| mime_type       | varchar(100) |
| created_at      | datetime     |
| updated_at      | datetime     |
| deleted_at      | datetime     |

---

# pfd

Recommended:

Use documents table

discipline = PFD

No separate physical table required.

---

# pid

Recommended:

Use documents table

discipline = PID

No separate physical table required.

---

# transmittals

| Field              | Type         |
| ------------------ | ------------ |
| id                 | bigint       |
| transmittal_number | varchar(200) |
| type               | varchar(50)  |
| sender             | varchar(255) |
| destination        | varchar(255) |
| transmittal_date   | datetime     |
| status             | varchar(100) |
| remarks            | text         |

type

Incoming

Outgoing

---

# transmittal_documents

Many-to-Many

| Field          |
| -------------- |
| id             |
| transmittal_id |
| document_id    |

---

# audit_trail

| Field      | Type         |
| ---------- | ------------ |
| id         | bigint       |
| user_id    | bigint       |
| action     | varchar(100) |
| entity     | varchar(100) |
| entity_id  | bigint       |
| detail     | text         |
| created_at | datetime     |

---

# notifications

| Field      | Type         |
| ---------- | ------------ |
| id         | bigint       |
| user_id    | bigint       |
| title      | varchar(255) |
| message    | text         |
| type       | varchar(30)  |
| module     | varchar(100) |
| target_route | varchar(255) |
| target_label | varchar(100) |
| is_read    | boolean      |
| created_at | datetime     |

---

# repositories

| Field        | Type         |
| ------------ | ------------ |
| id           | bigint       |
| name         | varchar(100) |
| path         | text         |
| status       | varchar(50)  |
| storage_type | varchar(50)  |

Example

NAS

SMB

Local

S3

---

# sla_rules

| Field            | Type         |
| ---------------- | ------------ |
| id               | bigint       |
| status_name      | varchar(100) |
| duration_hours   | integer      |
| escalation_level | integer      |

Example

Internal Draft

72

1

Client Review

168

2

---

# escalation_logs

| Field            | Type     |
| ---------------- | -------- |
| id               | bigint   |
| document_id      | bigint   |
| escalation_level | integer  |
| escalated_at     | datetime |
| remarks          | text     |

---

# Foreign Keys

users.role_id

→ roles.id

documents.repository_id

→ repositories.id

audit_trail.user_id

→ users.id

notifications.user_id

→ users.id

transmittal_documents.transmittal_id

→ transmittals.id

transmittal_documents.document_id

→ documents.id

escalation_logs.document_id

→ documents.id

---

# Recommended Indexes

documents.document_number

documents.status

documents.discipline

documents.sla_due_at

audit_trail.created_at

notifications.user_id

transmittals.transmittal_number

users.username

users.email

---

# Recommended Constraints

document_number UNIQUE

username UNIQUE

email UNIQUE

role.name UNIQUE

permission.code UNIQUE

---

# Future Extensions

Document Revision History

Document Versioning

Digital Signature

Approval Workflow

Workflow Engine

File Version Storage

NAS Integration

Object Storage (S3/MinIO)

LDAP/Active Directory

SSO (OIDC/SAML)

Multi Project Support

Multi Tenant Support

Activity Stream

Email Queue

Background Job Queue

WebSocket Notifications
