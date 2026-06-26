# AGENTS.md

# SENA Engineering Document Management System (EDMS)

## Tujuan

Dokumen ini merupakan pedoman utama (Master Instruction) bagi seluruh AI Coding Agent dan developer yang berkontribusi pada proyek SENA Engineering Document Management System (EDMS).

Seluruh implementasi WAJIB mengacu pada dokumen ini dan seluruh dokumentasi proyek sebagai Source of Truth.

AI tidak boleh membuat asumsi sendiri apabila aturan sudah didefinisikan dalam dokumentasi.

---

# Informasi Proyek

## Nama Proyek

SENA Engineering Document Management System (EDMS)

## Tahap Pengembangan

MVP (Minimum Viable Product)

## Scope Saat Ini

Front-End Only

## Backend

Belum diimplementasikan

## Data Source

LocalStorage

## Arsitektur

Single Page Application (SPA)

---

# Technology Stack

## Wajib Digunakan

* HTML5
* TailwindCSS Play CDN
* Vanilla JavaScript
* ES Modules
* LocalStorage

## Tidak Diperbolehkan

* React
* Vue
* Angular
* jQuery
* Bootstrap JavaScript
* TypeScript
* Framework SPA lainnya

---

# Prioritas Source of Truth

AI dan Developer WAJIB mengikuti urutan prioritas berikut:

1. docs/PRD.md

2. docs/IMPLEMENTATION-PLAN.md

3. docs/UI-GUIDELINES.md

4. docs/COMPONENT-SPEC.md

5. docs/MOCK-DATA.md

6. docs/ROUTING.md

7. docs/LOCAL-STORAGE-API.md

8. docs/FILE-STRUCTURE.md

9. docs/CODING-STANDARDS.md

10. docs/DESIGN-TOKENS.md

11. docs/ICON-SYSTEM.md

12. docs/STATE-MANAGEMENT.md

13. docs/ACCESS-CONTROL.md

14. docs/FORM-SPEC.md

15. docs/TABLE-SPEC.md

16. docs/SLA-RULES.md

17. docs/API-CONTRACT.md

18. docs/BACKEND-READY-SCHEMA.md

Jika terjadi konflik antar dokumen:

Dokumen dengan prioritas lebih tinggi menjadi acuan utama.

AI tidak boleh membuat implementasi yang bertentangan dengan dokumentasi tersebut.

---

# Prinsip Pengembangan

Seluruh kode harus:

* Modular
* Reusable
* Konsisten
* Mudah dibaca
* Mudah dipelihara
* Responsif
* Mudah dikembangkan

Hindari:

* Hardcode business rule
* Duplikasi komponen
* Duplikasi business logic
* Magic value
* Magic string

---

# Arsitektur Aplikasi

Business Logic

↓

Service

↓

Module

↓

Component

↓

DOM

UI bukan Source of Truth.

Source of Truth saat ini adalah LocalStorage.

Untuk implementasi backend di masa depan, Source of Truth akan berpindah ke REST API.

---

# Standar ES Modules

Seluruh JavaScript wajib menggunakan:

* export
* import

Tidak diperbolehkan:

* inline script
* global variable
* circular dependency

---

# Standar Component

Component hanya bertugas:

Input

↓

Render

↓

Menghasilkan DOM

Component TIDAK boleh:

* Mengakses LocalStorage
* Menyimpan data
* Mengandung business logic
* Mengakses API secara langsung

Component harus reusable.

---

# Standar Service

Service bertugas untuk:

* Membaca data
* Menyimpan data
* Memperbarui data
* Menghapus data
* Transformasi data

Service tidak boleh:

* Render UI
* Memanipulasi DOM

---

# Aturan LocalStorage

Dilarang menggunakan:

localStorage.getItem()

localStorage.setItem()

langsung dari Module atau Component.

Seluruh akses data WAJIB melalui:

js/services/storage.js

---

# Standar CRUD

## Create

Validasi

↓

Simpan Data

↓

Update LocalStorage

↓

Audit Trail

↓

Notification

↓

Refresh UI

↓

Toast Success

---

## Edit

Load Data

↓

Validasi

↓

Update Data

↓

Audit Trail

↓

Refresh UI

↓

Toast Success

---

## Delete

Confirmation

↓

Delete Data

↓

Audit Trail

↓

Notification

↓

Refresh UI

↓

Toast Success

---

# Authentication

## Login

* Validasi User
* Membuat Session
* Redirect Dashboard

## Logout

* Konfirmasi Logout
* Hapus Session
* Redirect Login

## Protected Route

Semua halaman selain Login wajib memeriksa:

session.isLoggedIn == true

Jika tidak valid:

Redirect ke Login.

---

# Routing

Satu Route

↓

Satu Module

Satu Module

↓

Satu Entry Function

Route tidak valid:

