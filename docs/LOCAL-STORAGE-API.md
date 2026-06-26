# LOCAL-STORAGE-API.md

# SENA EDMS MVP

## Overview

LocalStorage merupakan data source utama untuk seluruh MVP Front-End.

Seluruh module WAJIB menggunakan helper API yang sama.

Dilarang mengakses localStorage secara langsung dari UI component.

Seluruh akses data harus melalui `services/storage.js`.

---

# File

```
js/services/storage.js
```

---

# Public API

## seed()

Initialize seluruh collection.

```javascript
seed()
```

Behavior

* create default collection

* preserve existing data

* no overwrite

---

## get()

Read collection.

```javascript
get(collectionName)
```

Example

```javascript
get("documents")
```

Return

```javascript
Array
```

---

## getById()

```javascript
getById(collectionName, id)
```

Example

```javascript
getById("documents", 10)
```

Return

Object

or

null

---

## getSingle()

Read one non-array value from LocalStorage, such as `session`.

```javascript
getSingle(collectionName)
```

---

## replaceSingle()

Replace one non-array value in LocalStorage.

```javascript
replaceSingle(collectionName, value)
```

Used for session updates.

---

## create()

Insert new object.

```javascript
create(collectionName, data)
```

Behavior

* auto generate id

* push collection

* save localStorage

Returns

Inserted Object

---

## update()

```javascript
update(collectionName, id, data)
```

Behavior

Merge existing object

Save

Return updated object

---

## remove()

```javascript
remove(collectionName, id)
```

Behavior

Delete object

Persist

Return boolean

---

## replace()

Replace full collection.

```javascript
replace(collectionName, array)
```

---

## getSetting()

Read persisted UI setting.

```javascript
getSetting(key, defaultValue)
```

Used by CRUD list pages for filter, sort, and page size state.

---

## setSetting()

Persist UI setting.

```javascript
setSetting(key, value)
```

---

## clear()

Clear one collection.

```javascript
clear(collectionName)
```

---

## clearAll()

Development only.

```javascript
clearAll()
```

Warning

Delete every EDMS collection.

---

# Authentication API

## login()

```javascript
login(username,password)
```

Behavior

* validate users

* create session

* save localStorage

Return

```javascript
{
  success:true,
  user:{}
}
```

or

```javascript
{
  success:false,
  message:"Invalid username/password"
}
```

---

## logout()

```javascript
logout()
```

Behavior

Remove session

Redirect login

---

## currentUser()

```javascript
currentUser()
```

Return

Current Session User

---

## isLoggedIn()

```javascript
isLoggedIn()
```

Return

true

false

---

# CRUD Convention

Source alignment:

When creating or updating `documents`, storage service manages SLA tracking:

* If `sla` is created or changed, `slaStartedAt` is set to the current date/time.
* If `sla` is unchanged during update, existing `slaStartedAt` is preserved.
* If `sla` is cleared, `slaStartedAt` is cleared.

Every Create

Automatically

```
createdAt

createdBy
```

Every Update

Automatically

```
updatedAt

updatedBy
```

Every Delete

Automatically create Audit Trail

```
Delete Document

Delete PFD

Delete P&ID

Delete Transmittal
```

---

# Audit API

createAudit()

```javascript
createAudit({

action,

document,

detail,

user

})
```

Stored to

```
auditTrail
```

---

# Notification API

createNotification()

Source alignment:

Notification is backend/database-first. Front-End no longer stores notification records in LocalStorage when backend notification endpoints are available.

```javascript
createNotification({

title,

message,

type,

module,

targetRoute,

targetLabel

})
```

Stored to

```
backend notifications table
```

---

# Collection Schema

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

---

# Naming Convention

Collections

camelCase

```
incomingTransmittal

outgoingTransmittal

auditTrail
```

Object

```
id

createdAt

updatedAt

createdBy

updatedBy
```

---

# ID Rules

Every collection uses

```
Number
```

Auto Increment

Example

```
1

2

3

4
```

Never UUID.

---

# Error Handling

Missing Collection

Auto Create

Missing ID

Return null

Delete Missing ID

Return false

Update Missing ID

Return null

Never throw fatal error to UI.

---

# Persistence Rule

Every CRUD operation MUST immediately:

1. Update LocalStorage

2. Refresh UI State

3. Refresh Table

4. Refresh KPI if needed

5. Write Audit Trail

6. Trigger Notification (if applicable)

---

# Source of Truth Priority

1. LocalStorage

2. In-memory state

3. UI rendering

UI must never become the source of truth.

All displayed data must originate from LocalStorage through the storage service API.
