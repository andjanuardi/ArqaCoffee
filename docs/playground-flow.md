# Panduan Penggunaan Aplikasi ARQA Coffee — Untuk Playground (Area Bermain)

---

## 1. Cara Masuk ke Aplikasi

Ada 2 cara untuk masuk ke aplikasi ARQA Coffee sebagai Playground:

### 1.1 Masuk Cepat (Demo)

- Dari halaman awal, klik card bertuliskan **"Playground"**
- Anda akan langsung masuk dan diarahkan ke halaman **Tiket**
- Cocok untuk mencoba fitur tanpa repot

### 1.2 Masuk dengan Email & Password

| Role       | Email                   | Password      |
| ---------- | ----------------------- | ------------- |
| Playground | playground@arqa.coffee  | playground123 |

- Masukkan alamat email dan password tersebut
- Klik tombol **"Masuk"**

---

## 2. Navigasi dan Tampilan Utama

Setelah berhasil masuk, Anda akan melihat **4 tab** di **bottom nav** (bagian bawah layar):

| Tab     | Icon          | Label        | Fungsi                                          |
| ------- | ------------- | ------------ | ----------------------------------------------- |
| Tiket   | 🎫            | **Tiket**    | Mengelola tiket bermain anak (aktif & riwayat)   |
| Laporan | 📊            | **Laporan**  | Laporan keuangan harian area bermain            |
| Stok    | 📦            | **Stok**     | Mengelola stok barang area bermain              |
| Profil  | 👤            | **Profil**   | Lihat data diri, absensi, dan keluar            |

---

## 3. Tiket — Mengelola Tiket Bermain

### 3.1 Check-in Gate

**PENTING:** Anda harus **check-in** terlebih dahulu sebelum bisa mengelola tiket. Jika belum check-in, akan muncul peringatan merah dengan tombol check-in.

### 3.2 Stat Cards

Di bagian atas terdapat 4 kartu statistik:

| Kartu                  | Warna  | Arti                                       |
| ---------------------- | ------ | ------------------------------------------ |
| 🔴 **Aktif**           | Merah  | Jumlah tiket yang sedang bermain           |
| 🟢 **Terjual**         | Hijau  | Jumlah tiket yang sudah selesai            |
| ⚪ **Dibatalkan**      | Abu    | Jumlah tiket yang dibatalkan               |
| 🟡 **Over Time**       | Kuning | Jumlah tiket yang melebihi waktu bermain   |

### 3.3 Daftar Tiket Aktif

Menampilkan semua tiket yang sedang aktif (sedang bermain), diurutkan dari yang paling awal habis.

Setiap kartu tiket menampilkan:

| Informasi            | Penjelasan                                                |
| -------------------- | --------------------------------------------------------- |
| **Nama Pelanggan**   | Nama orang tua/pemesan                                    |
| **Badge Status**     | 🟢 **Aktif** / 🟡 **Urgent** (<10 menit) / 🔴 **Over Time** |
| **Status Bayar**     | 💳 **Lunas** (hijau)                                      |
| **Anak-anak**        | Daftar nama anak yang bermain                             |
| **Pendamping**       | Jumlah pendamping dewasa                                  |
| **Durasi**           | Jumlah jam sewa                                           |
| **Progress Bar**     | Waktu bermain — hijau (aman), kuning (urgent), merah (habis) |
| **Countdown Timer**  | Hitung mundur waktu tersisa (live, update tiap detik)     |
| **Pesanan Tambahan** | Makanan/minuman yang dipesan (jika ada)                   |

### 3.4 Tombol Aksi per Tiket

| Tombol              | Warna  | Fungsi                                                    |
| ------------------- | ------ | --------------------------------------------------------- |
| **+Waktu**          | Biru   | Menambah durasi bermain (bayar tambahan)                  |
| **+Pesanan**        | Hijau  | Menambah pesanan makanan/minuman (bayar tambahan)         |
| **Selesaikan**      | Hijau  | Menyelesaikan tiket (hanya jika sudah Lunas)              |
| **Batalkan**        | Merah  | Membatalkan tiket (dengan alasan)                         |

### 3.5 Menambah Waktu (+Waktu)

1. Klik tombol **"+Waktu"**
2. Pilih durasi tambahan (1-3 jam)
3. Pilih metode pembayaran: **QRIS**, **Transfer**, atau **Tunai**
4. Total biaya tambahan akan dihitung otomatis
5. Klik **"Bayar & Tambah Waktu"**
6. Waktu bermain diperpanjang, riwayat transaksi tercatat

### 3.6 Menambah Pesanan (+Pesanan)

