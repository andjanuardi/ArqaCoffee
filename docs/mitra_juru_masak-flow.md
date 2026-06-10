# Panduan Penggunaan Aplikasi ARQA Coffee — Untuk Mitra Juru Masak

---

## 1. Cara Masuk ke Aplikasi

Ada 2 cara untuk masuk ke aplikasi ARQA Coffee sebagai Mitra Juru Masak:

### 1.1 Masuk Cepat (Demo)

- Dari halaman awal, klik card bertuliskan **"Mitra Juru Masak"**
- Anda akan langsung masuk dan diarahkan ke halaman **Antrian**
- Cocok untuk mencoba fitur tanpa repot

### 1.2 Masuk dengan Email & Password

| Role            | Email             | Password |
| --------------- | ----------------- | -------- |
| Mitra Juru Masak | mitra@arqa.coffee | mitra123 |

- Masukkan alamat email dan password tersebut
- Klik tombol **"Masuk"**

### 1.3 Daftar Sebagai Mitra Baru

Jika Anda belum memiliki akun, Anda bisa mendaftar melalui halaman login:

1. Klik tombol **"Daftar Sebagai Mitra"** di halaman login
2. Pilih role: **Mitra Juru Masak**
3. Isi data berikut:
   - **Nama Lengkap** — nama Anda
   - **Nama Bisnis** — nama usaha Anda (wajib untuk Mitra Juru Masak)
   - **Email** — alamat email (harus unik)
   - **Nomor Telepon** — nomor telepon
   - **Alamat** — alamat usaha
4. **Atur Posisi Simulasi** — geser marker di peta ke lokasi usaha Anda:
   - Peta satellite akan muncul
   - **Seret marker** (icon chef berwarna pink) ke posisi usaha Anda
   - Posisi ini akan digunakan **kurir** untuk mengambil pesanan dari Anda
   - Bisa diatur nanti oleh Admin jika perlu perubahan
5. Klik **"Kirim Pendaftaran"**
6. Status pendaftaran menjadi **"Menunggu Persetujuan"**
7. Admin akan menyetujui atau menolak pendaftaran Anda
8. Jika disetujui, Anda bisa login menggunakan email dengan password default **123456**

---

## 2. Navigasi dan Tampilan Utama

Setelah berhasil masuk, Anda akan melihat **5 tab** di **bottom nav** (bagian bawah layar):

| Tab        | Icon            | Label            | Fungsi                                              |
| ---------- | --------------- | ---------------- | --------------------------------------------------- |
| Antrian    | 🔥              | **Antrian**      | Melihat item pesanan Anda yang perlu dimasak        |
| Riwayat    | ⏳              | **Riwayat**      | Melihat pesanan yang sudah selesai/ditolak          |
| Kelola Menu | 🍽️             | **Kelola Menu**  | Mengelola menu makanan Anda sendiri                 |
| Laporan    | 📊              | **Laporan**      | Laporan keuangan pendapatan Anda                    |
| Profil     | 👤              | **Profil**       | Lihat data diri, absensi, posisi, dan keluar        |

> **💡 Berbeda dengan Juru Masak biasa:** Mitra Juru Masak adalah **mitra/partner** yang memasak menu mereka sendiri. Anda hanya melihat item MILIK ANDA di antrian, bukan semua pesanan kafe.

---

## 3. Antrian — Item yang Perlu Dimasak

### 3.1 Check-in Gate

**PENTING:** Anda harus **check-in** terlebih dahulu sebelum bisa melihat antrian. Jika belum check-in, akan muncul peringatan dengan tombol check-in.

### 3.2 Tampilan Antrian

Antrian hanya menampilkan item menu **milik Anda sendiri** (yang Anda daftarkan melalui Kelola Menu). Item dari juru masak lain atau menu kafe tidak akan muncul.

**Stat Cards (2 kartu di atas):**

| Stat                 | Warna  | Arti                                            |
| -------------------- | ------ | ----------------------------------------------- |
| Angka **Menunggu**   | Kuning | Jumlah item Anda yang belum dimasak             |
| Angka **Dimasak**    | Oranye | Jumlah item Anda yang sedang dimasak            |

### 3.3 Kartu Item

Setiap item yang perlu Anda proses ditampilkan sebagai kartu:

| Elemen                | Keterangan                                  |
| --------------------- | ------------------------------------------- |
| **Badge Status**      | "Menunggu" (kuning) atau "Dimasak" (oranye) |
| **#ID Pesanan**       | 5 karakter terakhir                         |
| **Nama Pelanggan**    | Nama pemesan                                |
| **Waktu**             | Jam masuk pesanan                           |
| **Tipe + Meja**       | "Meja 3" untuk dine-in, "Delivery" untuk antar |
| **Nama Menu x Jumlah** | Contoh: "Nasi Goreng Spesial x2"           |
| **Harga Item**        | Total harga per item                        |
| **Catatan**           | Catatan khusus (jika ada)                   |
| **Biaya Jasa Aplikasi** | Potongan fee platform (ditampilkan merah) |

