# BACKEND-IMPLEMENTATION-GUIDE-MYSQL.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini menjelaskan cara membangun Backend dan database MySQL untuk EDMS berdasarkan source code Front-End saat ini.

Source code Front-End masih menjadi source of truth sementara. Backend harus mengikuti perilaku yang sudah ada, bukan memaksa Front-End berubah dulu.

---

# 1. Recommended Backend Shape

Untuk MVP, gunakan:

* Node.js
* Express.js
* MySQL 8+
* JWT Authentication
* RBAC
* Audit Trail
* Soft Delete

Alasan:

* Paling mudah dipasangkan dengan Front-End vanilla JS yang sudah ada
* Mudah diekspos sebagai REST API
* Mudah dimigrasikan dari LocalStorage ke API tanpa mengubah domain besar-besaran

---

# 2. What The Front-End Already Assumes

Source code saat ini sudah menunjukkan perilaku berikut:

* Login dan session management
* Protected route
* Dashboard
* Document Register
* PFD dan P&ID sebagai filtered view dari `documents`
* SLA Monitoring
* Escalation Alert
* Notification Center
* Audit Trail
* Storage Repository
* Create/Edit User Profile

Important current behaviors:

* Data source Front-End saat ini adalah LocalStorage
* `documents` adalah source utama dokumen engineering
* SLA Monitoring mengambil data `At Risk` dari `documents`
* Escalation mengambil data overdue dari `documents`
* `Final As-Built` tetap status valid, tetapi tidak selalu editable/filterable

Referensi:

* [BACKEND-READY-SCHEMA.md](./BACKEND-READY-SCHEMA.md)
* [API-CONTRACT.md](./API-CONTRACT.md)
* [DOCUMENT-STATUS-RULES.md](./DOCUMENT-STATUS-RULES.md)
* [SLA-MONITORING-SPEC.md](./SLA-MONITORING-SPEC.md)

---

# 3. Database Design Strategy

## Core principle

Jangan membuat tabel terpisah untuk hal yang sudah secara natural merupakan turunan dari `documents` kecuali memang dibutuhkan untuk workflow backend.

Recommended pattern:

* `documents` menjadi tabel inti
* `pfd` dan `pid` tidak perlu tabel fisik terpisah jika hanya kategori dari `documents`
* `sla` dan `escalation` dapat menjadi derived view atau endpoint turunan
* `audit_trail` dan `notifications` tetap menjadi tabel fisik

## Suggested master tables

* `users`
* `roles`
* `permissions`
* `role_permissions`
* `documents`
* `transmittals`
* `transmittal_documents`
* `audit_trail`
* `notifications`
* `repositories`
* `sla_rules`
* `escalation_logs`

Referensi struktur utama ada di [BACKEND-READY-SCHEMA.md](./BACKEND-READY-SCHEMA.md).

---

# 4. MySQL Mapping

## users

Simpan user login dan profil dasar.

Important fields:

* `username`
* `password_hash`
* `full_name`
* `email`
* `role_id`
* `department`
* `status`

## roles

Simpan role seperti:

* Administrator
* Project Manager
* Document Controller
* Engineer
* Client

## permissions

Simpan permission code seperti:

* `document.create`
* `document.edit`
* `document.delete`
* `document.download`
* `escalation.view`
* `notification.delete`

## documents

Tabel paling penting.

Disarankan menyimpan:

* `document_number`
* `title`
* `description`
* `discipline`
* `area`
* `revision`
* `status`
* `sla_status`
* `sla_due_at`
* `sla_started_at`
* `repository_id`
* `file_path`
* `file_name`
* `file_size`
* `mime_type`

Catatan:

* `sla_status` bisa dihitung server-side dari `sla_started_at` dan aturan SLA
* `sla_due_at` berguna bila backend mau menyimpan tanggal target
* `documents` harus mendukung kategori PFD dan P&ID lewat `discipline`

## File Upload Storage

Saat NAS belum tersedia, file fisik boleh disimpan ke storage lokal backend:

