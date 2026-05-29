# Panduan Penggunaan Aplikasi ARQA Coffee — Untuk Admin

---

## 1. Cara Masuk ke Aplikasi

Ada 2 cara untuk masuk ke aplikasi ARQA Coffee sebagai Admin:

### 1.1 Masuk Cepat (Demo)

- Dari halaman awal, klik card bertuliskan **"Admin"**
- Anda akan langsung masuk dan diarahkan ke halaman Overview
- Cocok untuk mencoba fitur tanpa repot

### 1.2 Masuk dengan Email & Password

| Email             | Password |
| ----------------- | -------- |
| admin@arqa.coffee | admin123 |

- Masukkan alamat email dan password tersebut
- Klik tombol **"Masuk"**

---

## 2. Navigasi

Sebagai Admin, Anda memiliki **2 cara navigasi** untuk berpindah halaman:

### 2.1 Side Drawer (Menu Samping)

Klik icon **hamburger (☰)** di pojok kiri atas untuk membuka menu samping. Di dalamnya ada 10 menu:

| No  | Ikon | Nama Menu           | Fungsi                                               |
| --- | ---- | ------------------- | ---------------------------------------------------- |
| 1   | 📊   | **Overview**        | Halaman utama — ringkasan seluruh operasional kafe   |
| 2   | 👥   | **Kelola Pengguna** | Mengelola semua data pengguna termasuk admin         |
| 3   | 🍽️   | **Kelola Menu**     | Menambah, mengedit, menghapus menu makanan & minuman |
| 4   | 🪑   | **Kelola Meja**     | Mengelola data meja di kafe                          |
| 5   | 🏷️   | **Kelola Promo**    | Mengelola program promo dan diskon                   |
| 6   | 💰   | **Keuangan**        | Laporan keuangan lengkap dengan grafik               |
| 7   | 📦   | **Stok Bahan**      | Mengelola stok bahan baku                            |
| 8   | 💳   | **Pengeluaran**     | Mencatat dan mengelola pengeluaran kafe              |
| 9   | 📋   | **Pesanan Aktif**   | Melihat semua pesanan yang sedang berlangsung        |
| 10  | 📅   | **Presensi**        | Melihat absensi staff                                |

Klik **"Tutup"** atau klik area gelap di samping untuk menutup menu.

### 2.2 Bottom Nav (Menu Bawah Cepat)

Di bagian bawah layar terdapat 4 menu cepat untuk akses ke halaman yang paling sering digunakan:

| Ikon | Nama         | Fungsi                     |
| ---- | ------------ | -------------------------- |
| 📊   | **Overview** | Langsung ke halaman utama  |
| 🏷️   | **Promo**    | Langsung ke kelola promo   |
| 📅   | **Presensi** | Langsung ke absensi staff  |
| 👤   | **Profil**   | Lihat profil & keluar akun |

---

## 3. Overview — Halaman Utama

Setelah masuk, Anda akan melihat halaman **Overview**. Ini adalah pusat informasi yang menampilkan ringkasan seluruh operasional kafe.

### 3.1 Kartu Statistik (6 Kartu)

Di bagian atas terdapat 6 kartu statistik yang bisa diklik untuk melihat detail lebih lanjut:

| Kartu                    | Angka yang Ditampilkan                                   | Klik untuk ke Halaman        |
| ------------------------ | -------------------------------------------------------- | ---------------------------- |
| 💰 **Total Pendapatan**  | Jumlah pendapatan dari semua pesanan                     | Keuangan (tabel pendapatan)  |
| 💸 **Total Pengeluaran** | Jumlah pengeluaran kafe                                  | Keuangan (tabel pengeluaran) |
| 📋 **Pesanan Aktif**     | Jumlah pesanan yang sedang berlangsung                   | Pesanan Aktif                |
| 👷 **Pegawai**           | Jumlah seluruh staff (non-pelanggan)                     | Presensi                     |
| 🍽️ **Total Menu**        | Jumlah menu yang tersedia                                | Kelola Menu                  |
| 👥 **Pengguna**          | Jumlah total seluruh pengguna terdaftar (termasuk admin) | Kelola Pengguna              |

> **💡 Perbedaan dengan Manajer:** Kartu "Pegawai" di Admin menghitung **semua staff non-pelanggan** (termasuk yang belum check-in). Sedangkan di Manajer, kartu "Pegawai Aktif" hanya menghitung staff yang **sedang check-in**.

