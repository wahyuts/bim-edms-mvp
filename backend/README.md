# EDMS Backend Setup

Panduan operasional untuk menyiapkan backend MySQL + Node.js bagi SENA EDMS MVP.

## 1. Prasyarat

* Node.js 20+
* MySQL 8+
* Git
* Terminal atau PowerShell

## 2. Struktur Folder

```text
backend/
  .env.example
  package.json
  README.md
  uploads/
  sql/
    schema.sql
  src/
    app.js
    server.js
    routes/
      health.routes.js
```

## 3. Setup Database

1. Buat database dan tabel awal dengan menjalankan `backend/sql/schema.sql`.
2. Pastikan MySQL memakai charset `utf8mb4`.
3. Setelah schema jalan, cek tabel berikut sudah terbentuk:
   * `roles`
   * `permissions`
   * `role_permissions`
   * `users`
   * `repositories`
   * `documents`
   * `transmittals`
   * `transmittal_documents`
   * `audit_trail`
   * `notifications`
   * `sla_rules`
   * `escalation_logs`

## 3B. Upload File Lokal Saat NAS Belum Tersedia

Jika NAS belum tersambung, file dokumen boleh disimpan dulu ke:

```text
backend/uploads/
```

Panduan operasional:

1. Terima file dari Front-End lewat multipart upload.
2. Validasi tipe file dan ukuran.
3. Simpan file fisik ke `backend/uploads/`.
4. Simpan metadata file ke tabel `documents`.
5. Simpan lokasi file ke kolom `file_path`.
6. Gunakan nama file yang aman dan unik.

Contoh struktur folder:

```text
backend/uploads/documents/P-CDU-PFD-001/P-CDU-PFD-001.pdf
backend/uploads/documents/P-CDU-PID-010/P-CDU-PID-010.pdf
```

Aturan penting:

* Jangan hardcode path NAS di backend saat NAS belum tersedia.
* Simpan path yang dapat dimigrasikan, idealnya relatif terhadap root storage backend.
* Saat NAS siap, ganti storage adapter saja tanpa mengubah kontrak data utama.

Rekomendasi implementasi berikutnya:

* `LocalDiskStorage` untuk fase sekarang
* `NasStorage` untuk fase migrasi
* `S3Storage` atau `MinIOStorage` untuk future-ready storage

## 4. Langkah Teknis Berikutnya

Setelah storage lokal dipakai, urutan implementasi berikutnya yang paling aman adalah:

1. Tambah middleware upload file.
2. Tambah service penyimpanan lokal.
3. Tambah endpoint create document dengan multipart upload.
4. Tambah endpoint update document dengan replace file opsional.
5. Tambah endpoint delete document dengan cleanup file fisik.
6. Bungkus storage ke dalam adapter supaya pindah ke NAS tinggal swap implementasi.

## 5. Setup Environment

1. Copy `backend/.env.example` menjadi `.env`.
2. Isi kredensial MySQL sesuai environment lokal.
3. Set `JWT_SECRET` dengan string yang kuat.

Contoh:

```env
PORT=4000
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=edms_db
MYSQL_USER=root
MYSQL_PASSWORD=secret
JWT_SECRET=change_this_secret
```

## 6. Jalankan Backend

Masuk ke folder `backend` lalu install dependency:

```bash
npm install
```

Setelah itu jalankan:

```bash
npm run dev
```

Atau:

```bash
npm start
```

## 7. Cek Health Endpoint

Setelah server hidup, buka:

```text
GET http://localhost:4000/api/v1/health
```

Expected response:

```json
{
  "success": true,
  "message": "OK",
  "data": {
    "status": "healthy",
    "service": "SENA EDMS Backend",
    "time": "..."
  }
}
```

## 8. Implementasi Lanjutan

Urutan kerja yang disarankan:

1. Auth
2. RBAC
3. Documents
4. SLA derived endpoint
5. Escalation derived endpoint
6. Notifications
7. Audit Trail
8. Storage Repository

## 9. Endpoint MVP Yang Sudah Ada

Backend saat ini sudah menyediakan endpoint MVP berikut:

* `GET /api/v1/health`
* `GET /api/v1/dashboard`
* `POST /api/v1/auth/login`
* `POST /api/v1/auth/logout`
* `GET /api/v1/auth/me`
* `GET /api/v1/documents`
* `GET /api/v1/documents/:id`
* `POST /api/v1/documents`
* `PUT /api/v1/documents/:id`
* `DELETE /api/v1/documents/:id`
* `GET /api/v1/pfd`
* `GET /api/v1/pfd/:id`
* `POST /api/v1/pfd`
* `PUT /api/v1/pfd/:id`
* `DELETE /api/v1/pfd/:id`
* `GET /api/v1/pid`
* `GET /api/v1/pid/:id`
* `POST /api/v1/pid`
* `PUT /api/v1/pid/:id`
* `DELETE /api/v1/pid/:id`
* `GET /api/v1/sla`
* `GET /api/v1/sla/:id`
* `GET /api/v1/escalation`
* `GET /api/v1/escalation/:id`
* `GET /api/v1/notifications`
* `PUT /api/v1/notifications/:id/read`
* `DELETE /api/v1/notifications/:id`
* `GET /api/v1/audit-trail`
* `GET /api/v1/audit-trail/:id`
* `GET /api/v1/storage`
* `GET /api/v1/storage/:id`
* `POST /api/v1/storage`
* `PUT /api/v1/storage/:id`
* `DELETE /api/v1/storage/:id`

Endpoint tersebut menggunakan JWT auth, RBAC middleware, MySQL repository, soft delete untuk data utama, dan response shape sesuai `docs/API-CONTRACT.md`.

