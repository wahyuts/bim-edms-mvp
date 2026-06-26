# TABLE-SPEC.md

# SENA Engineering Document Management System (EDMS) MVP

## General Table Rules

Every table supports:

* Search

* Filter

* Pagination

* Sort

* Responsive

* Sticky Header

* Empty State

* Loading State

* Action Column

---

# Dashboard Document Table

Source alignment:

Dashboard table source code currently provides actions:

* View
* Edit
* Download

Delete is not displayed on Dashboard.

Columns

1. No

2. Document Number

3. Description

4. Discipline

5. Area

6. Revision

7. Status

8. SLA Timer

9. NAS Location

10. Actions

Actions

* View

* Edit

* Delete

* Download

Features

- Search

- Filter

- Sort

- Pagination

- Sticky Header

- Responsive


# Document Register

Columns

1. No

2. Document Number

3. Description

4. Discipline

5. Area

6. Revision

7. Status

8. SLA Timer

9. NAS Location

10. Actions

Actions

* View

* Edit

* Delete

* Download

---

# PFD

Columns

* No

* Document Number

* Description

* Revision

* Status

* Actions

---

# P&ID

Columns

* No

* Document Number

* Description

* Revision

* Status

* Actions

---

# Incoming Transmittal

Columns

* No

* Transmittal Number

* Sender

* Receive Date

* Document Count

* Status

* Actions

---

# Outgoing Transmittal

Columns

* No

* Transmittal Number

* Destination

* Send Date

* Document Count

* Status

* Actions

---

# Escalation

Source alignment:

Escalation table derives rows from Document Register (`documents`) using SLA overdue calculation.

Columns

* No

* Document Number

* Level

* Status

* Remaining Time

* Actions

Data Source

* Derived from Document Register.
* Display documents whose SLA Timer is on day 8 or later.
* Status column displays Overdue for each listed document.

---

# Audit Trail

Columns

* No

* Time

* User

* Action

* Document

* Detail

Read Only

---

# Storage Repository

Columns

* No

* Repository

* Status

* Path

* Actions

---

# Notifications

Source alignment:

Notifications table supports:

* Search
* Filter by Type
* Filter by Read Status
* Open Related Module
* Mark Read
* Delete

Columns

* No

* Type

* Module

* Title

* Message

* Created At

* Status

* Actions

---

# Standard Action Order

View

Edit

Delete

Download

Upload

Delete button always displayed as danger action.
