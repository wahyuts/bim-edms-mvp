# FORM-SPEC.md

# SENA Engineering Document Management System (EDMS) MVP

## General Rules

All forms must support:

* Required validation
* Loading state
* Error state
* Success state
* Cancel action
* Reset action (optional)

All forms use reusable Form Component.

---

# Login Form

Fields

* Username *

* Password *

Buttons

* Login

Links

* Forgot Password

---

# Profile Form

Fields

* Name *

* Username

* Email *

* Department

* Role (Read Only)

Buttons

* Save

* Cancel

---

# Change Password

Fields

* Current Password *

* New Password *

* Confirm Password *

Validation

* Minimum 8 characters

* Password confirmation must match

Buttons

* Save

* Cancel

---

# Create New User

Fields

* Name *

* Username *

* Email *

* Password *

* Department *

* Role *

Role options:

* Administrator

* Project Manager

* Document Controller

* Engineer

* Client

Buttons

* Create

* Cancel

---

# Edit User Profile

Fields

* Name *

* Username *

* Email *

* Password *

* Department *

* Role *

Behavior

* Name uses a dropdown populated from registered users and cannot be typed manually.

* Username, Email, Password, Department, and Role are disabled until a registered Name is selected.

* Selecting Name populates all related user data.

Role options:

* Administrator

* Project Manager

* Document Controller

* Engineer

* Client

Buttons

* Update

* Delete

* Cancel

Cancel redirects to Dashboard.

Delete removes the selected registered user after confirmation.

---

# Document Register Form

Source alignment:

Dropdown `Status` pada form editable Document Register menggunakan `DOCUMENT_EDITABLE_STATUSES`, sehingga `Final As-Built` tidak ditampilkan sebagai opsi.

Fields

* Document Number *

* Description *

* Discipline *

* Area

* Revision *

* Status *

* NAS Location

* Attachment

Attachment accepts PDF, DWG, and DXF files up to 30 MB.

Selected file detail displays file name and file size after user chooses a file.

Buttons

* Save

* Cancel

Validation

Document Number must be unique.

Revision must be 0 or greater.

---

# PFD Form

Source alignment:

Form Create/Edit PFD menggunakan `DOCUMENT_EDITABLE_STATUSES`, sehingga `Final As-Built` tidak ditampilkan sebagai opsi status. Source code juga mendukung field `Area`, `SLA Timer`, dan `NAS Location`.

Fields

* Document Number

* Description

* Revision

* Status

* Upload Document

Buttons

Save

Cancel

Validation

Revision must be 0 or greater.

Upload Document accepts PDF, DWG, and DXF files up to 30 MB.

Selected file detail displays file name and file size after user chooses a file.

---

# P&ID Form

Source alignment:

Form Create/Edit P&ID menggunakan `DOCUMENT_EDITABLE_STATUSES`, sehingga `Final As-Built` tidak ditampilkan sebagai opsi status. Source code juga mendukung field `Area`, `SLA Timer`, dan `NAS Location`.

Fields

* Document Number

* Description

* Revision

* Status

* Upload Document

Buttons

Save

Cancel

Validation

Revision must be 0 or greater.

Upload Document accepts PDF, DWG, and DXF files up to 30 MB.

Selected file detail displays file name and file size after user chooses a file.

---

# Incoming Transmittal Form

Fields

* Transmittal Number

* Sender

* Receive Date

* Document Count

* Status

Buttons

Save

Cancel

---

# Outgoing Transmittal Form

Fields

* Transmittal Number

* Destination

* Send Date

* Document Count

* Status

Buttons

Save

Cancel

---

# Storage Repository Form

Fields

* Repository Name

* Path

* Status

Buttons

Save

Cancel

---

# Delete Confirmation

Title

Delete Item

Message

Are you sure you want to delete this record?

Buttons

Delete

Cancel

---

# Logout Confirmation

Message

Are you sure you want to log out?

Buttons

Logout

Cancel
