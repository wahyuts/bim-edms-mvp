# DASHBOARD-INTERACTIONS.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan interaksi khusus pada Dashboard sesuai source code terbaru.

---

# SLA Overview Card

Card `SLA Overview` menampilkan:

* On Track
* At Risk
* Overdue
* Final As-Built

Setiap row menampilkan badge status dan total dokumen.

---

# Clickable Rows

## At Risk

Klik row `At Risk` membuka:

```text
#/sla
```

Tujuan:

```text
SLA Monitoring
```

Halaman tujuan menampilkan seluruh dokumen dengan SLA status `At Risk`.

---

## Overdue

Klik row `Overdue` membuka:

```text
#/escalation
```

Tujuan:

```text
Escalation Alert
```

Halaman tujuan menampilkan seluruh dokumen overdue.

---

# Static Rows

Row berikut tidak memiliki action klik:

* On Track
* Final As-Built

---

# Accessibility

Clickable row harus:

* Menggunakan link hash route
* Dapat diakses keyboard
* Memiliki focus state
* Memiliki label yang jelas untuk screen reader

