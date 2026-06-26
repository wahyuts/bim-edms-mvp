# ROUTING.md

# SENA Engineering Document Management System (EDMS) MVP

## Overview

Routing menggunakan Vanilla JavaScript + ES Modules.

Tidak menggunakan React Router, Vue Router, ataupun framework SPA lainnya.

Navigasi dapat menggunakan:

* hash routing (`#/dashboard`)
* atau simple client-side router.

Semua halaman dimuat secara dinamis ke `#app`.

---

# Route Tree

```text
/login

/dashboard

/document-register

/document-register/pfd

/document-register/pid

/transmittal

/transmittal/incoming

/transmittal/outgoing

/escalation

/audit-trail

/storage

/storage/nas

/sla

/notifications

/profile

/create-new-user

/edit-user-profile

/change-password
```

---

# Initial Route

Application Startup

```
if session.isLoggedIn

    -> /dashboard

else

    -> /login
```

---

# Authentication Guard

Protected Routes

* dashboard

* profile

* create-new-user

* edit-user-profile

* change-password

* document-register

* pfd

* pid

* incoming transmittal

* outgoing transmittal

* escalation

* audit trail

* storage

If:

```
session.isLoggedIn == false
```

redirect

```
/login
```

---

# Login Route

Route

```
/login
```

Module

```
modules/auth/login.js
```

Actions

* Login

* Validate

* Save Session

* Redirect Dashboard

---

# Dashboard Route

Route

```
/dashboard
```

Module

```
modules/dashboard/dashboard.js
```

Displays

* KPI

* SLA

* Escalation

* Audit

* Storage

---

# Document Register

Route

```
/document-register
```

Displays

Master Document List

Supports

* Search

* Filter

* Pagination

* View

* Create

* Edit

* Delete

---

# PFD

Route

```
/document-register/pfd
```

Supports

* Create

* View

* Edit

* Delete

* Upload

* Download

---

# P&ID

Route

```
/document-register/pid
```

Supports

* Create

* View

* Edit

* Delete

* Upload

* Download

---

# Incoming Transmittal

Route

```
/transmittal/incoming
```

Supports

* Create

* View

* Edit

* Delete

---

# Outgoing Transmittal

Route

```
/transmittal/outgoing
```

Supports

* Create

* View

* Edit

* Delete

---

# Escalation

Route

```
/escalation
```

Supports

* View

* Edit

* Delete

---

# Audit Trail

Route

```
/audit-trail
```

Read Only

Supports

* Search

* View Detail

---

# Storage Repository

Route

```
/storage/nas
```

Supports

* Create

* View

* Edit

* Delete

---

# Profile

Route

```
/profile
```

Supports

* View Profile

* Edit Profile

---

# Create New User

Route

```
/create-new-user
```

Module

```
modules/auth/create-new-user.js
```

Access

* Administrator only

Supports

* Create User

---

# Edit User Profile

Route

```
/edit-user-profile
```

Module

```
modules/auth/edit-user-profile.js
```

Access

* Administrator only

Supports

* Select User by Name

* Edit User Profile

---

# Change Password

Route

```
/change-password
```

Supports

* Update Password

* Validation

---

# Logout Flow

Click

```
Logout
```

↓

Confirmation Modal

↓

Destroy Session

↓

Redirect

```
/login
```

---

# Route -> Module Mapping

Source alignment:

* `/sla` maps to `modules/sla/sla.js`.
* `/notifications` maps to `modules/notifications/notifications.js`.
* Dashboard SLA Overview row `At Risk` links to `/sla`.
* Dashboard SLA Overview row `Overdue` links to `/escalation`.

| Route                  | Module                           |
| ---------------------- | -------------------------------- |
| /login                 | modules/auth/login.js            |
| /dashboard             | modules/dashboard/dashboard.js   |
| /document-register     | modules/register/register.js     |
| /document-register/pfd | modules/pfd/pfd.js               |
| /document-register/pid | modules/pid/pid.js               |
| /transmittal/incoming  | modules/transmittal/incoming.js  |
| /transmittal/outgoing  | modules/transmittal/outgoing.js  |
| /escalation            | modules/escalation/escalation.js |
| /audit-trail           | modules/audit/audit.js           |
| /storage/nas           | modules/storage/storage.js       |
| /profile               | modules/auth/profile.js          |
| /create-new-user       | modules/auth/create-new-user.js  |
| /edit-user-profile     | modules/auth/edit-user-profile.js |
| /change-password       | modules/auth/change-password.js  |

---

# Router Rules

* One module per route

* Lazy load ES Module

* No inline script

* No jQuery

* No framework

* Redirect invalid route -> /dashboard

* Redirect unauthenticated -> /login

* Restore last route after refresh (optional)

* Highlight active sidebar menu automatically
