# API-CONTRACT.md

# SENA Engineering Document Management System (EDMS)

Version: v1

Status: Backend Ready Specification

---

# API Standard

Base URL

/api/v1

Content-Type

application/json

Accept

application/json

Encoding

UTF-8

---

# Standard Response

## Success

```json
{
  "success": true,
  "message": "Success",
  "data": {},
  "meta": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {}
}
```

---

# Authentication

## POST /auth/login

Request

```json
{
  "username": "deny",
  "password": "123456"
}
```

Response

```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {}
  }
}
```

---

## POST /auth/logout

Response

```json
{
  "success": true
}
```

---

## GET /auth/me

Response

```json
{
  "success": true,
  "data": {}
}
```

---

# Users

GET /users

GET /users/{id}

POST /users

PUT /users/{id}

DELETE /users/{id}

---

# Dashboard

GET /dashboard

Returns

* KPI

* SLA Summary

* Escalation

* Recent Audit

* Storage Summary

---

# Document Register

GET /documents

Supports

?page=1

?pageSize=10

?search=

?sort=

?status=

?discipline=

GET /documents/{id}

POST /documents

Multipart upload for create/update:

* file field: `file`
* allowed extensions: `.pdf`, `.dwg`, `.dxf`
* max file size: 30 MB

PUT /documents/{id}

DELETE /documents/{id}

---

# PFD

GET /pfd

GET /pfd/{id}

POST /pfd

PUT /pfd/{id}

DELETE /pfd/{id}

---

# P&ID

GET /pid

GET /pid/{id}

POST /pid

PUT /pid/{id}

DELETE /pid/{id}

---

# Incoming Transmittal

GET /transmittal/incoming

GET /transmittal/incoming/{id}

POST /transmittal/incoming

PUT /transmittal/incoming/{id}

DELETE /transmittal/incoming/{id}

---

# Outgoing Transmittal

GET /transmittal/outgoing

GET /transmittal/outgoing/{id}

POST /transmittal/outgoing

PUT /transmittal/outgoing/{id}

DELETE /transmittal/outgoing/{id}

---

# Escalation

GET /escalation

GET /escalation/{id}

PUT /escalation/{id}

DELETE /escalation/{id}

Source alignment:

Current Front-End derives Escalation rows from `documents` whose SLA status is `Overdue`. Backend may expose `/escalation` as a derived read endpoint. Document edits should use `PUT /documents/{id}`.

---

# SLA

GET /sla

GET /sla/{id}

Read Only

Source alignment:

Current Front-End derives SLA Monitoring rows from `documents` whose SLA status is `At Risk`. SLA Monitoring can open an Edit Document modal, but mutation targets `documents`, not a mutable `sla` resource.

Use:

```text
PUT /documents/{id}
```

for updates triggered from SLA Monitoring.

---

# Audit Trail

GET /audit-trail

GET /audit-trail/{id}

Read Only

Supports

search

date range

user

action

---

# Storage Repository

GET /storage

GET /storage/{id}

POST /storage

PUT /storage/{id}

DELETE /storage/{id}

---

# Notifications

GET /notifications

POST /notifications

Request:

```json
{
  "title": "Document Created",
  "message": "P-CDU-PFD-001 has been created.",
  "type": "success",
  "module": "document",
  "targetRoute": "/document-register",
  "targetLabel": "Open Document Register"
}
```

Response fields:

* id
* title
* message
* type
* module
* target_route
* target_label
* is_read
* created_at

PUT /notifications/{id}/read

DELETE /notifications/{id}

---

# Profile

GET /profile

PUT /profile

---

# Change Password

PUT /profile/change-password

Request

```json
{
  "currentPassword": "",
  "newPassword": "",
  "confirmPassword": ""
}
```

---

# Pagination Format

```json
{
  "meta": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 250,
    "totalPages": 25
  }
}
```

---

# Standard Query Parameters

?page=1

?pageSize=10

?search=

?sort=documentNumber

?order=asc

?status=Approved

?discipline=PFD

---

# HTTP Status

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# Future Support

JWT

Refresh Token

RBAC

Soft Delete

File Upload

NAS Integration

Email Notification

WebSocket Notification

Audit Logging

Versioning (/api/v2)