### 3.4 Aksi pada Item

| Status                 | Tombol             | Fungsi                                      |
| ---------------------- | ------------------ | ------------------------------------------- |
| **Menunggu**           | ✅ **Masak**       | Menandai item sedang dimasak                |
| **Menunggu**           | ❌ **Tolak**       | Menolak item (dengan alasan)                |
| **Dimasak**            | 🟢 **Siap Saji**   | Menandai item siap saji                     |

> **💡 Saat Anda klik "Masak" atau "Siap Saji", item akan tercatat sebagai "claim" Anda (claimed_by = nama Anda). Ini penting untuk perhitungan laporan keuangan.**

### 3.5 Menolak Pesanan

1. Klik **"Tolak"** pada item
2. Pilih alasan dari dropdown
3. Klik **"Tolak Pesanan"**

**Yang terjadi:**
- Hanya item ANDA yang ditolak — item mitra lain atau menu kafe tetap diproses
- Jika dalam satu pesanan ada item dari mitra lain, pesanan tetap berjalan
- Notifikasi dikirim ke pelanggan dan kasir

---

## 4. Riwayat Pesanan

Tab **Riwayat** menampilkan pesanan yang sudah selesai atau ditolak yang mengandung item Anda.

### Filter Tanggal

- Input tanggal untuk filter (default: hari ini)
- Tombol **X** untuk reset

### Yang tampil di setiap kartu:

| Informasi             | Penjelasan                                    |
| --------------------- | --------------------------------------------- |
| **#ID Pesanan**       | 5 karakter terakhir                          |
| **Status**            | Badge: Selesai (abu) / Ditolak (merah) / Siap Saji |
| **Status Pembayaran Mitra** | 🟢 **Dibayar** / 🟡 **Menunggu Setoran** |
| **Tipe Pesanan**      | "Dine-In" atau "Delivery"                     |
| **Pelanggan**         | Nama pemesan + meja                           |
| **Item**              | Ringkasan item Anda                           |
| **Total Pendapatan**  | Pendapatan bersih Anda (setelah potong fee)   |

### Detail Pesanan (Modal)

Klik kartu untuk melihat detail lengkap:
- Rincian item Anda: subtotal, pajak, biaya jasa aplikasi
- **Total Pembayaran** — jumlah bersih yang akan Anda terima
- **Status Payout** — sudah dibayar atau masih menunggu setoran dari kasir
- **Metode Pembayaran** — QRIS / Transfer Bank / Tunai
- **Status Bayar** — Lunas / Belum Bayar

### Cetak Invoice Mitra

Untuk pesanan yang sudah selesai (tidak ditolak), Anda bisa mencetak invoice sendiri:
1. Klik kartu pesanan di tab **Riwayat**
2. Di modal detail, klik tombol **"Cetak Invoice"**
3. Browser akan membuka jendela baru dengan tampilan invoice mitra
4. Invoice menampilkan: nama bisnis, item yang dipesan, subtotal, pajak, biaya layanan, total pembayaran, status payout

---

## 5. Kelola Menu

Tab ini digunakan untuk mendaftarkan dan mengelola menu **milik Anda sendiri**.

### Yang ditampilkan:

**Menu Menunggu Persetujuan:**
- Menu baru yang Anda daftarkan dan belum disetujui Admin
- Tombol **"Batalkan"** untuk membatalkan pengajuan

**Menu Aktif:**
- Menu yang sudah disetujui Admin dan tersedia untuk pelanggan
- Filter kategori: **Semua**, **Kopi**, **Non-Kopi**, **Makanan**, **Snack**
- Setiap kartu: gambar, nama, kategori, harga, toggle tersedia/tidak tersedia

### Yang bisa Anda lakukan:

| Tombol               | Fungsi                                                    |
| -------------------- | --------------------------------------------------------- |
| **➕ Tambah Menu**   | Mendaftarkan menu baru — **harus disetujui Admin dulu**   |
| **✏️ Edit**          | Mengubah nama, deskripsi, gambar, harga, kategori         |
| **🗑️ Hapus**         | Menghapus menu                                             |
| **🔘 Toggle**        | Mengaktifkan/nonaktifkan ketersediaan menu                |

### Cara menambah menu baru:

1. Klik **"Tambah Menu"**
2. Isi data:
   - **Nama Menu**
   - **Deskripsi**
   - **Gambar** — upload atau URL
   - **Harga**
   - **Kategori**
