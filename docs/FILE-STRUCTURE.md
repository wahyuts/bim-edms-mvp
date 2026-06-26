# FILE-STRUCTURE.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan struktur folder dan penempatan file sebagai acuan tunggal (Source of Truth) untuk seluruh implementasi Front-End.

Semua developer dan AI Agent WAJIB mengikuti struktur ini.

---

# Root Structure

```text
edms-mvp/

│
├── index.html
├── login.html
│
├── docs/
│
│   ├── PRD.md
│   ├── IMPLEMENTATION-PLAN.md
│   ├── UI-GUIDELINES.md
│   ├── COMPONENT-SPEC.md
│   ├── MOCK-DATA.md
│   ├── ROUTING.md
│   ├── LOCAL-STORAGE-API.md
│   ├── FILE-STRUCTURE.md
│   └── CODING-STANDARDS.md
│
├── assets/
│
│   ├── images/
│   ├── icons/
│   ├── logo/
│   └── mock/
│
|
├── backend/
|
│   ├── node_modules/
│   ├── sql/
│   ├── src/
|   |
|   |   ──config/
|   |
|   |   ──controllers/
|   |
|   |   ──database/
|   |
|   |   ──middleware/
|   |
|   |   ──repositories/
|   |
|   |   ──routes/
|   |
|   |   ──services/
|   |
|   |   ──utils/
|   |
|   |   ──app.js
|   |
|   |   ──server.js
|   |
│   └── uploads/
|
|
├── css/
│
│   └── app.css
│
├── js/
│
│   ├── app.js
│   ├── router.js
│   │
│   ├── modules/
│   │
│   │   ├── auth/
│   │   │
│   │   │   ├── login.js
│   │   │   ├── profile.js
│   │   │   ├── create-new-user.js
│   │   │   ├── edit-user-profile.js
│   │   │   └── change-password.js
│   │   │
│   │   ├── dashboard/
│   │   │
│   │   │   └── dashboard.js
│   │   │
│   │   ├── register/
│   │   │
│   │   │   └── register.js
│   │   │
│   │   ├── pfd/
│   │   │
│   │   │   └── pfd.js
│   │   │
│   │   ├── pid/
│   │   │
│   │   │   └── pid.js
│   │   │
│   │   ├── transmittal/
│   │   │
│   │   │   ├── incoming.js
│   │   │   └── outgoing.js
│   │   │
│   │   ├── escalation/
│   │   │
│   │   │   └── escalation.js
│   │   │
│   │   ├── audit/
│   │   │
│   │   │   └── audit.js
│   │   │
│   │   └── storage/
│   │
│   │       └── storage.js
│   │
│   ├── components/
│   │
│   │   ├── button.js
│   │   ├── badge.js
│   │   ├── card.js
│   │   ├── table.js
│   │   ├── modal.js
│   │   ├── form.js
│   │   ├── dropdown.js
│   │   ├── pagination.js
│   │   ├── sidebar.js
│   │   ├── topbar.js
│   │   ├── toast.js
│   │   ├── notification.js
│   │   └── loader.js
│   │
│   ├── services/
│   │
│   │   ├── storage.js
│   │   ├── auth.js
│   │   ├── audit.js
│   │   ├── notification.js
│   │   └── mock-api.js
│   │
│   └── utils/
│
│       ├── constants.js
│       ├── formatter.js
│       ├── helper.js
│       ├── validator.js
│       ├── date.js
│       └── dom.js
│
└── README.md
```

---

# Directory Responsibilities

## docs/

Project documentation.

No runtime code.

---

## assets/

Contains:

* logo

* icon

* image

* illustration

* mock assets

---

## css/

Contains:

Global stylesheet only.

Example

```
app.css
```

---

## js/modules/

Contains business modules.

One module = one feature.

Examples

```
dashboard

pfd

pid

incoming

outgoing

sla

notifications
```

---

## js/components/

Contains reusable UI components.

No business logic.

Only rendering.

---

## js/services/

Contains:

* localStorage

* authentication

* notification

* audit

* access-control

* persistence

No DOM rendering.

---

## js/utils/

Contains helper functions.

Examples

* formatter

* validator

* constants

* helper

* DOM helper

Source alignment:

Current source also includes:

* `js/utils/crud-page.js`
* `js/utils/sla-timer.js`

Current source modules also include:

* `js/modules/sla/sla.js`
* `js/modules/notifications/notifications.js`

---

# Module Rule

One folder

↓

One feature

↓

One entry file

Example

```
modules/pfd/pfd.js
```

---

# Component Rule

Reusable only.

Never contain business logic.

Should receive data as parameter.

---

# Service Rule

No UI rendering.

Only:

Read

Write

Persist

Transform

---

# Import Direction

Allowed

```
module

↓

service

↓

utils
```

Allowed

```
module

↓

component
```

Not Allowed

```
component

↓

module
```

Not Allowed

```
utils

↓

module
```

---

# Maximum Responsibility

One file = one responsibility.

Avoid files over 300 lines whenever practical.

Split into smaller modules when complexity grows.

---

# Future Ready

Structure should support future migration to:

* Tailwind Build

* Vite

* React

* Vue

without changing domain organization.