### 3.2 Peringatan Stok Menipis

Jika ada bahan baku yang stoknya sudah hampir habis, akan muncul kartu peringatan berwarna merah berisi daftar bahan yang perlu segera di-restock. Klik **"Selengkapnya"** untuk langsung ke halaman Stok Bahan.

### 3.3 Grafik Pendapatan

Grafik garis yang menunjukkan perkembangan pendapatan harian. Berguna untuk melihat tren penjualan.

### 3.4 Pesanan Terbaru

Menampilkan **6 pesanan terbaru** dari seluruh pesanan yang masuk. Setiap kartu menampilkan:

- Nomor pesanan + status (Menunggu / Dimasak / Siap Saji / Diantar / Selesai)
- Nomor meja (jika makan di tempat) atau alamat (jika delivery)
- Total harga

Klik **"Selengkapnya"** untuk melihat semua pesanan aktif.

### 3.5 Produk Terlaris

Menampilkan **5 menu paling laris** berdasarkan jumlah penjualan. Setiap produk dilengkapi dengan progress bar peringkat.

### 3.6 Status Meja

Menampilkan semua meja di kafe dalam bentuk grid:

- 🟢 **Hijau** — Meja tersedia
- 🔴 **Merah** — Meja sedang terisi

Klik salah satu meja untuk melihat detail dan pesanan di meja tersebut (tidak termasuk pesanan yang ditolak/dibatalkan).

---

## 4. Kelola Pengguna

Halaman ini menampilkan daftar **semua** pengguna aplikasi, **termasuk akun Admin**.

### Yang tampil di setiap kartu pengguna:

| Informasi       | Penjelasan                                                                           |
| --------------- | ------------------------------------------------------------------------------------ |
| **Avatar**      | Inisial nama (contoh: "A" untuk Andi)                                                |
| **Nama**        | Nama lengkap pengguna                                                                |
| **Email**       | Alamat email                                                                         |
| **No. Telepon** | Nomor telepon                                                                        |
| **Role**        | Jabatan (Admin, Manajer, Kasir, Koki, Kurir, Pelanggan) — dengan badge warna berbeda |

### Yang bisa Anda lakukan:

| Tombol                                  | Cara                          | Yang Terjadi                                                           |
| --------------------------------------- | ----------------------------- | ---------------------------------------------------------------------- |
| **✏️ Edit**                             | Klik icon pensil pada kartu   | Muncul jendela untuk mengubah nama, email, telepon, password, dan role |
| **🗑️ Hapus**                            | Klik icon tempat sampah       | Muncul konfirmasi, klik "Hapus" untuk menghapus pengguna               |
| **➕ Tambah Pengguna** (tombol di atas) | Klik tombol "Tambah Pengguna" | Muncul jendela untuk memasukkan data pengguna baru                     |

### Saat mengedit pengguna:

1. Klik **icon pensil** pada pengguna yang ingin diedit
2. Akan muncul jendela dengan form:
   - **Nama Lengkap** — ubah nama
   - **Email** — ubah alamat email
   - **No. Telepon** — ubah nomor telepon
   - **Password** — isi jika ingin mengganti password (kosongkan jika tidak diubah)
   - **Role** — pilih jabatan: **Admin**, Manajer, Kasir, Koki, Kurir, atau Pelanggan
3. Ada tombol **"Hapus"** (merah) dan **"Simpan"** (oranye)
4. Klik **"Simpan"** untuk menyimpan perubahan

> **⚠️ Berbeda dengan Manajer:** Admin bisa mengubah role seseorang menjadi **Admin**, melihat dan mengedit akun Admin lain, serta memiliki field **Password** di form edit. Manajer tidak bisa melakukan semua ini.

### Saat menambah pengguna baru:

1. Klik tombol **"Tambah Pengguna"**
2. Isi data berikut:
   - **Nama Lengkap** — nama pengguna
   - **Email** — alamat email (harus unik, belum dipakai)
   - **Password** — minimal 6 karakter (jika dikosongkan, otomatis "password123")
   - **No. Telepon** — nomor telepon
   - **Role** — pilih: Kasir, Juru Masak, Kurir, Manajer, atau Pelanggan
3. Klik **"Simpan"**

> **💡 Catatan:** Saat menambah pengguna baru, role **Admin** tidak tersedia di pilihan. Untuk menjadikan seseorang Admin, buat dulu dengan role lain, lalu edit setelahnya.