1. Klik tombol **"+Pesanan"**
2. Muncul grid makanan/minuman dari stok playground
3. Pilih item yang diinginkan, atur jumlah
4. Pilih metode pembayaran: **QRIS**, **Transfer**, atau **Tunai**
5. Klik **"Bayar & Tambah Pesanan"**
6. Item ditambahkan ke tiket, stok berkurang

### 3.7 Menyelesaikan Tiket

1. Klik tombol **"Selesaikan"**
2. Konfirmasi — jika ada waktu lebih (overtime), akan tercatat otomatis
3. Status tiket berubah menjadi **"Selesai"**
4. Tiket masuk ke riwayat

### 3.8 Membatalkan Tiket

1. Klik tombol **"Batalkan"**
2. Pilih alasan pembatalan dari dropdown:
   - Anak sudah selesai bermain
   - Anak rewel/menangis
   - Pindah ke tempat lain
   - Waktu sudah habis
   - Lainnya... (ketik alasan sendiri)
3. Klik **"Ya, Batalkan"**
4. Status tiket berubah menjadi **"Dibatalkan"**
5. Masuk ke riwayat dengan badge merah dan alasan

### 3.9 Riwayat Tiket

Di bagian bawah, terdapat bagian **"Riwayat"** yang bisa dibuka/tutup (collapsible).

- Filter tanggal untuk melihat tiket pada hari tertentu
- Menampilkan tiket yang **Selesai** atau **Dibatalkan**
- Setiap kartu menampilkan: nama pelanggan, status, overtime (jika ada), alasan batal, total

Klik kartu untuk melihat **detail lengkap**:
- Rincian biaya masuk (anak × harga/jam × jam + pendamping × harga/jam × jam)
- Biaya kaos kaki (jika ada)
- Pesanan makanan/minuman
- **Riwayat Transaksi Tambahan** — daftar transaksi seperti tambah waktu (+Waktu) dan tambah pesanan (+Pesanan), masing-masing menampilkan tipe (extra_time / extra_items), deskripsi, jumlah, metode bayar, dan waktu
- Total keseluruhan
- Metode pembayaran
- Tombol **"Cetak Invoice"**

---

## 4. Buat Tiket Baru

Klik tombol **"Buat Tiket"** di pojok kanan atas halaman Tiket untuk membuka wizard pembuatan tiket.

### Langkah 1: Data Pelanggan & Anak

| Field                  | Keterangan                                                   |
| ---------------------- | ------------------------------------------------------------ |
| **Nama Pelanggan**     | Nama orang tua/pemesan (wajib diisi)                         |
| **Daftar Anak**        | Tambah anak satu per satu dengan tombol **+**                |
|                        | Setiap anak: isi **Nama Anak**                               |
|                        | Centang **"Kaos Kaki"** per anak jika perlu (Rp 10.000/pasang) — setiap anak bisa berbeda pilihan |
| **Daftar Pendamping**  | Tambah pendamping dewasa dengan tombol **+** (opsional)      |
|                        | Setiap pendamping: isi **Nama Pendamping**                   |
| **Durasi**             | Pilih durasi sewa dengan tombol **+** / **-** (minimal 1 jam) |

### Langkah 2: Pesanan (Opsional)

- Klik tombol **"Pilih Pesanan"**
- Pilih makanan/minuman dari stok playground
- Klik item untuk menambah ke pesanan
- Atur jumlah dengan tombol **+** / **-**
- Item akan muncul di ringkasan

### Langkah 3: Ringkasan & Pembayaran

Ringkasan biaya:

| Komponen              | Perhitungan                                   |
| --------------------- | --------------------------------------------- |
| **Biaya Anak**        | Jumlah anak × Rp 20.000 × durasi (jam)        |
| **Biaya Pendamping**  | Jumlah pendamping × Rp 10.000 × durasi (jam)  |
| **Kaos Kaki**         | Jumlah anak dengan kaos kaki × Rp 10.000      |
| **Pesanan**           | Total harga makanan/minuman                   |
| **Total**             | Jumlah seluruh biaya                          |

Pilih metode pembayaran:

| Metode     | Langkah                                                             |
| ---------- | ------------------------------------------------------------------- |
| **QRIS**   | Scan kode QR → Klik **"Saya Sudah Bayar"** → Tiket langsung aktif  |
| **Transfer** | Transfer ke BCA 1234567890 a.n. ARQA Coffee → Klik **"Saya Sudah Transfer"** → Tiket langsung aktif |
| **Tunai**  | Klik **"Buat Tiket"** → Tiket langsung aktif                        |