3. Klik **"Simpan"**
4. **PENTING:** Menu baru akan memiliki status **"Menunggu Persetujuan"** — Admin harus menyetujui dulu sebelum muncul di pelanggan
5. Banner peringatan: *"Menu baru akan dikirim ke Admin untuk persetujuan terlebih dahulu."*

---

## 6. Laporan Keuangan

Tab **Laporan** menampilkan pendapatan Anda sebagai Mitra Juru Masak.

### Filter Tanggal

- Input tanggal (default: hari ini)

### 3 Kartu Ringkasan (bisa diklik)

| Kartu                          | Warna  | Arti                                               |
| ------------------------------ | ------ | -------------------------------------------------- |
| 💰 **Total Pendapatan**        | Hijau  | Total pendapatan kotor dari item Anda               |
| 💸 **Total Pengeluaran**       | Merah  | Total potongan (pajak + biaya jasa aplikasi)        |
| 💎 **Total Laba Bersih**       | Biru   | Pendapatan bersih setelah potongan                  |

Klik setiap kartu untuk melihat **tabel detail**:

**Tabel Pendapatan:**
- Per-order: ID pesanan, item, jumlah pendapatan

**Tabel Pengeluaran:**
- Per-order: subtotal, pajak, fee, total pengeluaran

**Tabel Laba:**
- Per-order: pendapatan - pengeluaran = laba bersih

### Default View (tanpa klik kartu)

- **Menu Terlaris** — 5 menu Anda yang paling laris
- **Pesanan Terbaru** — daftar pesanan terakhir dengan status payout

### Status Payout

Setiap pesanan menampilkan status pembayaran mitra:
- 🟢 **Dibayar** — kasir sudah menyetorkan pendapatan Anda
- 🟡 **Menunggu Setoran** — pesanan sudah dibayar pelanggan, menunggu kasir menyetorkan ke Anda

---

## 7. Profil

### Yang bisa Anda lakukan:

- **Lihat data diri** — nama, **nama bisnis**, email, nomor telepon
- **Edit Profil** — ubah data diri

### Absensi (Check-In / Check-Out)

Berbeda dengan staff lain, check-in Mitra **tidak menggunakan GPS** — cukup klik tombol:

**Check-In:**
1. Buka tab **Profil** atau tab **Antrian**
2. Klik **"Check In"**
3. Status berubah menjadi **"Sedang Bekerja"**

> **💡 Setelah check-in, menu Anda akan muncul dan bisa dipesan oleh pelanggan.**
>
> **⚠️ Jika tidak check-in, menu Anda tidak akan terlihat oleh pelanggan!**

**Check-Out:**
1. Klik **"Check Out"** jika sudah selesai

### Posisi Mitra (Pengambilan)

Posisi Anda digunakan kurir untuk mengambil pesanan. **Posisi diatur saat pendaftaran** — bukan dari profil.

Jika ingin mengubah posisi setelah terdaftar, hubungi Admin untuk memperbarui data.

> **💡 Kurir akan melihat posisi Anda di peta saat mengambil pesanan untuk diantar ke pelanggan.**

### Keluar dari Akun

- Klik **"Keluar"** untuk kembali ke halaman login

---

## 8. Alur Pesanan Lengkap (Dari Sisi Mitra)

### Skenario 1: Memasak Pesanan

```
Check-in → Menu tersedia untuk pelanggan →
Pelanggan pesan menu Anda → Muncul di Antrian →
Klik "Masak" → Item sedang dimasak →
Klik "Siap Saji" → Item siap →
Kurir ambil / diantar ke meja → Selesai
```

### Skenario 2: Mendaftar Sebagai Mitra Baru

```
Buka halaman login → Klik "Daftar Sebagai Mitra" →
Pilih "Mitra Juru Masak" → Isi data diri & nama bisnis →
Geser marker peta ke lokasi usaha →
Klik "Kirim Pendaftaran" →
Admin menyetujui → Login dengan email & password 123456
```

### Skenario 3: Mendaftarkan Menu Baru

```
Buka Kelola Menu → Klik "Tambah Menu" →
Isi data menu → Klik "Simpan" →
Status: Menunggu Persetujuan Admin →
Admin menyetujui → Menu aktif dan bisa dipesan
```

### Skenario 4: Menolak Pesanan

```
Item di Antrian (Menunggu) → Klik "Tolak" →
Pilih alasan → Konfirmasi →
Hanya item Anda yang ditolak →
Item mitra lain tetap diproses
```

---

## 9. Alur Pembayaran Mitra