```text
backend/uploads/
```

Recommended pattern:

* Simpan file berdasarkan `document_number`
* Gunakan nama file yang aman dan unik
* Simpan metadata file ke tabel `documents`
* Simpan lokasi file ke kolom `file_path`

Contoh pola folder:

```text
backend/uploads/documents/P-CDU-PFD-001/P-CDU-PFD-001.pdf
backend/uploads/documents/P-CDU-PID-010/P-CDU-PID-010.pdf
```

Aturan operasional:

* File upload tetap harus lolos validasi tipe dan ukuran
* Front-End tetap menganggap dokumen berhasil disimpan jika metadata berhasil masuk ke MySQL
* NAS migration nanti cukup mengganti adapter storage tanpa mengubah model data utama

Catatan:

* `file_path` sebaiknya menyimpan path relatif atau path yang mudah dimigrasikan
* Jangan hardcode path NAS di business logic saat NAS belum aktif

## transmittals

Simpan incoming/outgoing dalam satu tabel dengan kolom `type`.

## transmittal_documents

Relasi many-to-many antara transmittal dan document.

## audit_trail

Simpan semua event penting:

* Login
* Logout
* Create
* Edit
* Delete
* Status Change
* Transmittal Action

## notifications

Simpan notifikasi user.

Kolom minimum:

* `user_id`
* `title`
* `message`
* `type`
* `module`
* `target_route`
* `target_label`
* `is_read`
* `created_at`
* `updated_at`
* `deleted_at`

## repositories

Simpan NAS / storage repository.

## sla_rules

Simpan durasi SLA per status.

Ini penting agar durasi tidak hardcoded di backend.

## escalation_logs

Simpan histori eskalasi per dokumen.

---

# 5. REST API Shape

Gunakan base path:

```text
/api/v1
```

Minimum endpoint set:

* `POST /auth/login`
* `POST /auth/logout`
* `GET /auth/me`
* `GET /users`
* `GET /users/{id}`
* `POST /users`
* `PUT /users/{id}`
* `DELETE /users/{id}`
* `GET /documents`
* `GET /documents/{id}`
* `POST /documents`
* `PUT /documents/{id}`
* `DELETE /documents/{id}`
* `GET /escalation`
* `GET /sla`
* `GET /notifications`
* `POST /notifications`
* `PUT /notifications/{id}/read`
* `DELETE /notifications/{id}`
* `GET /audit-trail`
* `GET /storage`
* `POST /storage`
* `PUT /storage/{id}`
* `DELETE /storage/{id}`

Important rule:

* Front-End edits triggered from SLA Monitoring still update `documents`
* `/sla` can be read-only or derived
* `/escalation` can be derived from overdue `documents`

---

# 6. Backend Build Order

## Phase 1

* Create MySQL schema and seed data
* Create auth endpoints
* Create RBAC middleware
* Create `GET /auth/me`

## Phase 2

* Create document endpoints
* Support pagination, search, filter, sort
* Support status, discipline, and repository data

## Phase 3

* Implement PFD and P&ID as filtered document queries
* Implement dashboard summary endpoints
* Implement SLA overview and escalation derived queries

## Phase 4

* Implement notifications
* Implement audit trail
* Implement storage repository
* Implement local file upload to `backend/uploads/` before NAS is ready

## Local Upload First Strategy

Jika NAS belum terhubung, alur upload yang aman adalah:

1. Terima file dari Front-End via multipart upload
2. Validasi ekstensi, mime type, dan ukuran
3. Simpan file fisik ke `backend/uploads/`
4. Simpan metadata ke MySQL
5. Simpan path file ke `file_path`
6. Saat NAS tersedia, pindahkan storage adapter tanpa mengubah kontrak API

Recommended storage abstraction:

* `LocalDiskStorage`
* `NasStorage`
* `S3Storage`

Untuk saat ini yang dipakai:

* `LocalDiskStorage`

Target jangka panjang:

* `NasStorage`

## Phase 5

