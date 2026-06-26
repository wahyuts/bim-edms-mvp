# COMPONENT-SPEC.md

## Overview

Dokumen ini mendefinisikan seluruh reusable component yang digunakan pada SENA Engineering Document Management System (EDMS) MVP.

Semua component harus:

* Reusable
* Modular
* Menggunakan ES Modules
* Tidak menggunakan jQuery
* Tidak menggunakan framework
* Menggunakan TailwindCSS Play CDN
* Mendukung Dark Theme
* Responsive

---

# 1. Button Component

## Variants

* Primary
* Secondary
* Success
* Warning
* Danger
* Ghost

## Sizes

* sm
* md
* lg

## States

* Default
* Hover
* Active
* Disabled
* Loading

## Icons

Support:

* plus
* eye
* pencil
* trash
* upload
* download
* external-link
* logout
* filter
* search

Example Actions:

* Create
* View
* Edit
* Delete
* Save
* Cancel
* Upload
* Download

---

# 2. Card Component

## Used For

* KPI Card
* Storage Repository
* SLA Overview
* Escalation Alert
* Summary Widget

## Structure

Header

Body

Footer (optional)

## Optional Elements

* Icon
* Progress Bar
* Badge
* Action Link

---

# 3. Table Component

## Features

* Search
* Sort
* Filter
* Pagination
* Responsive
* Sticky Header

## Action Column

Supports:

* View
* Edit
* Delete
* Download
* Upload
* Open

## Empty State

Display:

"No data available"

## Loading State

Display Skeleton Loader

---

# 4. Badge Component

## Variants

Approved

Client Review

Draft

Revision Requested

Final As-Built

Overdue

Internal Draft

On Track

At Risk

Online

Offline

---

# 5. Modal Component

## Types

View Detail

Create Form

Edit Form

Delete Confirmation

Logout Confirmation

Information

Success

Error

## Actions

Confirm

Cancel

Close

---

# 6. Form Component

## Input Types

Text

Email

Password

Number

Textarea

Date

Datetime

Select

Checkbox

Radio

File

Hidden

## Validation

Required

Min Length

Max Length

Pattern

Custom Validation

## States

Default

Focus

Disabled

Error

Success

---

# 7. Input Search Component

Features

* Search Icon

* Clear Button

* Debounce Ready

Placeholder:

"Search document..."

---

# 8. Filter Component

Supports

Dropdown

Multi Select

Single Select

Reset Filter

Apply Filter

---

# 9. Dropdown Component

Used For

Profile Menu

Status Filter

Discipline Filter

Page Size

Context Menu

States

Closed

Open

Disabled

---

# 10. Pagination Component

Features

Previous

Page Number

Next

Rows Per Page

Current Page Indicator

---

# 11. Toast Component

Types

Success

Error

Warning

Info

Position

Top Center

Auto Close

Manual Close

---

# 12. LeftSidebar

Menu

Dashboard

Document Register

* PFD
* P&ID

Transmittal

* Incoming
* Outgoing

Escalation Alert

Audit Trail

Storage Repository

* NAS

Features

Collapsible

Active Indicator

Expandable Menu

Responsive

---

# 13. Topbar Component

Contains

Project Name

Notification

Profile Dropdown

Profile Menu

* Create New User
* Edit User Profile
* Profile
* Change Password
* Logout

Create New User and Edit User Profile are disabled and gray for non-Administrator users.

---

# 14. KPI Card Component

Fields

Title

Value

Subtitle

Progress

Optional Icon

Optional Trend

Examples

Total Documents

Internal Draft

Client Review

Escalation Alert

Final As-Built

---

# 15. Notification Component

Display

Unread Badge

Notification List

Timestamp

Severity

Click Action

---

# 16. Confirm Delete Component

Message

"Are you sure you want to delete this item?"

Buttons

Delete

Cancel

---

# 17. Logout Confirmation Component

Message

"Are you sure you want to log out?"

Buttons

Logout

Cancel

---

# 17. Dashboard Layout

Source alignment:

* SLA Overview Card mendukung action link pada row `At Risk` dan `Overdue`.
* SLA Monitoring menggunakan Table Component dengan action `Edit` jika user memiliki permission `document.edit`.
* Form Component menggunakan `DOCUMENT_EDITABLE_STATUSES` pada form status editable yang terdampak.
* Detail mengikuti `docs/DASHBOARD-INTERACTIONS.md`, `docs/SLA-MONITORING-SPEC.md`, dan `docs/DOCUMENT-STATUS-RULES.md`.

Components

- LeftSidebar

- Topbar

- KPICardGroup

- DocumentTable

- RightSidebar

------------------------

RightSidebar

Children

- SLAOverviewCard

- EscalationAlertCard

- StorageRepositoryCard

------------------------

DocumentTable

Features

- Search

- Filter

- Sort

- Pagination

- Sticky Header

---

# Component Naming Convention

btnPrimary()

btnDanger()

createCard()

createTable()

createBadge()

createModal()

createPagination()

createDropdown()

createToast()

createSidebar()

createTopbar()

All components should be importable as ES Modules.