## 10. Struktur Yang Disarankan Untuk Lanjutan

Saat backend mulai bertambah, struktur yang sehat biasanya seperti ini:

```text
backend/
  sql/
  src/
    config/
    controllers/
    middleware/
    routes/
    services/
    database/
    utils/
    app.js
    server.js
```

Pola kerja yang disarankan:

* `routes` hanya mendefinisikan endpoint
* `controllers` menerima request dan mengirim response
* `services` berisi business logic
* `database` atau `repositories` berisi query MySQL
* `middleware` untuk auth, RBAC, validation, error handling

## 11. Kontrak yang Harus Dijaga

* `documents` adalah source utama dokumen engineering
* PFD dan P&ID cukup sebagai filtered views
* SLA Monitoring membaca dokumen `At Risk`
* Escalation membaca dokumen `Overdue`
* `Final As-Built` tetap valid sebagai status dokumen
* Action edit dari SLA Monitoring tetap meng-update `documents`

Referensi:

* [BACKEND-IMPLEMENTATION-GUIDE-MYSQL.md](../docs/BACKEND-IMPLEMENTATION-GUIDE-MYSQL.md)
* [BACKEND-READY-SCHEMA.md](../docs/BACKEND-READY-SCHEMA.md)
* [API-CONTRACT.md](../docs/API-CONTRACT.md)

## 12. Prompt Codex Singkat

```text
Ikuti docs/BACKEND-IMPLEMENTATION-GUIDE-MYSQL.md sebagai panduan.
Bangun backend EDMS MVP di folder backend/ dengan Node.js, Express, dan MySQL 8+.
Mulai dari auth, RBAC, documents, SLA derived endpoint, escalation derived endpoint, notifications, audit trail, dan storage repository.
Jaga kontrak API tetap mengikuti docs/API-CONTRACT.md.
```

## 12. Langkah Selanjutnya yang Disarankan

Kalau file sudah bisa disimpan ke `backend/uploads/`, tahap berikutnya yang paling aman adalah:

1. Buat endpoint `POST /documents` dengan multipart upload.
2. Simpan file ke `backend/uploads/documents/{document_number}/`.
3. Simpan metadata file ke tabel `documents`.
4. Kembalikan `file_path`, `file_name`, `file_size`, dan `mime_type` di response.
5. Tambahkan validasi tipe file dan ukuran file.
6. Bungkus proses simpan file ke storage service agar nanti mudah pindah ke NAS.
7. Setelah itu, lanjutkan ke `PUT /documents/{id}` untuk replace file dan `DELETE /documents/{id}` untuk cleanup.

Urutan ini menjaga supaya frontend tetap bisa upload sekarang, lalu migrasi storage ke NAS bisa dilakukan tanpa mengubah kontrak data utama.

## 13. Detail Request Multipart

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

### Update Document

`PUT /api/v1/documents/:id`

Multipart fields:

* Semua field metadata create
* `file` - opsional jika file diganti

### Response Example

```json
{
  "success": true,
  "message": "Document created",
  "data": {
    "id": 1,
    "document_number": "P-CDU-PFD-001",
    "file_name": "P-CDU-PFD-001.pdf",
    "file_path": "uploads/documents/P-CDU-PFD-001/P-CDU-PFD-001.pdf",
    "mime_type": "application/pdf"
  }
}
```

### Error Example

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "file": "File is required"
  }
}
```

### File Rules

* Simpan file ke `backend/uploads/documents/{document_number}/`
* Simpan `file_name` dan `file_path` ke MySQL
* Gunakan path relatif agar mudah migrasi ke NAS
* Mulai ketat dengan PDF jika workflow sekarang hanya PDF

## 14. Skeleton Implementasi Yang Disarankan

Kalau mau mulai coding upload, struktur file yang enak dipelihara adalah:

```text
backend/src/routes/documents.routes.js
backend/src/controllers/documents.controller.js
backend/src/services/documents.service.js
backend/src/services/storage/local-disk.storage.js
backend/src/middleware/upload.middleware.js
backend/src/utils/file-path.js
```

Tugas masing-masing file:

* `routes/documents.routes.js` - definisi endpoint
* `controllers/documents.controller.js` - baca request dan kirim response
* `services/documents.service.js` - business logic create/update/delete
* `services/storage/local-disk.storage.js` - simpan dan hapus file fisik
* `middleware/upload.middleware.js` - parsing multipart dan validasi awal
* `utils/file-path.js` - helper nama folder/file yang aman

Urutan kerja request:

1. Route menerima request multipart.
2. Middleware upload mem-parsing file.
3. Controller memvalidasi payload utama.
4. Service membuat folder target jika belum ada.
5. Storage service menyimpan file ke `backend/uploads/`.
6. Service menyimpan metadata ke MySQL.
7. Service mengembalikan response final ke controller.

Prinsip error handling:

* Kalau file gagal disimpan, metadata tidak boleh lanjut insert.
* Kalau metadata gagal disimpan setelah file tertulis, file harus dibersihkan.
* Kalau update file gagal, file lama tetap dipertahankan sampai replace sukses.

### Pseudo Code Create

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

### Pseudo Code Update

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

### Pseudo Code Delete

```text
validate auth
validate permission
load existing document
delete document metadata from MySQL
delete physical file from backend/uploads/
create audit trail
return success response
```

### Cleanup Notes

* File fisik tidak bisa ikut transaction MySQL
* Jika insert metadata gagal, hapus file yang terlanjur disimpan
* Jika replace file gagal, jangan hapus file lama sebelum file baru aman
* Sediakan helper cleanup untuk file gagal pakai
