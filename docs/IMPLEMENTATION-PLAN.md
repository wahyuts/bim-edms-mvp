# IMPLEMENTATION-PLAN.md

# SENA Engineering Document Management System (EDMS) MVP

## Tujuan

Dokumen ini mendefinisikan tahapan implementasi (Implementation Phase) untuk pengembangan Front-End EDMS MVP menggunakan:

* HTML5
* TailwindCSS Play CDN
* Vanilla JavaScript
* ES Modules
* LocalStorage

Seluruh phase harus menghasilkan aplikasi yang tetap dapat dijalankan (working application).

---

# PHASE 0 - Project Foundation

## Objective

Mempersiapkan struktur project dan pondasi aplikasi.

## Deliverables

* Struktur folder sesuai FILE-STRUCTURE.md
* index.html
* login.html
* css/app.css
* js/app.js
* js/router.js
* js/services/
* js/utils/
* js/components/
* js/modules/

## Tasks

* Setup folder project
* Setup ES Modules
* Setup Tailwind Play CDN
* Setup global CSS
* Setup router
* Setup constants
* Setup helper
* Setup formatter
* Setup validator
* Setup storage service
* Setup mock data loader

## Acceptance Criteria

* Project dapat dijalankan
* Tidak ada JavaScript Error
* Struktur sesuai FILE-STRUCTURE.md

---

# PHASE 1 - Authentication Module

## Objective

Menyelesaikan fitur Login dan Logout.

## Modules

* Login
* Logout
* Session
* Route Protection

## Features

* Login Form
* Validation
* Password Visibility
* Remember Session
* Logout Confirmation
* Session LocalStorage
* Protected Route

## Deliverables

* login.html
* login.js
* auth.js
* session service

## Acceptance Criteria

* Login berhasil
* Logout berhasil
* Session tersimpan
* Redirect bekerja
* Route Protection berjalan

---

# PHASE 2 - Layout & Shared Components

## Objective

Membangun seluruh layout reusable.

## Components

* Sidebar
* Topbar
* Page Header
* Card
* Button
* Table
* Badge
* Modal
* Toast
* Notification
* Loader
* Pagination
* Dropdown

## Deliverables

Reusable Component Library

## Acceptance Criteria

* Semua halaman menggunakan component reusable
* Tidak ada duplicate component

---

# PHASE 3 - Dashboard

## Objective

Membangun Dashboard EDMS.

Task 1

Implement
## Features

* KPI Card
* Recent Activity
* Notification
* Escalation Summary

## KPI

* Total Documents
* Internal Draft
* Client Review
* Escalation Alert
* Final As-Built

✓

----------------

Task 2

Implement Dashboard Document Table

✓

----------------

Task 3

Implement Right Sidebar

✓ SLA Overview

✓ Escalation Alert

✓ Storage Repository

----------------

Task 4

Responsive Layout

Desktop

Tablet

Mobile

----------------

Task 5

Testing
## Acceptance Criteria

* KPI tampil
* Responsive
* Data dari LocalStorage


---

# PHASE 4 - Document Register

## Objective

Implementasi CRUD Document Register.

## Features

* List
* Search
* Filter
* Pagination
* Create
* Edit
* Delete
* View
* Download

## Form

* Validation
* Required
* Cancel

## Table

* Sticky Header
* Empty State
* Loading

✓ Master Document Source

✓ Category Support

✓ PFD Filter

✓ P&ID Filter

✓ Search

✓ Filter

✓ CRUD

## Acceptance Criteria

CRUD berjalan normal.

Audit otomatis dibuat.

Toast muncul.

---

# PHASE 5 - PFD Module

## Objective

Implementasi kategori PFD.

## Features

* List
* Search
* Create
* Edit
* Delete
* View
* Upload
* Download

PFD

- Read from Document Register

WHERE category=PFD

- Create

→ insert Document Register

- Edit

→ update Document Register

- Delete

→ delete Document Register

## Acceptance Criteria

CRUD berjalan.

Data tersimpan pada LocalStorage.

---

# PHASE 6 - P&ID Module

## Objective

Implementasi kategori P&ID.

## Features

* List
* Search
* Create
* Edit
* Delete
* View
* Upload
* Download

P&ID

- Read from Document Register

WHERE category=PID

- Create

→ insert Document Register

- Edit

→ update Document Register

- Delete

→ delete Document Register

## Acceptance Criteria

CRUD berjalan normal.

---

# PHASE 7 - Incoming Transmittal

## Features

* List
* Create
* Edit
* Delete
* Search
* Pagination
* Status

## Acceptance Criteria

CRUD berjalan.

Audit dibuat otomatis.