Redirect ke Dashboard

User belum login:

Redirect ke Login

---

# Standar UI

Menggunakan:

* Dark Theme
* Responsive Layout
* Tailwind Utility First
* Design Token
* Icon System
* Component Reusable

Animasi secukupnya.

Tidak menggunakan animasi berlebihan.

---

# Standar Form

Seluruh Form wajib memiliki:

* Required Validation
* Loading State
* Error State
* Success State
* Cancel Button

Gunakan reusable Form Component.

---

# Standar Table

Seluruh Table wajib mendukung:

* Search
* Filter
* Pagination
* Sorting
* Loading State
* Empty State
* Responsive
* Sticky Header
* Action Column

---

# Standar Notification

Gunakan Toast:

* Success
* Warning
* Error
* Info

Durasi default:

3000 ms

---

# Standar Audit Trail

Seluruh aktivitas berikut wajib dicatat:

* Login
* Logout
* Create
* Edit
* Delete
* Change Password
* Status Change
* Transmittal Action

---

# Standar SLA

Seluruh aturan SLA wajib mengikuti:

SLA-RULES.md

Dilarang melakukan hardcode durasi SLA di dalam module.

---

# Hak Akses (Access Control)

Ikuti ACCESS-CONTROL.md.

Apabila user tidak memiliki hak akses:

* Sembunyikan tombol
* Jangan tampilkan menu
* Jangan tampilkan aksi yang tidak diizinkan

Jangan hanya men-disable tombol jika tidak diwajibkan oleh spesifikasi.

---

# Organisasi File

Ikuti:

FILE-STRUCTURE.md

Dilarang:

* Membuat folder sembarangan
* Mengubah struktur tanpa alasan
* Menyimpan business logic di Component

---

# Standar Penamaan

## Variable

camelCase

Contoh:

currentUser

documentList

selectedRow

---

## Function

camelCase

Contoh:

renderTable()

saveDocument()

loadDashboard()

---

## Constant

UPPER_CASE

Contoh:

DEFAULT_PAGE_SIZE

STATUS_APPROVED

---

## File

Gunakan lowercase atau kebab-case

Contoh:

table.js

change-password.js

incoming.js

---

# Standar Performa

Gunakan:

* Event Delegation
* Reuse DOM
* Minimal Re-render
* Cache DOM Selector bila diperlukan

Hindari render ulang yang tidak diperlukan.

---

# Accessibility

Seluruh Button:

* memiliki aria-label bila icon only

Seluruh Input:

* memiliki label

Seluruh elemen interaktif:

* dapat diakses menggunakan keyboard

Gunakan kontras warna yang memadai.

---

# Kompatibilitas Backend

Saat ini:

LocalStorage

Harus mudah dimigrasikan ke:

* REST API
* JWT Authentication
* RBAC
* Audit Trail
* Soft Delete
* NAS
* Object Storage
* S3
* MinIO

Implementasi Front-End tidak boleh menyulitkan migrasi backend di masa depan.

---

# Perilaku AI Coding Agent

Sebelum membuat kode:

1. Baca seluruh dokumentasi terkait.

2. Gunakan Component yang sudah ada.

3. Gunakan Service yang sudah ada.

4. Gunakan Utility yang sudah ada.

5. Hindari duplikasi kode.

6. Hindari membuat file baru apabila fungsi dapat menggunakan file yang sudah tersedia.

7. Prioritaskan refactoring dibanding membuat implementasi baru.

8. Jangan mengubah kontrak data tanpa memperbarui dokumentasi terkait.

---

# Aturan Emas (Golden Rules)

1. Konsistensi lebih penting daripada kreativitas.

2. Reuse lebih baik daripada duplikasi.

3. Dokumentasi lebih tinggi prioritasnya daripada asumsi.

4. Seluruh implementasi harus mendukung migrasi backend di masa depan.

5. Seluruh perubahan harus tetap mengikuti Source of Truth proyek.

6. Jika terdapat keraguan, ikuti dokumentasi yang sudah ada dan jangan membuat asumsi sendiri.

---

# Aturan Perubahan UI

AI tidak boleh mengubah layout, struktur halaman, navigasi, atau komponen utama tanpa adanya pembaruan pada Source of Truth.

Sebelum melakukan perubahan UI, AI wajib memeriksa:

- docs/UI-GUIDELINES.md
- docs/COMPONENT-SPEC.md
- docs/DESIGN-TOKENS.md
- docs/ROUTING.md
- docs/CHANGE-REQUEST.md (jika ada)
- docs/UI-CHANGELOG.md (jika ada)

Jika perubahan yang diminta belum terdokumentasi, AI harus meminta pembaruan dokumentasi terlebih dahulu atau secara eksplisit menyatakan bahwa implementasi didasarkan pada instruksi baru dari pengguna.