---

## 5. Kelola Menu

Halaman ini untuk mengelola daftar menu makanan dan minuman di kafe.

### Yang bisa Anda lakukan:

**Filter Kategori:**

- Klik dropdown filter untuk memilih: **Semua**, **Kopi**, **Non-Kopi**, **Makanan**, atau **Snack**

**Setiap kartu menu menampilkan:**

- Gambar menu
- Nama menu
- Kategori (tag kecil)
- Harga
- Tombol toggle tersedia/tidak tersedia

### Cara mengelola menu:

| Tombol                 | Cara                      | Yang Terjadi                                                             |
| ---------------------- | ------------------------- | ------------------------------------------------------------------------ |
| **🔘 Toggle Tersedia** | Klik tombol switch        | Mengubah status ketersediaan menu (tersedia/tidak tersedia)              |
| **✏️ Edit**            | Klik area kartu           | Muncul jendela untuk edit: ubah nama, deskripsi, gambar, harga, kategori |
| **🗑️ Hapus**           | Klik area kartu           | Muncul konfirmasi hapus                                                  |
| **➕ Tambah Menu**     | Klik tombol "Tambah Menu" | Muncul jendela untuk menambah menu baru                                  |

### Cara menambah menu baru:

1. Klik **"Tambah Menu"**
2. Isi data berikut:
   - **Nama Menu** — nama makanan/minuman
   - **Deskripsi** — penjelasan singkat
   - **Gambar** — bisa upload file atau tempel URL gambar
   - **Harga** — harga jual
   - **Kategori** — pilih: Kopi, Non-Kopi, Makanan, Snack
   - Jika kategori tidak ada, pilih **"+ Tambah Baru..."** untuk membuat kategori sendiri
3. Klik **"Simpan"**

---

## 6. Kelola Meja

Halaman ini untuk mengelola meja-meja di kafe.

### Yang tampil:

Grid meja dengan ikon kursi. Setiap meja menampilkan:

| Informasi      | Penjelasan                         |
| -------------- | ---------------------------------- |
| **Nomor Meja** | Nomor identitas meja               |
| **Kapasitas**  | Jumlah kursi (contoh: 4 kursi)     |
| **Status**     | 🟢 **Tersedia** atau 🔴 **Terisi** |
| **QR Code**    | Kode QR untuk scan pelanggan       |

### Yang bisa Anda lakukan:

| Tombol               | Cara                            | Yang Terjadi                                               |
| -------------------- | ------------------------------- | ---------------------------------------------------------- |
| **🔘 Toggle Status** | Klik tombol "Tersedia"/"Terisi" | Mengubah status meja                                       |
| **📱 QR**            | Klik tombol "QR"                | Menampilkan kode QR meja — bisa di-download sebagai gambar |
| **🗑️ Hapus**         | Klik icon tempat sampah         | Menghapus meja dari daftar (dengan konfirmasi)             |
| **➕ Tambah Meja**   | Klik tombol "Tambah Meja"       | Menambah meja baru secara otomatis                         |

### Melihat QR Code Meja:

1. Klik tombol **"QR"** pada meja
2. Akan muncul jendela dengan kode QR
3. Klik **"Download QR"** untuk menyimpan gambar QR
4. Cetak dan tempelkan QR di meja agar pelanggan bisa scan

---

## 7. Kelola Promo

Halaman ini untuk mengelola program promo dan diskon.

### Yang tampil:

Daftar promo dengan tampilan kartu berisi:

| Informasi        | Penjelasan                          |
| ---------------- | ----------------------------------- |
| **Gambar**       | Banner promo                        |
| **Judul**        | Nama promo                          |
| **Kode**         | Kode unik promo                     |
| **Diskon**       | Contoh: "25%" atau "Rp 10.000"      |
| **Periode**      | Tanggal mulai - tanggal selesai     |
| **Menu Berlaku** | Daftar menu yang mendapatkan diskon |
| **Status**       | 🟢 Aktif atau 🔴 Nonaktif           |

### Yang bisa Anda lakukan:

