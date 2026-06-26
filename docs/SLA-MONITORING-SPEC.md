# SLA-MONITORING-SPEC.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan perilaku halaman SLA Monitoring sesuai source code Front-End terbaru.

SLA Monitoring adalah halaman operasional untuk memantau dokumen dengan status SLA tertentu, bukan master collection terpisah.

---

# Source of Truth

Data utama halaman SLA Monitoring berasal dari:

```text
localStorage.documents
```

melalui:

```text
js/services/storage.js
```

Halaman tidak menggunakan `localStorage.sla` sebagai sumber utama tampilan.

---

# SLA Status Calculation

Status SLA dihitung dari util:

```text
js/utils/sla-timer.js
```

Rules:

* SLA Timer 0-6 hari: `On Track`
* SLA Timer hari ke-7: `At Risk`
* SLA Timer hari ke-8 dan seterusnya: `Overdue`
* Dokumen dengan status `Approved` atau `Final As-Built`: `Final As-Built`

---

# At Risk List

Halaman SLA Monitoring menampilkan seluruh dokumen dengan:

```javascript
getDocumentSlaOverviewStatus(documentItem) === "At Risk"
```

Kolom aktual:

* No
* Document Number
* Description
* Discipline
* Revision
* Document Status
* SLA Status
* SLA Timer
* Actions

---

# SLA Timer

SLA Timer ditampilkan menggunakan count-up format:

```text
0d 0h 0m
```

Jika dokumen final:

```text
Done
```

Jika tanggal SLA tidak valid atau kosong:

```text
-
```

Timer dihitung dari `slaStartedAt` jika tersedia.

---

# Edit Document Action

Halaman SLA Monitoring menyediakan tombol:

```text
Edit
```

Action:

* Membuka modal `Edit Document`
* Memperbarui record pada `localStorage.documents`
* Membuat audit trail
* Menampilkan toast success
* Refresh daftar At Risk

Dropdown `Status` pada form edit menggunakan:

```text
DOCUMENT_EDITABLE_STATUSES
```

Sehingga `Final As-Built` tidak ditampilkan sebagai opsi editable.

---

# Permission

Tombol `Edit` mengikuti permission:

```text
document.edit
```

Jika user tidak memiliki hak edit dokumen, tombol tidak ditampilkan.

Route SLA Monitoring berada pada menu module:

```text
dashboard
```

Sehingga semua role yang dapat mengakses Dashboard dapat melihat halaman SLA Monitoring, sedangkan action edit tetap dikontrol oleh permission dokumen.