```
1. Pelanggan pesan menu Anda → Bayar ke ARQA
2. ARQA potong: Pajak 10% + Biaya Jasa Aplikasi (fee)
3. Sisa = Pendapatan Anda (tampil di Laporan)
4. Kasir akan menyetorkan ke Anda (Payout)
5. Status berubah: "Menunggu Setoran" → "Dibayar"
```

### Komponen Biaya:

| Komponen                | Persentase     | Keterangan                        |
| ----------------------- | -------------- | --------------------------------- |
| **Pendapatan Kotor**    | 100%           | Total harga item yang dipesan     |
| **Pajak**               | ~10%           | Pajak per item (jika ada)        |
| **Biaya Jasa Aplikasi** | ~5%            | Fee platform ARQA Coffee          |
| **Pendapatan Bersih**   | ~85%           | Yang Anda terima                  |

---

## 10. Notifikasi

### 10.1 Notifikasi Pop-up (Toast)

| Jenis             | Warna  | Contoh                                          |
| ----------------- | ------ | ----------------------------------------------- |
| ✅ **Sukses**     | Hijau  | "Status diupdate: Dimasak"                      |
| ⚠️ **Peringatan** | Kuning | "Pesanan sudah diproses, tidak bisa ditolak"    |
| ℹ️ **Info**       | Biru   | "Pesanan ditolak: Bahan habis"                  |

### 10.2 Notifikasi Lonceng

Mitra menerima notifikasi untuk:
- Status pesanan berubah
- Pembayaran/payout diterima

---

## 11. Tips Penting

- **Check-in setiap hari** — tanpa check-in, menu Anda tidak terlihat oleh pelanggan dan antrian tidak bisa diakses
- **Daftarkan menu Anda** — gunakan Kelola Menu untuk menambah menu. Setiap menu baru butuh persetujuan Admin
- **Fee platform** — setiap transaksi dipotong biaya jasa aplikasi (cek Tarif di pengaturan Admin)
- **Simpan posisi** — atur posisi Anda di peta agar kurir tahu lokasi pengambilan
- **Pantau Laporan** — cek tab Laporan untuk melihat pendapatan dan status payout
- **Payout ke Kasir** — jika status "Menunggu Setoran", koordinasi dengan kasir untuk penyetoran
- **Hanya item Anda** — antrian hanya menampilkan item menu Anda, bukan semua pesanan kafe
- **Penolakan parsial** — jika Anda menolak, hanya item Anda yang ditolak. Pesanan tetap berjalan untuk item lain
- **Menu tidak bisa diedit saat menunggu persetujuan** — tunggu Admin menyetujui atau batalkan pengajuan

---

## 12. Pertanyaan Umum (FAQ)

**Q: Kenapa antrian saya kosong?**
A: Pastikan Anda sudah **check-in**. Jika sudah, mungkin belum ada pelanggan yang memesan menu Anda.

**Q: Kenapa menu saya tidak muncul di pelanggan?**
A: Mungkin karena: (1) Anda belum check-in, (2) Admin belum menyetujui menu Anda, atau (3) menu sedang tidak aktif.

**Q: Bagaimana cara menambah menu?**
A: Buka tab **Kelola Menu**, klik **"Tambah Menu"**, isi data, lalu tunggu persetujuan Admin.

**Q: Berapa lama persetujuan menu?**
A: Tergantung Admin. Anda bisa menghubungi Admin untuk mempercepat.

**Q: Bagaimana cara tahu menu saya sudah disetujui?**
A: Menu akan pindah dari bagian "Menunggu Persetujuan" ke "Menu Aktif".

**Q: Kapan saya dibayar?**
A: Setelah pesanan selesai dan pelanggan membayar, kasir akan menyetorkan pendapatan Anda. Status bisa dilihat di tab **Laporan**.

**Q: Kenapa pendapatan saya berbeda dari harga menu?**
A: Karena ada potongan **pajak** dan **biaya jasa aplikasi** (fee platform). Rincian ada di tab Laporan.

**Q: Bagaimana cara menolak pesanan?**
A: Klik **"Tolak"** pada item yang masih "Menunggu", pilih alasan, konfirmasi.

**Q: Apakah jika saya menolak, semua pesanan dibatalkan?**
A: Tidak. Hanya item **Anda** yang ditolak. Item mitra lain atau menu kafe tetap diproses.

**Q: Bagaimana cara mengatur posisi untuk kurir?**
A: Buka tab **Profil**, geser marker di peta ke lokasi Anda, klik **"Simpan"**.

**Q: Apa yang terjadi jika saya lupa check-out?**
A: Buka tab **Profil** dan klik **"Check Out"**. Sistem akan mencatat waktu saat itu.

---

_Dokumen ini dibuat untuk membantu Mitra Juru Masak dalam menggunakan aplikasi ARQA Coffee._