| Tombol              | Cara                       | Yang Terjadi                          |
| ------------------- | -------------------------- | ------------------------------------- |
| **🔘 Toggle Aktif** | Klik tombol switch         | Mengaktifkan atau menonaktifkan promo |
| **✏️ Edit**         | Klik icon pensil           | Mengubah data promo                   |
| **🗑️ Hapus**        | Klik icon tempat sampah    | Menghapus promo (dengan konfirmasi)   |
| **➕ Tambah Promo** | Klik tombol "Tambah Promo" | Menambah promo baru                   |

### Cara menambah promo baru:

1. Klik **"Tambah Promo"**
2. Isi data berikut:
   - **Judul Promo** — nama promo
   - **Kode Promo** — kode unik (misalnya: "DISKON25")
   - **Deskripsi** — penjelasan promo
   - **Jenis Diskon** — pilih **Persen (%)** atau **Nominal (Rp)**
   - **Nilai Diskon** — contoh: 25 (untuk 25%) atau 10000 (untuk Rp 10.000)
   - **Tanggal Mulai** — kapan promo berlaku
   - **Tanggal Selesai** — kapan promo berakhir
   - **Gambar** — upload gambar banner
   - **Pilih Menu** — centang menu yang berhak mendapat promo (kosongkan jika semua menu berlaku)
   - **Syarat & Ketentuan** — tulis syarat promo
3. Klik **"Simpan"**

---

## 8. Keuangan — Laporan Keuangan Lengkap

Halaman ini menampilkan laporan keuangan kafe secara detail dengan grafik dan tabel.

### Filter Tanggal:

- **Dari Tanggal** — pilih tanggal mulai (default: 7 hari terakhir)
- **Sampai Tanggal** — pilih tanggal akhir
- Data akan otomatis diperbarui saat tanggal diubah

### 5 Kartu Ringkasan:

| Kartu                    | Warna      | Penjelasan                                              |
| ------------------------ | ---------- | ------------------------------------------------------- |
| 💰 **Total Pendapatan**  | Hijau      | Jumlah pendapatan dari semua pesanan yang sudah dibayar |
| 💸 **Total Pengeluaran** | Merah      | Jumlah pengeluaran (bahan baku, gaji, operasional)      |
| 📊 **Rata-rata/Hari**    | Biru       | Pendapatan rata-rata per hari                           |
| 💎 **Laba Bersih**       | Hijau/Emas | Pendapatan - Pengeluaran                                |
| 📋 **Transaksi**         | Abu        | Jumlah transaksi                                        |

Klik setiap kartu untuk melihat tabel detail yang bisa dicetak.

### 3 Grafik:

| Grafik                   | Tipe              | Kegunaan                                                                  |
| ------------------------ | ----------------- | ------------------------------------------------------------------------- |
| **Detail Keuangan**      | 📊 Bar chart      | Membandingkan pendapatan vs pengeluaran per hari                          |
| **Kategori Pengeluaran** | 📊 Horizontal bar | Melihat pengeluaran per kategori (Bahan Baku, Operasional, Gaji, Lainnya) |
| **Arus Kas**             | 📊 Bar chart      | Arus kas harian (hijau = pemasukan, merah = pengeluaran)                  |

### Melihat Detail Pesanan:

- Klik **nominal** di tabel pendapatan untuk melihat detail pesanan
- Akan muncul jendela berisi informasi lengkap pesanan tersebut

### Mencetak Laporan:

Di setiap tabel detail (Pendapatan, Pengeluaran, Rata-rata, Laba, Transaksi) terdapat tombol **"Cetak"** untuk mencetak laporan tersebut.

---

## 9. Stok Bahan

Halaman ini untuk mengelola stok bahan baku kafe.

### Yang tampil:

Daftar bahan baku diurutkan dari yang stoknya paling menipis. Setiap item menampilkan:

| Informasi         | Penjelasan                                                                     |
| ----------------- | ------------------------------------------------------------------------------ |
| **Nama Bahan**    | Nama bahan baku                                                                |
| **Satuan**        | Contoh: kg, liter, pack, butir                                                 |
| **Stok Saat Ini** | Jumlah stok tersedia                                                           |
| **Stok Minimal**  | Batas minimum stok                                                             |
| **Progress Bar**  | 🟢 Hijau = aman, 🟡 Kuning = waspada, 🔴 Merah = kritis (dengan animasi kedip) |

### Yang bisa Anda lakukan:

| Tombol             | Cara                      | Yang Terjadi                                  |
| ------------------ | ------------------------- | --------------------------------------------- |
| **➕ (plus)**      | Klik tombol +             | Menambah stok sebanyak 5 unit                 |
| **➖ (minus)**     | Klik tombol -             | Mengurangi stok sebanyak 2 unit               |
| **✏️ Edit**        | Klik icon pensil          | Mengubah nama, satuan, stok, dan stok minimal |
| **🗑️ Hapus**       | Klik icon tempat sampah   | Menghapus bahan dari daftar                   |
| **➕ Tambah Stok** | Klik tombol "Tambah Stok" | Menambah bahan baru                           |

### Cara menambah stok baru:

1. Klik **"Tambah Stok"**
2. Isi data:
   - **Nama Bahan** — contoh: "Tepung Terigu"
   - **Satuan** — contoh: "kg"
   - **Stok Saat Ini** — jumlah stok awal
   - **Stok Minimal** — batas minimum
3. Klik **"Simpan"**

> **💡 Stok menipis:** Jika stok mencapai batas minimal, akan muncul animasi kedip merah dan notifikasi dikirim ke Admin & Manajer.

---

## 10. Pengeluaran

Halaman ini untuk mencatat semua pengeluaran kafe.

### Filter:

- **Kategori** — pilih: Semua, Operasional, Gaji, Lainnya
- **Tanggal** — filter dari tanggal sampai tanggal (default: 30 hari)
- **Cari** — ketik kata kunci

### Kartu Ringkasan:

| Kartu                    | Penjelasan                                |
| ------------------------ | ----------------------------------------- |
| 💸 **Total Pengeluaran** | Jumlah total pengeluaran periode terpilih |
| 📋 **Jumlah Transaksi**  | Berapa kali pengeluaran tercatat          |
| 📊 **Rata-rata/Hari**    | Rata-rata pengeluaran per hari            |

### Yang bisa Anda lakukan:

| Tombol                    | Cara                        | Yang Terjadi                                   |
| ------------------------- | --------------------------- | ---------------------------------------------- |
| **➕ Tambah Pengeluaran** | Klik tombol "+"             | Muncul jendela untuk mencatat pengeluaran baru |
| **✏️ Edit**               | Klik icon pensil pada kartu | Mengubah data pengeluaran                      |
| **🗑️ Hapus**              | Klik icon tempat sampah     | Menghapus catatan pengeluaran                  |

### Cara menambah pengeluaran:

1. Klik **"Tambah Pengeluaran"**
2. Isi data berikut:
   - **Tanggal** — pilih tanggal
   - **Jam** — pilih jam (opsional)
   - **Kategori** — pilih: Operasional, Gaji, Bahan Baku, Lainnya
   - **Volume** — jumlah barang (contoh: 5)
   - **Satuan** — contoh: kg, pack, box
   - **Harga Satuan** — harga per unit (total akan terisi otomatis)
   - **Total** — terisi otomatis dari volume × harga satuan
   - **Catatan** — keterangan pengeluaran
3. Klik **"Simpan"**

---

## 11. Pesanan Aktif

Halaman ini menampilkan semua pesanan yang sedang berlangsung di kafe.

### 5 Kartu Status:

| Kartu                | Warna  | Menghitung Pesanan dengan Status           |
| -------------------- | ------ | ------------------------------------------ |
| ⏳ **Menunggu**      | Kuning | Pesanan baru yang belum diproses           |
| 🔥 **Dimasak**       | Oranye | Pesanan sedang dimasak                     |
| ✅ **Siap Saji**     | Hijau  | Pesanan siap disajikan/diantar             |
| 🛵 **Diantar**       | Biru   | Pesanan sedang dalam perjalanan (delivery) |
| 📬 **Telah Diantar** | Abu    | Pesanan sudah sampai (menunggu setoran)    |

### Filter & Pencarian:

- **Dari Tanggal — Sampai Tanggal** — filter berdasarkan rentang tanggal
- **Cari** — ketik nomor pesanan, nama pelanggan, atau status

### Yang tampil di setiap kartu pesanan:

| Informasi         | Penjelasan                    |
| ----------------- | ----------------------------- |
| **Nomor Pesanan** | Kode unik pesanan             |
| **Status**        | Badge warna sesuai status     |
| **Status Bayar**  | 💳 Lunas / ❌ Belum Bayar     |
| **Tipe**          | Makan di Tempat / Delivery    |
| **Meja / Alamat** | Nomor meja atau alamat tujuan |
| **Pelanggan**     | Nama pemesan                  |
| **Items**         | Daftar menu yang dipesan      |
| **Promo**         | Diskon promo (jika ada)       |
| **Total**         | Jumlah tagihan                |