* Connect Front-End to API
* Replace LocalStorage calls gradually
* Keep response contract stable

---

# 7. Front-End Migration Notes

When Front-End is migrated later:

* Keep route structure the same
* Keep status rules the same
* Keep dashboard interactions the same
* Keep PFD/P&ID as filtered document views
* Keep audit trail and notification side effects
* Keep `document.edit` permission checks

## 8. Local Upload Checklist

Sebelum NAS tersambung, pastikan:

* Folder `backend/uploads/` tersedia
* Folder tersebut tidak terbuka publik tanpa kontrol
* File upload dibatasi berdasarkan ukuran
* File upload divalidasi tipe file
* Metadata file tersimpan di MySQL
* Path file tersimpan konsisten di `file_path`
* Tidak ada business rule yang bergantung pada path NAS tertentu

This reduces the amount of UI refactor needed.

## Multipart Upload Endpoint

Untuk fase sekarang, endpoint upload yang disarankan adalah:

```text
POST /api/v1/documents
PUT /api/v1/documents/{id}
```

Request format:

* `Content-Type: multipart/form-data`
* Field file: `file`
* Field metadata: `document_number`, `title`, `description`, `discipline`, `area`, `revision`, `status`, `sla_due_at`, `repository_id`

Alur proses:

1. Validasi auth dan permission.
2. Validasi metadata.
3. Validasi file.
4. Simpan file ke `backend/uploads/documents/{document_number}/`.
5. Simpan metadata ke MySQL.
6. Kembalikan response JSON berisi metadata dokumen dan file path.

Contoh response sukses:

```json
{
  "success": true,
  "message": "Document created",
  "data": {
    "id": 1,
    "document_number": "P-CDU-PFD-001",
    "file_name": "P-CDU-PFD-001.pdf",
    "file_path": "uploads/documents/P-CDU-PFD-001/P-CDU-PFD-001.pdf"
  }
}
```

Validasi yang wajib:

* MIME type harus diizinkan
* Ekstensi file harus cocok
* Ukuran file harus dibatasi
* `document_number` harus unik
* Folder tujuan harus dibuat otomatis bila belum ada

Recommended local folder behavior:

* Simpan file dengan nama aman
* Buat subfolder per `document_number`
* Gunakan path relatif untuk database agar mudah migrasi
* Jangan hardcode path NAS saat NAS belum aktif

Contoh struktur:

```text
backend/uploads/documents/P-CDU-PFD-001/P-CDU-PFD-001.pdf
```

## Request And Response Contract

### Create Document

`POST /api/v1/documents`

Multipart fields:

* `file` - wajib
* `document_number` - wajib
* `title` - wajib
* `description` - opsional
* `discipline` - wajib
* `area` - opsional
* `revision` - wajib
* `status` - wajib
* `sla_due_at` - opsional
* `repository_id` - opsional

Success response:

```json
{
  "success": true,
  "message": "Document created",
  "data": {
    "id": 1,
    "document_number": "P-CDU-PFD-001",
    "title": "Process Flow Diagram Area 2",
    "file_name": "P-CDU-PFD-001.pdf",
    "file_path": "uploads/documents/P-CDU-PFD-001/P-CDU-PFD-001.pdf",
    "mime_type": "application/pdf"
  }
}
```

### Update Document

`PUT /api/v1/documents/{id}`

Multipart fields:

* Semua field metadata create
* `file` - opsional jika file diganti

Success response:

```json
{
  "success": true,
  "message": "Document updated",
  "data": {
    "id": 1,
    "document_number": "P-CDU-PFD-001",
    "file_name": "P-CDU-PFD-001-v2.pdf",
    "file_path": "uploads/documents/P-CDU-PFD-001/P-CDU-PFD-001-v2.pdf"
  }
}
```

### Delete Document

`DELETE /api/v1/documents/{id}`

Behavior:

* Hapus metadata dari MySQL
* Hapus file fisik dari `backend/uploads/`
* Tulis audit trail
* Jika file fisik gagal dihapus, catat error untuk cleanup terjadwal