---

# PHASE 8 - Outgoing Transmittal

## Features

* List
* Create
* Edit
* Delete
* Search
* Pagination

## Acceptance Criteria

CRUD berjalan normal.

---

# PHASE 9 - Storage Repository

## Features

* Repository List
* NAS Path
* Status
* Create
* Edit
* Delete

## Acceptance Criteria

Repository tersimpan pada LocalStorage.

---

# PHASE 10 - Notification Center

## Features

* Notification List
* Mark as Read
* Delete Notification
* Badge Counter

## Acceptance Criteria

Notification bekerja otomatis.

---

# PHASE 11 - Audit Trail

## Features

* Audit Table
* Search
* Filter
* Sort
* Read Only

Auto Log:

* Login
* Logout
* Create
* Edit
* Delete
* Status Change

## Acceptance Criteria

Seluruh aktivitas tercatat.

---

# PHASE 12 - SLA Monitoring

## Features

* SLA Timer
* Status Badge
* Remaining Time
* Dashboard Summary

## Status

* On Track
* At Risk
* Overdue
* Final As-Built

## Acceptance Criteria

Status SLA tampil dengan benar.

---

# PHASE 13 - Escalation Alert

## Features

* Escalation List
* Level
* Remaining Time
* Warning Badge
* Status

## Acceptance Criteria

Escalation tampil otomatis berdasarkan SLA.

---

# PHASE 14 - Profile Management

## Features

* User Profile
* Edit Profile
* Change Password
* Create New User for Administrator
* Edit User Profile for Administrator

## Acceptance Criteria

Profile dapat diperbarui.

Password dapat diubah.

Administrator dapat membuat user baru.

Administrator dapat memperbarui user terdaftar.

Audit dibuat otomatis.

---

# PHASE 15 - RBAC (Role Based Access Control)

## Features

Mengikuti ACCESS-CONTROL.md

Role:

* Administrator
* Project Manager
* Document Controller
* Engineer
* Client

## Acceptance Criteria

Menu sesuai role.

Button sesuai role.

Action sesuai role.

Unauthorized Action disembunyikan.

---

# PHASE 16 - UI/UX Refinement

## Tasks

* Responsive Check
* Accessibility Check
* Dark Theme Consistency
* Design Token Validation
* Icon Validation
* Empty State
* Loading State
* Error State

## Acceptance Criteria

Seluruh halaman konsisten.

---

# PHASE 17 - Final Integration

## Tasks

* Cross Module Testing
* LocalStorage Validation
* Route Validation
* Component Reuse Validation
* Performance Review
* Cleanup
* Refactoring

## Acceptance Criteria

Tidak ada duplicate component.

Tidak ada duplicate business logic.

Tidak ada JavaScript Error.

Seluruh module terintegrasi dengan baik.

---

# Definition of Done (DoD)

Setiap Phase dianggap selesai apabila:

* Sesuai PRD
* Sesuai UI-GUIDELINES
* Sesuai COMPONENT-SPEC
* Sesuai DESIGN-TOKENS
* Sesuai CODING-STANDARDS
* Sesuai ACCESS-CONTROL
* Sesuai FORM-SPEC
* Sesuai TABLE-SPEC
* Sesuai STATE-MANAGEMENT
* Tidak terdapat JavaScript Error
* Responsive
* Reusable
* Modular
* Audit berjalan
* Notification berjalan
* LocalStorage sinkron
* Siap dimigrasikan ke REST API di masa depan

---

# Target Hasil Akhir

> Source alignment note: implementasi terbaru mencakup aturan status dokumen terpisah (`DOCUMENT_STATUSES`, `DOCUMENT_EDITABLE_STATUSES`, `DOCUMENT_STATUS_FILTER_OPTIONS`), SLA Monitoring berbasis `documents` dengan list At Risk dan action Edit, serta Dashboard SLA Overview clickable rows. Detail mengikuti `docs/DOCUMENT-STATUS-RULES.md`, `docs/SLA-MONITORING-SPEC.md`, dan `docs/DASHBOARD-INTERACTIONS.md`.

Pada akhir implementasi, aplikasi EDMS MVP memiliki:

* Authentication (Login & Logout)
* Dashboard
* Document Register
* PFD
* P&ID
* Incoming Transmittal
* Outgoing Transmittal
* Storage Repository
* Notification Center
* Audit Trail
* SLA Monitoring
* Escalation Alert
* Profile Management
* Change Password
* Role Based Access Control
* Responsive UI
* Dark Theme
* Reusable Component System
* Backend Ready Architecture
* API Ready Structure
* LocalStorage Ready
* REST API Ready