Klik kartu pesanan untuk melihat detail lengkap.

---

## 12. Presensi (Absensi Staff)

Halaman ini menampilkan status absensi seluruh staff (Manajer, Kasir, Koki, Kurir).

### Yang tampil di setiap kartu staff:

| Informasi  | Penjelasan                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------- |
| **Avatar** | Inisial nama                                                                                |
| **Nama**   | Nama staff                                                                                  |
| **Role**   | Jabatan                                                                                     |
| **Status** | 🟢 **Sedang Bekerja** (jam check-in) atau ⚪ **Offline** (belum check-in / sudah check-out) |
| **Lokasi** | Koordinat GPS saat check-in (jika ada)                                                      |

### Melihat Laporan Absensi:

1. Klik kartu staff yang ingin dilihat
2. Akan muncul jendela berisi:
   - **Kehadiran Hari Ini** — jam check-in dan check-out
   - **Ringkasan Bulan Ini** — total hari hadir dan total jam kerja
   - Riwayat absensi
3. Klik **"Tutup"** untuk menutup jendela

---

## 13. Profil

Klik tab **Profil** (icon orang) di bagian bawah.

### Yang bisa Anda lakukan:

- **Lihat data diri** — nama, email, nomor telepon
- **Keluar** — klik **"Keluar dari Akun"** untuk kembali ke halaman login

> **💡 Berbeda dengan Staff Lain:** Sebagai Admin, Anda **tidak memiliki fitur absen** check-in/check-out. Hanya staff (Manajer, Kasir, Koki, Kurir) yang bisa melakukan absensi geospasial.

---

## 14. Notifikasi

ARQA Coffee memiliki dua jenis notifikasi untuk memberi tahu Anda tentang perkembangan aplikasi.

### 14.1 Notifikasi Pop-up (Toast)

Notifikasi ini muncul sebagai kotak kecil di pojok kanan atas layar dan akan menghilang sendiri setelah beberapa detik. Ada 4 jenis:

| Jenis             | Warna  | Contoh                            |
| ----------------- | ------ | --------------------------------- |
| ✅ **Sukses**     | Hijau  | "Pesanan #xf3b4 berhasil dibuat!" |
| ⚠️ **Peringatan** | Kuning | "Stok menipis: Tepung Terigu"     |
| ❌ **Error**      | Merah  | "Gagal menyimpan data"            |
| ℹ️ **Info**       | Biru   | "Pengguna ditambahkan"            |

### 14.2 Notifikasi Lonceng (Notification Panel)

Di pojok kanan atas layar (di samping nama Anda) terdapat icon **lonceng**. Jika ada angka merah di atasnya, artinya ada notifikasi baru yang belum Anda baca.

Klik icon lonceng untuk membuka panel notifikasi. Berikut notifikasi yang akan Anda terima sebagai Admin:

| Kejadian                | Icon | Notifikasi yang Muncul                                        |
| ----------------------- | ---- | ------------------------------------------------------------- |
| Pesanan berhasil dibuat | 🛎️   | "Pesanan #xf3b4 berhasil dibuat. Status: Menunggu"            |
| Pesanan mulai dimasak   | 🔔   | "Status pesanan #xf3b4 berubah menjadi Dimasak"               |
| Pesanan siap saji       | 🔔   | "Pesanan #xf3b4 sudah siap!"                                  |
| Kurir mengambil pesanan | 🚚   | "Pesanan #xf3b4 sedang diantar oleh Kurir"                    |
| Pesanan selesai         | ✅   | "Pesanan #xf3b4 selesai"                                      |
| Pesanan ditolak kurir   | ⛔   | "Pesanan Ditolak Kurir — #xf3b4 — Alasan: Jarak terlalu jauh" |
| Pembayaran diterima     | 💳   | "Pembayaran #xf3b4 sebesar RpXX via QRIS/Tunai berhasil"      |
| Stok bahan menipis      | 📦   | "Stok menipis: Tepung Terigu (2 kg)"                          |

Notifikasi yang sudah Anda baca akan ditandai dan jumlahnya di icon lonceng akan berkurang. Panel notifikasi bisa ditutup dengan klik di luar panel atau klik icon lonceng lagi.

