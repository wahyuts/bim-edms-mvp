# UI Changelog

## 2026-06-25

- Changed Edit User Profile Name selection to a dropdown-only control without manual typing.
- Activated Notifications page with search, type/status filters, unread counter, Open action, Mark Read, and Delete.
- Integrated Notifications with backend/database endpoints and removed static Escalation Alert seed data.
- Added minimum value validation for document Revision fields so negative revisions cannot be submitted.
- Added selected upload file name/size detail, increased upload limit to 30 MB, and allowed PDF, DWG, and DXF document uploads.
- Restricted Storage Repository NAS edit/delete/download actions to Administrator only.
- Improved View PFD and View P&ID modals with structured document detail layout.
- Updated Dashboard Document Register Table actions to inline View/Edit/Download and removed NAS Location column from the dashboard table.
- Granted Client role document edit permission so Edit appears on Dashboard, PFD, and P&ID document tables.

## 2026-06-13

- Added Create New User menu above Profile in the Profile Dropdown.
- Create New User is disabled and gray for non-Administrator users.
- Added Create New User page using Profile-style dark card layout.
- Added Edit User Profile menu below Create New User in the Profile Dropdown.
- Edit User Profile is disabled and gray for non-Administrator users.
- Added Edit User Profile page with searchable registered user name selection.

## 2026-06-24

- Documented status dropdown rules for `DOCUMENT_STATUSES`, `DOCUMENT_EDITABLE_STATUSES`, and `DOCUMENT_STATUS_FILTER_OPTIONS`.
- Documented removal of `Final As-Built` from editable status dropdowns and selected status filters.
- Documented SLA Monitoring behavior using `documents` as source data.
- Documented SLA Monitoring At Risk list with SLA Timer and Edit Document action.
- Documented Dashboard SLA Overview click behavior: `At Risk` opens SLA Monitoring and `Overdue` opens Escalation.
- Documented `/sla` and `/notifications` routing alignment.
- Added `DOCUMENT-STATUS-RULES.md`, `SLA-MONITORING-SPEC.md`, and `DASHBOARD-INTERACTIONS.md`.