### Yang Terjadi Setelah Tiket Dibuat:

- Tiket langsung aktif dengan status **Aktif**
- Waktu bermain mulai dihitung dari sekarang
- Stok kaos kaki dan pesanan berkurang otomatis
- Notifikasi jika ada stok menipis

---

## 5. Laporan Keuangan

Tab **Laporan** menampilkan rekap keuangan harian area bermain.

### Filter Tanggal

- Input tanggal untuk melihat laporan pada hari tertentu
- Default: hari ini

### 2 Kartu Ringkasan

| Kartu                        | Warna  | Arti                                     |
| ---------------------------- | ------ | ---------------------------------------- |
| 💵 **Total Tunai**           | Hijau  | Total pemasukan via pembayaran tunai     |
| 💳 **Total Digital**         | Oranye | Total pemasukan via QRIS/Transfer        |

### Tabel Detail

**Tabel Tunai:**
- Daftar transaksi tunai (tiket + tambahan waktu/pesanan yang dibayar tunai)
- Setiap baris: tanggal, jam, nama pelanggan, deskripsi, jumlah
- Klik baris untuk melihat detail tiket

**Tabel Digital:**
- Sama seperti tabel tunai, untuk pembayaran QRIS/Transfer

### Peringatan Stok

Jika ada stok barang yang menipis (jumlah ≤ batas minimum), akan muncul kartu peringatan merah.

### Grafik Pendapatan

Grafik **bar chart** yang menampilkan pendapatan area bermain 7 hari terakhir.

---

## 6. Stok Barang Playground

Tab **Stok** digunakan untuk mengelola inventaris area bermain (makanan, minuman, perlengkapan).

### Filter & Pencarian

- **Search Bar** — cari barang berdasarkan nama
- **Filter Kategori** — **Semua**, **Makanan**, **Minuman**, **Perlengkapan**

### Tampilan Stok

Barang diurutkan dari yang stoknya paling menipis. Setiap kartu menampilkan:

| Informasi          | Penjelasan                                |
| ------------------ | ----------------------------------------- |
| **Gambar**         | Foto barang (jika ada)                    |
| **Nama Barang**    | Nama item                                 |
| **Kategori**       | Makanan / Minuman / Perlengkapan          |
| **Harga Satuan**   | Harga jual per unit                       |
| **Stok Saat Ini**  | Jumlah stok tersedia                      |
| **Stok Minimal**   | Batas minimum stok                        |
| **Progress Bar**   | Hijau (aman) / Kuning (waspada) / Merah (kritis) |

### Aksi yang Tersedia

| Tombol             | Fungsi                                                     |
| ------------------ | ---------------------------------------------------------- |
| **➕ (plus)**      | Menambah stok (restock) — bisa dicatat sebagai pengeluaran |
| **➖ (minus)**     | Mengurangi stok secara manual                              |
| **✏️ Edit**        | Mengubah nama, kategori, harga, unit, stok, stok minimal   |
| **🗑️ Hapus**       | Menghapus barang (hanya jika stok = 0)                    |
| **➕ Tambah Barang** | Menambah barang baru ke stok                              |

### Cara Menambah Barang Baru

1. Klik **"Tambah Barang"**
2. Isi data:
   - **Nama Barang** — nama item
   - **Kategori** — Makanan / Minuman / Perlengkapan
   - **Satuan** — contoh: pcs, botol, pack
   - **Harga** — harga jual per unit
   - **Stok Minimal** — batas minimum
   - **Gambar** — upload foto (opsional)
3. Klik **"Simpan"**

### Cara Restock Barang

1. Klik tombol **➕** pada kartu barang
2. Masukkan jumlah yang ingin ditambahkan
3. Centang **"Catat sebagai pengeluaran"** jika biaya restock dicatat (akan muncul di laporan pengeluaran)
4. Klik **"Simpan"**

---

## 7. Profil dan Absensi

### Yang bisa Anda lakukan:

- **Lihat data diri** — nama, email, nomor telepon, avatar
- **Edit Profil** — ubah data diri

### Absensi Geospasial (Check-In / Check-Out)

Sebagai staff Playground, Anda wajib melakukan absensi berbasis lokasi:

**Check-In:**
1. Buka tab **Profil**
2. Klik **"Check In"**
3. Pastikan Anda berada dalam radius kafe
4. Status berubah menjadi **"Sedang Bekerja"**

> **⚠️ Tanpa Check-In, Anda tidak bisa mengelola tiket!**

**Check-Out:**
1. Klik **"Check Out"** jika sudah selesai bekerja

### Keluar dari Akun

