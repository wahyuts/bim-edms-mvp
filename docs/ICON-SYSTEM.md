# ICON-SYSTEM.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan standar penggunaan ikon di seluruh aplikasi.

Gunakan satu library ikon yang konsisten.

Recommended:

* Heroicons
* Lucide
* SVG Inline

Jangan mencampur beberapa library dalam satu aplikasi.

---

# Navigation Icons

Dashboard

```
layout-dashboard
```

Document Register

```
folder-open
```

PFD

```
file-text
```

P&ID

```
file-cog
```

Transmittal

```
send
```

Incoming

```
download
```

Outgoing

```
upload
```

Escalation

```
triangle-alert
```

Audit Trail

```
history
```

Storage

```
database
```

NAS

```
hard-drive
```

---

# CRUD Icons

Create

```
plus
```

View

```
eye
```

Edit

```
pencil
```

Delete

```
trash-2
```

Save

```
save
```

Cancel

```
x
```

Search

```
search
```

Filter

```
filter
```

Refresh

```
refresh-cw
```

---

# Authentication Icons

Login

```
log-in
```

Logout

```
log-out
```

Profile

```
user
```

Password

```
lock
```

Show Password

```
eye
```

Hide Password

```
eye-off
```

---

# Notification Icons

Success

```
check-circle
```

Warning

```
alert-triangle
```

Error

```
circle-x
```

Info

```
info
```

Notification

```
bell
```

SLA Monitoring

```
clock
```

Current source alignment:

The Front-End currently uses inline SVG icons in `js/components/sidebar.js`. The icon set remains visually consistent and includes Dashboard, Document Register, Transmittal, SLA Monitoring, Escalation, Audit, Storage, and Notifications.

---

# File Icons

PDF

```
file-text
```

Upload

```
upload
```

Download

```
download
```

Open

```
external-link
```

Attachment

```
paperclip
```

---

# Table Action Order

Recommended order:

```
View

Edit

Delete

Download
```

or

```
View

Edit

Download

Delete
```

Delete should always be visually distinct.

---

# Color Mapping

View

Blue

Edit

Amber

Delete

Red

Download

Gray

Upload

Blue

Save

Green

Cancel

Gray

Notification

Yellow

Success

Green

Danger

Red

---

# Icon Size

Small

16px

Default

20px

Large

24px

Navigation

20px

Button

18px

Table Action

16px

---

# Accessibility

Every icon-only button must include:

* aria-label

or

* title

Example

```
<button aria-label="Delete Document">
```

Never rely solely on icon visuals.