---

## 15. Tips Penting

- **Akses penuh ke semua pengguna** — Sebagai Admin, Anda bisa melihat, mengedit, dan menghapus akun siapa pun termasuk sesama Admin. Gunakan dengan bijak.
- **Tidak ada absensi** — Admin tidak memiliki fitur check-in/check-out. Hanya staff (Manajer, Kasir, Koki, Kurir) yang wajib absen.
- **Tambah Admin baru** — Saat membuat pengguna baru, role Admin tidak tersedia. Buat dulu dengan role lain, lalu edit setelahnya untuk mengubah ke Admin.
- **Stok menipis akan muncul di Overview** — Pantau Overview setiap hari untuk melihat bahan yang perlu di-restock.
- **Side drawer vs Bottom nav** — Side drawer berisi semua menu (10 menu), sedangkan bottom nav hanya 4 menu yang paling sering digunakan.
- **Filter tanggal** — Hampir semua halaman laporan (Keuangan, Pengeluaran, Pesanan Aktif) memiliki filter tanggal. Gunakan untuk melihat data periode tertentu.
- **Cetak laporan keuangan** — Di halaman Keuangan, klik kartu ringkasan lalu klik "Cetak" untuk print laporan detail.

---

## 16. Pertanyaan Umum (FAQ)

**Q: Apa bedanya Admin dengan Manajer?**
A: Admin memiliki akses **penuh** ke semua fitur termasuk mengelola akun Admin. Manajer tidak bisa melihat, mengedit, atau menghapus akun Admin. Juga, Admin tidak punya fitur absen check-in/check-out.

**Q: Bagaimana cara menambah Admin baru?**
A: Buat pengguna baru dengan role lain (misalnya Kasir), lalu edit pengguna tersebut dan ubah role-nya menjadi **Admin**.

**Q: Kenapa saya tidak bisa memilih role Admin saat tambah pengguna?**
A: Saat menambah pengguna baru, role Admin sengaja tidak disediakan untuk mencegah pembuatan akun Admin tanpa sengaja. Setelah pengguna dibuat, Anda bisa edit role-nya menjadi Admin.

**Q: Bagaimana cara melihat laporan keuangan?**
A: Buka side drawer lalu klik **Keuangan**. Anda bisa memilih rentang tanggal untuk melihat laporan pendapatan, pengeluaran, dan laba bersih.

**Q: Saya tidak punya tombol check-in di profil, kenapa?**
A: Sebagai Admin, Anda tidak memiliki fitur absensi. Hanya staff (Manajer, Kasir, Koki, Kurir) yang bisa check-in/check-out.

**Q: Bagaimana cara menambah menu baru?**
A: Buka **Kelola Menu** dari side drawer, klik tombol **"Tambah Menu"**, isi data menu, lalu klik **"Simpan"**.

**Q: Apakah saya bisa menghapus akun Admin lain?**
A: Ya, sebagai Admin Anda bisa menghapus akun siapa pun termasuk Admin lain. Tindakan ini tidak bisa dibatalkan.

**Q: Bagaimana cara mencatat pengeluaran?**
A: Buka **Pengeluaran** dari side drawer, klik **"Tambah Pengeluaran"**, isi kategori, jumlah, dan nominal, lalu klik **"Simpan"**.

**Q: Apakah saya bisa mencetak laporan?**
A: Ya. Di halaman **Keuangan**, klik kartu ringkasan (misalnya Total Pendapatan), lalu klik tombol **"Cetak"** untuk print laporan detail.

**Q: Bagaimana cara melihat status pesanan terkini?**
A: Buka **Pesanan Aktif** dari side drawer. Anda bisa melihat semua pesanan yang sedang berlangsung dan statusnya.

**Q: Kenapa ada notifikasi stok menipis?**
A: Sistem otomatis mendeteksi bahan baku yang stoknya mencapai batas minimal. Segera lakukan pemesanan bahan ke supplier.

**Q: Bagaimana cara melihat absensi staff?**
A: Buka **Presensi** dari side drawer. Klik nama staff untuk melihat laporan harian dan bulanan.

**Q: Bisakah saya mengubah role pengguna?**
A: Ya, buka **Kelola Pengguna**, klik **Edit** pada pengguna yang ingin diubah, lalu pilih role baru. Anda bisa mengubah role siapa pun termasuk menjadi Admin.