## Validation Rules For Upload

Wajib validasi:

* File tidak boleh kosong
* `document_number` tidak boleh kosong
* `revision` harus angka valid
* `status` harus sesuai status rules
* ukuran file maksimal 30 MB
* hanya ekstensi dan mime type yang diizinkan yang boleh masuk

Allowed extensions:

* `.pdf`
* `.dwg`
* `.dxf`

Allowed mime types:

* `application/pdf`
* `application/acad`
* `application/dwg`
* `application/dxf`
* `application/octet-stream`
* `image/vnd.dwg`
* `image/vnd.dxf`
* `application/x-autocad`
* `application/x-dwg`
* `application/x-dxf`

Catatan: DWG/DXF sering dikirim browser sebagai `application/octet-stream`, sehingga backend tetap harus memvalidasi ekstensi file.

## Failure Responses

Gunakan response error yang konsisten:

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "file": "File is required"
  }
}
```

Contoh error yang perlu dipikirkan:

* File required
* Invalid file type
* File too large
* Duplicate document number
* Unauthorized
* Forbidden
* Document not found

## Operational Rule

Simpan nama file asli di `file_name`, tetapi path fisik boleh dinormalisasi agar aman dan konsisten.

Kalau file diganti saat update:

* file lama dihapus
* metadata lama ditimpa
* audit trail tetap tercatat
* path baru harus tersimpan di database

## Suggested Implementation Skeleton

Untuk memudahkan implementasi upload, pecah ke file berikut:

```text
backend/src/routes/documents.routes.js
backend/src/controllers/documents.controller.js
backend/src/services/documents.service.js
backend/src/services/storage/local-disk.storage.js
backend/src/middleware/upload.middleware.js
backend/src/utils/file-path.js
```

Tanggung jawab tiap bagian:

* `routes/documents.routes.js` - definisi endpoint
* `controllers/documents.controller.js` - baca request dan kirim response
* `services/documents.service.js` - business logic create/update/delete
* `services/storage/local-disk.storage.js` - simpan dan hapus file fisik
* `middleware/upload.middleware.js` - parsing multipart dan validasi awal
* `utils/file-path.js` - helper nama folder/file yang aman

Suggested request flow:

1. Route menerima request multipart.
2. Middleware upload mem-parsing file.
3. Controller memvalidasi payload utama.
4. Service membuat folder target jika belum ada.
5. Storage service menyimpan file ke `backend/uploads/`.
6. Service menyimpan metadata ke MySQL.
7. Service mengembalikan response final ke controller.

Suggested error handling:

* Jika file gagal disimpan, batalkan insert metadata.
* Jika metadata gagal disimpan setelah file tersimpan, hapus file yang sudah terlanjur ditulis.
* Jika update file gagal, pertahankan file lama sampai proses replace benar-benar sukses.

## Pseudo Code Flow

### Create Document

```text
validate auth
validate permission
validate multipart fields
validate file
build safe file path
create storage folder
save file to backend/uploads/
insert document metadata to MySQL
create audit trail
return success response
```

### Update Document

```text
validate auth
validate permission
load existing document
validate multipart fields
if file is present
  validate file
  save new file to temp path
  delete old file after new file saved successfully
update metadata to MySQL
create audit trail
return success response
```

### Delete Document

```text
validate auth
validate permission
load existing document
delete document metadata from MySQL
delete physical file from backend/uploads/
create audit trail
return success response
```

## Transaction And Cleanup Notes

Untuk implementasi yang aman:

* Simpan metadata dan file dengan urutan yang konsisten
* Jika business flow mendukung, gunakan database transaction untuk operasi metadata
* File fisik tidak bisa ikut transaction MySQL, jadi butuh cleanup kalau insert/update gagal
* Sediakan helper cleanup untuk menghapus file yang gagal dipakai
* Jika replace file gagal di tengah jalan, jangan hapus file lama sebelum file baru aman tersimpan

---

# 8. Prompt For Codex

Use this prompt when asking Codex to build the backend and MySQL database:

```text
Ikuti AGENTS.md dan seluruh dokumentasi di docs/ sebagai source of truth.

