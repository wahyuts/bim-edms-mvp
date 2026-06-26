# STATE-MANAGEMENT.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan standar state management untuk seluruh aplikasi Front-End.

Source of Truth utama:

LocalStorage

↓

Services

↓

Modules

↓

UI

UI tidak boleh menjadi source of truth.

---

# State Hierarchy

```
LocalStorage

↓

services/storage.js

↓

Feature Module

↓

Component

↓

DOM
```

---

# Global State

Collections

```
users

documents

pfd

pid

incomingTransmittal

outgoingTransmittal

auditTrail

sla

escalation

storageRepository

notifications

session
```

Source alignment:

Current SLA Monitoring and Escalation views derive their display state from `documents`, not from `sla` or `escalation` collections.

The `sla` and `escalation` collections may still exist as seeded mock/legacy collections.

---

# Page State

Each page may contain:

loading

success

empty

error

ready

---

# Table State

loading

Display

Skeleton Loader

↓

success

Display Table

↓

empty

Display

"No data available"

↓

error

Display Error Message

---

# Form State

idle

↓

editing

↓

validating

↓

saving

↓

success

↓

ready

Error path

idle

↓

editing

↓

validating

↓

error

↓

editing

---

# Login State

idle

↓

validating

↓

authenticating

↓

success

↓

redirect

Failure

idle

↓

authenticating

↓

error

↓

idle

---

# Modal State

closed

↓

open

↓

confirm

↓

close

Delete

closed

↓

open

↓

delete

↓

refresh

↓

close

---

# Toast State

hidden

↓

show

↓

auto close

↓

hidden

Duration

3000ms

Default

---

# Notification State

unread

↓

read

↓

archived (future)

Unread count should update automatically.

---

# CRUD Lifecycle

Create

```
Validate

↓

Save

↓

Update LocalStorage

↓

Audit

↓

Notification

↓

Refresh Table

↓

Refresh KPI

↓

Toast
```

---

Edit

```
Load

↓

Edit

↓

Validate

↓

Update

↓

Audit

↓

Refresh

↓

Toast
```

---

Delete

```
Confirmation

↓

Delete

↓

Audit

↓

Notification

↓

Refresh

↓

Toast
```

---

# Session State

Logged Out

↓

Login

↓

Session Created

↓

Dashboard

↓

Logout

↓

Session Removed

↓

Login

---

# Route State

Before loading page

Check

```
session.isLoggedIn
```

If false

↓

Redirect

```
/login
```

If true

↓

Continue

---

# Sidebar State

collapsed

expanded

active menu

active submenu

State should persist in LocalStorage.

Source alignment:

Current sidebar active state is derived from the active route. Collapsed/expanded persistence is not implemented in the latest source code.

---

# Search State

query

filtered result

no result

clear

Typing should not mutate original dataset.

Always filter from source collection.

---

# Filter State

default

↓

selected

↓

applied

↓

reset

Reset returns original collection.

---

# Pagination State

currentPage

pageSize

totalItems

totalPages

Persist pageSize in LocalStorage.

Source alignment:

Reusable CRUD pages persist page size through `getSetting` and `setSetting`. Dashboard page size is local in-memory state in the latest source code.

---

# Theme State

Current MVP

Dark Theme Only

Future

light

dark

system

---

# Refresh Rule

After every successful CRUD:

Update LocalStorage

↓

Update In-Memory State

↓

Re-render Component

↓

Update KPI

↓

Update Badge Count

↓

Update Notification

↓

Update Audit Trail

---

# Error Handling

Never leave UI in loading state.

Every async operation must end with:

success

or

error

No hanging state allowed.

---

# Future Compatibility

Architecture should support migration to:

REST API

↓

Server State

↓

Caching

↓

Optimistic Update

without major refactoring.
