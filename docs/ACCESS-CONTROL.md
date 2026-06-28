# ACCESS-CONTROL.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan Role-Based Access Control (RBAC) untuk seluruh fitur EDMS MVP.

Hak akses diberikan berdasarkan Role dan diterapkan pada level menu, halaman, dan aksi (Create, View, Edit, Delete).

---

# Roles

1. Administrator

2. Project Manager

3. Document Controller

4. Engineer

5. Client

---

# Permission Matrix

| Module          | Administrator | Project Manager | Document Controller | Engineer | Client |
| --------------- | ------------- | --------------- | ------------------- | -------- | ------ |
| Login           | ✓             | ✓               | ✓                   | ✓        | ✓      |
| Dashboard       | ✓             | ✓               | ✓                   | ✓        | ✓      |
| Profile         | ✓             | ✓               | ✓                   | ✓        | ✓      |
| Change Password | ✓             | ✓               | ✓                   | ✓        | ✓      |
| User Management | ✓             | -               | -                   | -        | -      |

---

# Document Register

Source alignment:

Client has `document.edit` permission and can see Edit action in Document Register table surfaces.

| Action   | Admin | PM | DC | Engineer | Client |
| -------- | ----- | -- | -- | -------- | ------ |
| View     | ✓     | ✓  | ✓  | ✓        | ✓      |
| Create   | ✓     | ✓  | ✓  | ✓        | -      |
| Edit     | ✓     | ✓  | ✓  | ✓        | -      |
| Delete   | ✓     | ✓  | ✓  | -        | -      |
| Download | ✓     | ✓  | ✓  | ✓        | ✓      |

---

# PFD

Source alignment:

Client has `document.edit` permission and can see Edit action in PFD and P&ID tables.

| Action   | Admin | PM | DC | Engineer | Client |
| -------- | ----- | -- | -- | -------- | ------ |
| View     | ✓     | ✓  | ✓  | ✓        | ✓      |
| Create   | ✓     | ✓  | ✓  | ✓        | -      |
| Edit     | ✓     | ✓  | ✓  | ✓        | -      |
| Delete   | ✓     | ✓  | ✓  | -        | -      |
| Upload   | ✓     | ✓  | ✓  | ✓        | -      |
| Download | ✓     | ✓  | ✓  | ✓        | ✓      |

---

# P&ID

Same permission model as PFD.

---

# Incoming Transmittal

| Action | Admin | PM | DC | Engineer | Client |
| ------ | ----- | -- | -- | -------- | ------ |
| View   | ✓     | -  | -  | -        | -      |
| Create | ✓     | -  | -  | -        | -      |
| Edit   | ✓     | -  | -  | -        | -      |
| Delete | ✓     | -  | -  | -        | -      |

---

# Outgoing Transmittal

Same permission model as Incoming.

Transmittal menu and pages are Administrator only.

---

# Escalation Alert

View

Admin

PM

DC

Engineer

Edit

Admin

PM

DC

Delete

Admin

PM

---

# Audit Trail

Read Only

Admin

PM

DC

Engineer

Client

---

# Storage Repository

View

All except restricted guest

Create

Admin

PM

DC

Edit

Admin

Delete

Admin

Download

Admin

Non-Administrator roles:

* Project Manager cannot edit, delete, or download Storage Repository records.
* Document Controller cannot edit, delete, or download Storage Repository records.
* Engineer cannot edit, delete, or download Storage Repository records.
* Client cannot edit, delete, or download Storage Repository records.

---

# Notifications

All authenticated users

Mark Read

Delete Own Notification

Current MVP note:

* Notification page is active for operational alerts.
* All authenticated users can view notifications, mark notifications as read, open the related module, and delete their own notification.

---

# SLA Monitoring

Source alignment:

* Route `/sla` memakai permission menu `dashboard`.
* Semua role yang dapat melihat Dashboard dapat membuka SLA Monitoring.
* Tombol `Edit` pada halaman SLA Monitoring mengikuti permission `document.edit`.
* Client dapat melihat SLA Monitoring dan melihat tombol Edit Document sesuai permission `document.edit`.

---

# User Management

Administrator Only

* Create User

* Edit User

* Delete User

* Assign Role

## Current MVP Scope

* Create New User menu appears above Profile in the Profile Dropdown.
* Edit User Profile menu appears below Create New User in the Profile Dropdown.
* Non-Administrator users see Create New User in disabled gray state.
* Non-Administrator users see Edit User Profile in disabled gray state.
* Administrator users can open `/create-new-user`.
* Administrator users can open `/edit-user-profile`.
* Administrator users can delete the selected user from `/edit-user-profile` after confirmation.

---

# Route Protection

Protected routes require:

session.isLoggedIn == true

Unauthorized access:

Redirect to Login

Future:

403 Access Denied Page

---

# UI Rules

Unauthorized actions must:

* Hide button

or

* Disable button

Never expose restricted actions visually.
