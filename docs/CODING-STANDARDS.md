# CODING-STANDARDS.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan standar coding untuk seluruh implementasi Front-End.

Semua developer dan AI Agent WAJIB mengikuti aturan ini.

---

# General Principles

Code must be:

* Simple

* Readable

* Modular

* Reusable

* Consistent

* Predictable

---

# Technology

Mandatory

* HTML5

* TailwindCSS Play CDN

* Vanilla JavaScript

* ES Modules

Forbidden

* jQuery

* React

* Vue

* Angular

* Bootstrap JS

---

# JavaScript Rules

Use

```
const
```

by default.

Use

```
let
```

only when reassignment is required.

Never use

```
var
```

---

# Module Rule

Always

```
export
```

and

```
import
```

ES Modules.

Example

```javascript
export function renderTable() {}
```

```javascript
import { renderTable } from "./table.js";
```

---

# Naming Convention

Variables

camelCase

```
documentList

currentUser

selectedRow
```

Functions

camelCase

```
renderTable()

loadDashboard()

saveDocument()
```

Constants

UPPER_CASE

```
DEFAULT_PAGE_SIZE

MAX_LOGIN_ATTEMPTS
```

Files

kebab-case or consistent lowercase

```
change-password.js

incoming.js

table.js
```

---

# HTML Rules

Semantic HTML only.

Prefer

```
header

main

section

nav

aside

footer
```

Avoid unnecessary div nesting.

---

# CSS Rules

Tailwind Utility First.

Avoid inline style.

Avoid duplicated utility groups.

Custom CSS only in

```
css/app.css
```

---

# DOM Rules

Never inject large HTML repeatedly without need.

Prefer

```
createElement()

append()

replaceChildren()
```

when appropriate.

Avoid excessive innerHTML for complex interactions.

---

# Event Rules

Register events in JavaScript.

Example

Good

```javascript
button.addEventListener("click", saveDocument);
```

Bad

```html
<button onclick="saveDocument()">
```

Inline events are forbidden.

---

# Form Rules

All forms must support:

Validation

Required

Disabled State

Loading State

Success State

Error State

Cancel Action

---

# CRUD Rules

Every Create

↓

Validate

↓

Save

↓

Update UI

↓

Create Audit

↓

Show Toast

Every Edit

↓

Load

↓

Validate

↓

Update

↓

Refresh

↓

Audit

↓

Toast

Every Delete

↓

Confirmation

↓

Delete

↓

Refresh

↓

Audit

↓

Toast

---

# Error Handling

Never silently ignore errors.

Display:

Toast

or

Modal

Log through helper when appropriate.

---

# LocalStorage Rules

Never call

```
localStorage.setItem()
```

directly inside UI modules.

Always use

```
services/storage.js
```

---

# Component Rules

Component should:

Receive data

↓

Render

↓

Return element

No business logic.

No persistence logic.

---

# Service Rules

Services may:

Read data

Write data

Transform data

Persist data

Services must NOT:

Render UI

Access visual components

---

# Router Rules

One route

↓

One module

One module

↓

One entry function

No duplicated routing logic.

---

# Async Rules

Even with LocalStorage:

Prefer async-compatible architecture.

Source alignment:

Current source code uses synchronous LocalStorage services. New code may remain synchronous while still preserving service boundaries and migration-ready contracts. Async wrappers can be introduced later when REST API integration begins.

Example

```javascript
async function loadDocuments() {}
```

This eases future API migration.

---

# Comments

Prefer self-explanatory code.

Use comments only when logic is not obvious.

Avoid redundant comments.

Bad

```javascript
// increment i
i++;
```

Good

```javascript
// Recalculate SLA after document status changes
```

---

# Formatting

Consistent indentation

4 spaces or project-standard spacing.

One blank line between logical sections.

No trailing whitespace.

---

# Magic Values

Avoid:

```javascript
if(status==7)
```

Prefer:

```javascript
if(status===STATUS_APPROVED)
```

Constants belong in:

```
utils/constants.js
```

---

# Notifications

Every important CRUD operation should display:

Success Toast

Warning Toast

Error Toast

Info Toast

---

# Audit Standard

Automatically create audit entries for:

Create

Edit

Delete

Login

Logout

Change Password

Status Change

Transmittal Action

---

# Performance

Avoid unnecessary DOM rerender.

Cache selectors when practical.

Prefer event delegation for large tables.

---

# Accessibility

Buttons should have accessible labels.

Inputs should have labels.

Interactive elements should be keyboard accessible.

Maintain sufficient color contrast.

---

# Future Compatibility

Architecture should be compatible with future migration to:

* REST API

* Laravel

* Node.js

* ASP.NET

* React

without major domain restructuring.
