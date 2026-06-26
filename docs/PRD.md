# SENA Engineering Document Management System (EDMS) MVP

## Product Overview

SENA EDMS adalah aplikasi berbasis web untuk mengelola dokumen engineering seperti PFD dan P&ID, mengelola Transmittal, memonitor SLA, Escalation, Audit Trail, serta Storage Repository.

Scope MVP hanya mencakup Front-End dengan mock data menggunakan LocalStorage.

---

# Technology Stack

- HTML5
- TailwindCSS Play CDN
- Vanilla Javascript
- ES Modules
- LocalStorage
- Responsive Layout

---

# Functional Modules

## 1. Authentication

### Login

Features

- Login
- Show Password
- Forgot Password UI
- Validation
- Loading State
- Redirect Dashboard

### Profile

Features

- View Profile
- Edit Profile

### Change Password

Features

- Change Password
- Validation

### User Management

Features

- Create New User
- Edit User Profile
- Administrator Only
- Role Selection

### Logout

Features

- Logout Confirmation
- Destroy Session
- Redirect Login

---

# 2. Dashboard

Features

- KPI Cards
- Total Documents
- Internal Draft
- Client Review
- Escalation Alert
- Final As-Built

Right Information Sidebar terdiri dari:

- SLA Overview
- Escalation Alert
- Storage Repository

Dashboard berfungsi sebagai halaman monitoring utama seluruh dokumen engineering.

Features

- Search
- Filter
- Pagination
- Sorting

Actions

- Create
- View
- Edit
- Delete
- Download
- View PDF

Columns

- Document Number
- Description
- Revision
- Discipline
- Status
- SLA Timer
- NAS Location

---

# 3. Document Register

Sub Menu

- PFD
- P&ID

Features

- Search
- Filter
- Pagination
- Sorting

Actions

- Create
- View
- Edit
- Delete
- Download
- View PDF

Columns

- Document Number
- Description
- Revision
- Discipline
- Status
- SLA Timer
- NAS Location

Document Register merupakan Master Register untuk seluruh dokumen engineering.

Seluruh dokumen yang dibuat dari module:

- PFD
- P&ID
- Datasheet
- Drawing
- Specification
- Calculation
- dll

WAJIB otomatis terdaftar pada Document Register.

Module PFD dan P&ID merupakan filtered view berdasarkan Category, bukan penyimpanan data yang terpisah.

---

# 4. PFD Module

Features

- Search
- Filter
- Pagination

Actions

- Create
- View
- Edit
- Delete
- Upload
- Download
- Preview PDF

---

# 5. P&ID Module

Features

- Search
- Filter
- Pagination

Actions

- Create
- View
- Edit
- Delete
- Upload
- Download
- Preview PDF

---

# 6. Transmittal

## Incoming

Features

- Search
- Filter

Actions

- Create
- View
- Edit
- Delete
- Download

## Outgoing

Features

- Search
- Filter

Actions

- Create
- View
- Edit
- Delete
- Generate
- Download

---

# 7. Escalation Alert

Features

- Alert List

Actions

- View
- Edit
- Delete
- Open Document

---

# 8. SLA Monitoring

Features

- SLA Timer
- Donut Chart
- Status Indicator

Actions

- View Detail

(Read Only)

---

# 9. Audit Trail

Features

- Timeline
- Search

Actions

- View Detail

(Read Only)

---

# 10. Notifications

Features

- Operational Alert List
- Unread Counter
- Search
- Filter by Type
- Filter by Read Status
- Open Related Module
- Mark as Read
- Delete Notification

Notification digunakan untuk alert operasional yang membutuhkan perhatian user seperti SLA, Escalation, Transmittal, Document, dan Storage.

---

# 11. Storage Repository

Repository

- NAS

Actions

- View
- Open
- Edit
- Delete
- Download

---

# CRUD Matrix

> Source alignment note: source code terbaru memiliki beberapa perilaku yang memperluas matrix lama di bawah ini. Dashboard menyediakan `Edit Document` dari tabel dashboard, SLA Monitoring menyediakan `Edit Document` untuk dokumen At Risk sesuai permission `document.edit`, dan Dashboard SLA Overview memiliki navigation interaction. Detail mengikuti `docs/SLA-MONITORING-SPEC.md`, `docs/DASHBOARD-INTERACTIONS.md`, dan `docs/DOCUMENT-STATUS-RULES.md`.

| Module | Create | View | Edit | Delete |
|----------|------|------|------|----------|
| Dashboard | - | ✓ | - | - |
| Login | - | ✓ | - | - |
| Profile | - | ✓ | ✓ | - |
| User Management | ✓ | ✓ | ✓ | - |
| Document Register | ✓ | ✓ | ✓ | ✓ |
| PFD | ✓ | ✓ | ✓ | ✓ |
| P&ID | ✓ | ✓ | ✓ | ✓ |
| Incoming Transmittal | ✓ | ✓ | ✓ | ✓ |
| Outgoing Transmittal | ✓ | ✓ | ✓ | ✓ |
| Escalation | - | ✓ | ✓ | ✓ |
| SLA | - | ✓ | - | - |
| Audit Trail | - | ✓ | - | - |
| Storage Repository | ✓ | ✓ | ✓ | ✓ |