Bangun Backend EDMS MVP menggunakan Node.js + Express + MySQL 8+ dengan REST API /api/v1.
Jangan ubah source code frontend terlebih dahulu kecuali untuk menambahkan konfigurasi konsumsi API nanti.

Wajib ikuti dokumen berikut:
- docs/BACKEND-READY-SCHEMA.md
- docs/API-CONTRACT.md
- docs/DOCUMENT-STATUS-RULES.md
- docs/SLA-MONITORING-SPEC.md
- docs/DASHBOARD-INTERACTIONS.md
- docs/ACCESS-CONTROL.md
- docs/STATE-MANAGEMENT.md
- docs/LOCAL-STORAGE-API.md

Target backend:
1. Buat schema MySQL dengan tabel:
   users, roles, permissions, role_permissions, documents, transmittals,
   transmittal_documents, audit_trail, notifications, repositories,
   sla_rules, escalation_logs.
2. Terapkan foreign key, unique constraint, timestamps, soft delete, dan audit fields.
3. Buat seed data awal yang konsisten dengan mock data Front-End.
4. Implementasikan JWT login/logout/me.
5. Implementasikan RBAC sesuai ACCESS-CONTROL.md.
6. Implementasikan CRUD documents dengan pagination, search, filter, sort.
7. Implementasikan PFD dan P&ID sebagai filtered views dari documents.
8. Implementasikan SLA derived from documents:
   - At Risk page menampilkan dokumen dengan SLA status At Risk
   - Escalation menampilkan dokumen overdue
   - SLA timer count-up dari sla_started_at
9. Implementasikan audit trail untuk create, edit, delete, login, logout, status change, dan transmittal action.
10. Implementasikan notifications dan storage repository endpoints.

Konvensi penting:
- Jangan hardcode duration SLA di module
- Jangan membuat tabel PFD/P&ID terpisah jika hanya butuh filtered views
- Jangan mengubah kontrak data frontend tanpa memperbarui dokumentasi
- Pastikan response mengikuti format success/error di API-CONTRACT.md

Deliverables:
- SQL migration/schema
- Seed data
- Backend source code
- API route handlers
- Middleware auth/RBAC
- Service layer
- README setup backend
- Mapping frontend-to-backend notes

Setelah implementasi, update docs jika ada kontrak yang berubah.
```

---

# 9. Next Steps

Kalau NAS belum tersedia dan file sudah disimpan ke `backend/uploads/`, urutan langkah berikutnya yang disarankan adalah:

1. Buat endpoint multipart upload untuk `documents`.
2. Simpan file fisik ke `backend/uploads/documents/{document_number}/`.
3. Simpan metadata file ke MySQL pada tabel `documents`.
4. Kembalikan `file_path`, `file_name`, dan metadata dokumen dalam response API.
5. Tambahkan validasi mime type, ukuran file, dan ekstensi yang diizinkan.
6. Bungkus penyimpanan file ke dalam storage service agar nanti bisa dipindah ke NAS tanpa ubah kontrak API.
7. Setelah itu, baru lanjut ke endpoint edit file, delete file, dan migrasi storage adapter ke NAS.

Recommended backend order untuk tahap berikutnya:

* `POST /documents` dengan file upload
* `PUT /documents/{id}` dengan file upload optional
* `DELETE /documents/{id}` untuk membersihkan file fisik
* Storage adapter abstraction
* NAS adapter swap ketika infrastruktur sudah siap

---

# 10. Practical Tips

* Mulai dari schema dan auth dulu.
* Jangan langsung mengubah Front-End.
* Gunakan response API yang stabil dan sederhana.
* Pastikan document status rules dipakai di backend dan frontend dengan konsisten.
* Jangan membuat `sla` dan `escalation` sebagai master table jika mereka hanya turunan dari `documents`.
