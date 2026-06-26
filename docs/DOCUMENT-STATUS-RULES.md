# DOCUMENT-STATUS-RULES.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan aturan status dokumen yang digunakan pada source code Front-End terbaru.

Source code sementara menjadi acuan utama untuk dokumen ini.

---

# Status Constants

## DOCUMENT_STATUSES

Daftar status dokumen lengkap:

```javascript
[
  "Internal Draft",
  "Internal Review",
  "Client Review",
  "Revision Requested",
  "Approved",
  "Final As-Built"
]
```

Digunakan untuk:

* Data existing
* Badge
* SLA final status
* Perhitungan SLA Overview
* Filter Document Register master

---

## DOCUMENT_EDITABLE_STATUSES

Daftar status yang boleh dipilih user pada form editable:

```javascript
DOCUMENT_STATUSES.filter((status) => status !== "Final As-Built")
```

Aturan:

* `Final As-Built` tidak boleh muncul pada dropdown `Status` form edit/create dokumen yang sudah diterapkan pada source code.
* Existing data dengan status `Final As-Built` tetap valid.
* `Approved` tetap tersedia sebagai status editable.

Digunakan pada:

* Edit Document di Dashboard
* Edit Document di Document Register
* Create PFD
* Edit PFD
* Create P&ID
* Edit P&ID
* Edit Document dari SLA Monitoring

---

## DOCUMENT_STATUS_FILTER_OPTIONS

Daftar status yang boleh muncul pada dropdown `Filter Status`:

```javascript
DOCUMENT_STATUS_FILTER_OPTIONS = DOCUMENT_EDITABLE_STATUSES
```

Aturan:

* `Final As-Built` tidak muncul pada dropdown `Filter Status` di Dashboard, PFD, dan P&ID.
* Jika filter tersimpan di LocalStorage memakai nilai yang sudah tidak valid, UI harus kembali ke `All Status`.

---

# Migration Notes

Ketika backend diimplementasikan:

* Backend tetap boleh menyimpan `Final As-Built` sebagai status final.
* Front-End tidak boleh menawarkan `Final As-Built` pada form editable kecuali ada Change Request baru.
* API filter status harus mendukung daftar filter yang sama dengan Front-End.

