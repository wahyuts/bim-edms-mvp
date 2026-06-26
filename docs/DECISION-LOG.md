# DECISION-LOG.md

# SENA Engineering Document Management System (EDMS) MVP

## 2026-06-24 - Source Code as Temporary Source of Truth

Decision:

The latest Front-End source code is treated as the temporary source of truth for documentation alignment.

Reason:

Recent UI and behavior changes were implemented before all documentation was updated.

Impact:

Documentation has been updated to reflect source behavior without changing source code.

---

## 2026-06-24 - SLA Monitoring Uses Documents as Source Data

Decision:

SLA Monitoring derives its displayed data from `documents`, not from a separate `sla` collection.

Reason:

The current source calculates SLA status from document fields through `js/utils/sla-timer.js`.

Impact:

* `docs/SLA-MONITORING-SPEC.md` defines the page behavior.
* `docs/MOCK-DATA.md` marks `sla` as legacy/mock seed data for current UI purposes.
* Backend API may expose SLA as derived data, while document edits continue through document endpoints.

---

## 2026-06-24 - Escalation Uses Derived Overdue Documents

Decision:

Escalation rows are derived from `documents` whose calculated SLA status is `Overdue`.

Reason:

The current Escalation module filters Document Register data using SLA timer utilities.

Impact:

* `docs/MOCK-DATA.md` marks `escalation` as legacy/mock seed data for current UI purposes.
* `docs/API-CONTRACT.md` clarifies `/escalation` may be a derived read endpoint.

---

## 2026-06-24 - Final As-Built Hidden from Editable Status Controls

Decision:

`Final As-Built` remains valid as a document status but is hidden from specific editable status dropdowns and selected filter dropdowns.

Reason:

The source code separates full status data from editable/filterable status options.

Impact:

* Status rules are centralized in `docs/DOCUMENT-STATUS-RULES.md`.
* Future UI work must use the appropriate status list for each control.

---

## 2026-06-24 - Dashboard SLA Overview Navigation

Decision:

Dashboard SLA Overview rows are partially interactive:

* `At Risk` opens `/sla`.
* `Overdue` opens `/escalation`.
* `On Track` and `Final As-Built` remain static.

Reason:

This matches the current Dashboard source behavior and user workflow.

Impact:

Dashboard interactions are documented in `docs/DASHBOARD-INTERACTIONS.md`.
