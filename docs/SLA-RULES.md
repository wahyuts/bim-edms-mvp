# SLA-RULES.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan aturan SLA (Service Level Agreement), status monitoring, dan escalation untuk seluruh dokumen.

---

# SLA Status

On Track

At Risk

Overdue

Final As-Built

Dashboard Category Rule

* SLA Timer 0-6 hari: On Track
* SLA Timer hari ke-7: At Risk
* SLA Timer hari ke-8 dan seterusnya: Overdue
* Dokumen berstatus Approved atau Final As-Built: Final As-Built
* Dokumen Overdue otomatis masuk ke Escalation Alert

---

# Status Color

On Track

Green

At Risk

Amber

Overdue

Red

Final As-Built

Blue

---

# Default SLA

Internal Draft

3 Days

Internal Review

5 Days

Client Review

7 Days

Revision Requested

3 Days

Final As-Built

Completed

---

# SLA Timer Dashboard

Source alignment:

SLA Timer currently behaves as count-up from `slaStartedAt` or fallback date fields. It is not displayed as remaining countdown in the latest Front-End source.

Format

```
3d 7h 30m
```

Display

Day

Hour

Minute

Behavior

* Timer berjalan sebagai count up setelah tanggal disimpan pada field `sla`.
* Jika field `sla` kosong atau bukan tanggal `YYYY-MM-DD`, dashboard menampilkan `-`.
* Saat field `sla` diisi pada create dokumen, sistem menyimpan timestamp mulai pada `slaStartedAt`.
* Jika tanggal `sla` diperbarui saat edit dokumen, `slaStartedAt` diperbarui sehingga timer reset hanya untuk dokumen tersebut.
* Dashboard menampilkan `Done` pada SLA Timer jika status dokumen adalah `Approved`.

---

# SLA Calculation Dashboard

Start

Tanggal pada field SLA Timer dokumen

End

Document Completed

or

Final As-Built

---

# Warning Threshold

Hari ke-7

Status

At Risk

Notification

Warning

---

# Escalation Threshold

Hari ke-8 dan seterusnya

Status

Overdue

Dashboard Integration

* Card Escalation Alert menghitung dokumen dengan SLA Timer hari ke-8 dan seterusnya.
* Klik Card Escalation Alert pada dashboard membuka halaman Escalation Alert.
* Halaman Escalation Alert menampilkan seluruh dokumen Overdue dari Document Register.
* Klik row `At Risk` pada Dashboard SLA Overview membuka halaman SLA Monitoring.
* Klik row `Overdue` pada Dashboard SLA Overview membuka halaman Escalation Alert.

Notification

Escalation Alert

---

# Escalation Level

Level 1

Engineer

---

Level 2

Lead Engineer

---

Level 3

Project Manager

---

Level 4

Engineering Manager

---

# Escalation Flow

Document

↓

Internal Review

↓

SLA Running

↓

80%

↓

Warning Notification

↓

100%

↓

Escalation

↓

Manager Review

---

# Dashboard KPI

Display

* Total Documents

* Internal Draft

* Client Review

* Escalation Alert

* Final As-Built

* SLA Overview

---

# Badge Mapping

On Track

Green

At Risk

Amber

Overdue

Red

Final As-Built

Blue

---

# Audit Integration

Every SLA status change creates:

Audit Trail

Notification

Dashboard Refresh

---

# Future Ready

Future implementation may support:

* Working Calendar

* Holiday Calendar

* Business Hour SLA

* Auto Escalation Email

* SMS Notification

* WhatsApp Notification

Current MVP uses LocalStorage date-based count up for dashboard SLA monitoring.

---

# SLA Monitoring Page Alignment

Detail perilaku halaman SLA Monitoring mengikuti `docs/SLA-MONITORING-SPEC.md`.

Ringkasan:

* Source data berasal dari `documents`.
* Halaman menampilkan dokumen `At Risk`.
* Halaman menyediakan action `Edit Document` sesuai permission `document.edit`.
