# MOCK-DATA.md

## Overview

Seluruh data MVP disimpan menggunakan LocalStorage.

Semua key harus diinisialisasi ketika aplikasi pertama kali dijalankan.

---

# localStorage Keys

users

documents

pfd

pid

incomingTransmittal

outgoingTransmittal

auditTrail

sla

escalation

storageRepository

notifications

session

---

# users

Source alignment:

Default source code seed currently uses role `Administrator` for default user `deny`.

```json
[
  {
    "id": 1,
    "username": "deny",
    "password": "123456",
    "name": "Bpk. Deny",
    "email": "deny@sena.local",
    "role": "Project Manager",
    "department": "Engineering",
    "status": "Active",
    "avatar": ""
  }
]
```

---

# session

```json
{
  "isLoggedIn": true,
  "userId": 1,
  "username": "deny",
  "role": "Project Manager"
}
```

---

# documents

```json
[
  {
    "id": 1,
    "documentNo": "P-CDU-PFD-001",
    "description": "Process Flow Diagram Area 2",
    "revision": 1,
    "discipline": "PFD",
    "status": "Approved",
    "sla": "2026-06-22",
    "slaStartedAt": "2026-06-22 09:00",
    "verifyDeadlineDate": "2026-06-29",
    "reviewComment": "Approved for current review cycle.",
    "nasLocation": "\\\\NAS\\LAB\\CDU\\PFD001"
  }
]
```

Actions

* Create
* View
* Edit
* Delete

SLA Timer Rule

* `sla` stores the user-selected SLA/upload date.
* `slaStartedAt` stores the real timestamp when `sla` was created or changed.
* Dashboard SLA Timer count-up uses `slaStartedAt`.
* `verifyDeadlineDate` stores the selected verification deadline date.
* `reviewComment` stores free text review notes.

---

# pfd

```json
[
  {
    "id": 1,
    "documentNo": "P-CDU-PFD-001",
    "title": "Process Flow Diagram Area 2",
    "revision": 1,
    "status": "Approved"
  }
]
```

Actions

* Create
* View
* Edit
* Delete

---

# pid

```json
[
  {
    "id": 1,
    "documentNo": "P-CDU-PID-010",
    "title": "Heater System",
    "revision": 2,
    "status": "Client Review"
  }
]
```

Actions

* Create
* View
* Edit
* Delete

---

# incomingTransmittal

```json
[
  {
    "id": 1,
    "transmittalNo": "TR-IN-2025-001",
    "sender": "Client",
    "date": "2025-05-27",
    "documents": 5,
    "status": "Received"
  }
]
```

Actions

* Create
* View
* Edit
* Delete

---

# outgoingTransmittal

```json
[
  {
    "id": 1,
    "transmittalNo": "TR-OUT-2025-001",
    "destination": "BEUK",
    "date": "2025-05-27",
    "documents": 8,
    "status": "Sent"
  }
]
```

Actions

* Create
* View
* Edit
* Delete

---

# escalation

Source alignment:

The latest Escalation page derives displayed overdue rows from `documents` using SLA calculation. The `escalation` collection remains seeded as legacy/mock data but is not the main source for the current Escalation page.

```json
[
  {
    "id": 1,
    "documentNo": "P-CDU-PID-013",
    "level": 2,
    "status": "Overdue",
    "message": "SLA exceeded"
  }
]
```

Actions

* View
* Edit
* Delete

---

# sla

Source alignment:

The latest SLA Monitoring page derives displayed At Risk rows from `documents` using SLA calculation. The `sla` collection remains seeded as legacy/mock data but is not the main source for the current SLA Monitoring page.

```json
[
  {
    "id": 1,
    "documentNo": "P-CDU-PFD-002",
    "status": "At Risk",
    "remaining": "2d 05h 10m"
  }
]
```

Read Only

---

# auditTrail

```json
[
  {
    "id": 1,
    "time": "2025-05-27 14:32",
    "user": "Bpk. Deny",
    "action": "Change Status",
    "document": "P-CDU-PID-010",
    "detail": "Status changed to Client Review"
  }
]
```

Read Only

---

# storageRepository

```json
[
  {
    "id": 1,
    "name": "NAS",
    "status": "Online",
    "path": "\\\\NAS\\LAB"
  }
]
```

Actions

* Create
* View
* Edit
* Delete

---

# notifications

```json
[]
```

Actions

* Open Related Module
* Mark as Read
* Delete

---

# Default Login

Username

deny

Password

123456

---

# Initial Seeder Rules

Application startup should:

1. Check every localStorage key.
2. If key does not exist:

   * Create default collection.
3. If key exists:

   * Preserve existing data.
4. Never overwrite user-modified LocalStorage automatically.
5. CRUD operations must immediately persist changes to LocalStorage.

This mock data specification is the canonical source for all Front-End development and testing during the MVP phase.