- Klik **"Keluar"** untuk kembali ke halaman login

---

## 8. Alur Tiket Lengkap

### Skenario 1: Tiket Baru — Bayar QRIS

```
Buka Tiket → Klik "Buat Tiket" →
Isi nama pelanggan → Tambah anak (nama + kaos kaki opsional) →
Tambah pendamping (opsional) → Atur durasi →
Pilih pesanan (opsional) →
Pilih QRIS → Scan QR → Klik "Saya Sudah Bayar" →
Tiket Aktif → Timer mulai berjalan
```

### Skenario 2: Tambah Waktu

```
Tiket Aktif → Klik "+Waktu" →
Pilih durasi tambahan → Bayar (QRIS/Transfer/Tunai) →
Waktu diperpanjang → Timer direset
```

### Skenario 3: Selesai Bermain

```
Tiket Aktif → Klik "Selesaikan" →
Konfirmasi → (Jika overtime, tercatat otomatis) →
Tiket Selesai → Masuk Riwayat
```

### Skenario 4: Pembatalan

```
Tiket Aktif → Klik "Batalkan" →
Pilih alasan → Konfirmasi →
Tiket Dibatalkan → Masuk Riwayat
```

---

## 9. Notifikasi

### 9.1 Notifikasi Pop-up (Toast)

| Jenis             | Warna  | Contoh                                          |
| ----------------- | ------ | ----------------------------------------------- |
| ✅ **Sukses**     | Hijau  | "Tiket berhasil dibuat!"                        |
| ⚠️ **Peringatan** | Kuning | "Stok kaos kaki menipis!"                       |
| ❌ **Error**      | Merah  | "Stok tidak mencukupi"                          |
| ℹ️ **Info**       | Biru   | "Tiket dibatalkan"                              |

### 9.2 Notifikasi Stok

Anda akan mendapat notifikasi jika stok barang mencapai batas minimum.

---

## 10. Tips Penting

- **Check-in dulu sebelum mulai** — tanpa check-in, halaman Tiket tidak bisa diakses
- **Semua tiket PRE-PAID** — pembayaran dilakukan di awal sebelum anak mulai bermain
- **Kaos Kaki** — stok kaos kaki terpisah di kategori "Perlengkapan". Pantau stoknya!
- **Over Time** — jika anak belum selesai saat waktu habis, status berubah jadi "Over Time" dengan timer merah
- **Timer live** — waktu bermain update setiap detik, pantau di kartu tiket
- **Tambahan waktu/pesanan** — selalu catat sebagai transaksi terpisah di riwayat tiket
- **Stok terpisah dari kafe** — stok playground tidak terkait dengan stok bahan baku kafe
- **Laporan harian** — gunakan filter tanggal di tab Laporan untuk rekap harian
- **Cetak Invoice** — bisa mencetak struk detail dari modal detail tiket

---

## 11. Pertanyaan Umum (FAQ)

**Q: Kenapa saya tidak bisa melihat tiket?**
A: Anda harus **check-in** terlebih dahulu melalui tab **Profil**.

**Q: Berapa tarif sewa playground?**
A: Rp 20.000/jam per anak, Rp 10.000/jam per pendamping dewasa.

**Q: Apakah kaos kaki wajib?**
A: Tidak wajib, tapi bisa dibeli di tempat (Rp 10.000/pasang).

**Q: Bagaimana jika anak bermain lebih dari waktu yang dibayar?**
A: Tiket akan berstatus **"Over Time"** dengan timer merah. Anda bisa klik **"+Waktu"** untuk menambah durasi.

**Q: Bisakah menambah pesanan setelah tiket aktif?**
A: Ya. Klik **"+Pesanan"** pada kartu tiket untuk menambah makanan/minuman.

**Q: Bagaimana cara melihat detail keuangan?**
A: Buka tab **Laporan**, pilih tanggal, lihat tabel Tunai dan Digital.

**Q: Bagaimana cara menambah stok barang?**
A: Buka tab **Stok**, klik **➕** pada barang yang ingin di-restock.

**Q: Apakah stok playground terhubung dengan stok kafe?**
A: Tidak. Stok playground terpisah dan dikelola sendiri.

**Q: Bisakah saya membatalkan tiket yang sudah selesai?**
A: Tidak. Tiket yang sudah selesai tidak bisa dibatalkan lagi.

**Q: Bagaimana cara cetak struk tiket?**
A: Klik kartu tiket di riwayat, lalu klik **"Cetak Invoice"** di modal detail.

---

_Dokumen ini dibuat untuk membantu staff Playground dalam menggunakan aplikasi ARQA Coffee._
