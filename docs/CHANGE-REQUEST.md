# CHANGE-REQUEST.md

# SENA Engineering Document Management System (EDMS) MVP

## CR-001 - Documentation Alignment with Latest Source

Status: Approved

Category: Documentation / Source Alignment

Request:

Update project documentation so it reflects the latest Front-End source code behavior while keeping source code as the temporary source of truth.

Affected Areas:

* Document status dropdown rules
* SLA Monitoring behavior
* Dashboard SLA Overview interactions
* Routing for SLA Monitoring and Notifications
* LocalStorage API documentation
* File structure documentation
* Access control documentation
* API and backend-ready notes

Affected Documents:

* PRD.md
* IMPLEMENTATION-PLAN.md
* UI-GUIDELINES.md
* COMPONENT-SPEC.md
* MOCK-DATA.md
* ROUTING.md
* LOCAL-STORAGE-API.md
* FILE-STRUCTURE.md
* CODING-STANDARDS.md
* DESIGN-TOKENS.md
* ICON-SYSTEM.md
* STATE-MANAGEMENT.md
* ACCESS-CONTROL.md
* FORM-SPEC.md
* TABLE-SPEC.md
* SLA-RULES.md
* API-CONTRACT.md
* BACKEND-READY-SCHEMA.md
* UI-CHANGELOG.md
* DECISION-LOG.md
* DOCUMENT-STATUS-RULES.md
* SLA-MONITORING-SPEC.md
* DASHBOARD-INTERACTIONS.md

---

## CR-002 - Document Status Dropdown Rules

Status: Approved

Category: Business Rule / UI

Request:

Document the separation between:

* `DOCUMENT_STATUSES`
* `DOCUMENT_EDITABLE_STATUSES`
* `DOCUMENT_STATUS_FILTER_OPTIONS`

Rules:

* `Final As-Built` remains a valid document status.
* `Final As-Built` is hidden from specified editable status dropdowns.
* `Final As-Built` is hidden from Dashboard, PFD, and P&ID status filters.

Source:

`docs/DOCUMENT-STATUS-RULES.md`

---

## CR-003 - SLA Monitoring Source and Edit Action

Status: Approved

Category: SLA Monitoring

Request:

Document that SLA Monitoring:

* Uses `documents` as source data.
* Displays all documents with SLA status `At Risk`.
* Shows SLA Timer.
* Provides Edit Document action based on `document.edit` permission.

Source:

`docs/SLA-MONITORING-SPEC.md`

---

## CR-004 - Dashboard SLA Overview Interactions

Status: Approved

Category: Dashboard UI

Request:

Document Dashboard SLA Overview click behavior:

* `At Risk` opens `/sla`.
* `Overdue` opens `/escalation`.

Source:

`docs/DASHBOARD-INTERACTIONS.md`

