# Panduan Penggunaan Aplikasi ARQA Coffee — Untuk Pelayan (Waiter)

---

## 1. Cara Masuk ke Aplikasi

Ada 2 cara untuk masuk ke aplikasi ARQA Coffee sebagai Pelayan:

### 1.1 Masuk Cepat (Demo)

- Dari halaman awal, klik card bertuliskan **"Pelayan"**
- Anda akan langsung masuk dan diarahkan ke halaman **Menu**
- Cocok untuk mencoba fitur tanpa repot

### 1.2 Masuk dengan Email & Password

| Role   | Email             | Password |
| ------ | ----------------- | -------- |
| Pelayan | waiter@arqa.coffee | waiter123 |

- Masukkan alamat email dan password tersebut
- Klik tombol **"Masuk"**

---

## 2. Navigasi dan Tampilan Utama

Setelah berhasil masuk, Anda akan melihat **4 tab** di **bottom nav** (bagian bawah layar):

| Tab       | Icon          | Label         | Fungsi                                            |
| --------- | ------------- | ------------- | ------------------------------------------------- |
| Menu      | 🍽️            | **Menu**      | Melihat daftar menu dan menambah ke keranjang     |
| Keranjang | 🛍️            | **Keranjang** | Melihat ringkasan pesanan, pilih meja & bayar     |
| Pesanan   | 📋            | **Pesanan**   | Melihat pesanan yang perlu diantarkan ke meja     |
| Profil    | 👤            | **Profil**    | Lihat data diri, absensi geospasial, dan keluar   |

Tab **Keranjang** akan menampilkan **titik merah** jika ada item di keranjang.

---

## 3. Menu — Melihat dan Memilih Menu

Tab **Menu** adalah halaman utama kerja Pelayan. **PENTING:** Anda harus **check-in** terlebih dahulu sebelum bisa mengakses menu.

### 3.1 Check-in Gate

Jika Anda belum check-in hari ini, akan muncul kartu peringatan merah:
- **"Anda Belum Check-in"**
- Tombol **"Check-in"** akan membuka modal absensi geospasial
- Menu tidak bisa diakses sampai Anda check-in

### 3.2 Setelah Check-in

Setelah check-in, Anda akan melihat:

**Search Bar:**
- Kolom pencarian untuk mencari menu berdasarkan nama

**Promo Carousel:**
- Banner promo yang bergulir otomatis setiap 5 detik
- Klik promo untuk melihat detail dan bisa memakainya
- Jika ada promo aktif, akan muncul banner hijau dengan tombol **"Batalkan"**

**Category Chips:**
5 filter kategori: **Semua**, **Kopi**, **Non-Kopi**, **Makanan**, **Snack**

**Grid Menu (2 kolom):**
- Hanya menampilkan menu yang tersedia
- Menu dari Mitra (partner) ditandai dengan badge nama bisnis
- Menu yang eligible promo memiliki badge **"Diskon"** hijau
- Klik card menu untuk melihat detail

### 3.3 Detail Menu & Tambah ke Keranjang

1. Klik card menu
2. Akan muncul jendela detail:
   - Gambar menu
   - Nama, deskripsi, harga
   - Diskon (jika ada promo aktif)
   - Kolom **Catatan** (misal: kurang gula, ekstra es)
   - Tombol **+ / -** untuk mengatur jumlah
3. Klik **"Tambah ke Keranjang"**
4. Item masuk ke keranjang, muncul notifikasi sukses

---

## 4. Keranjang Belanja

Klik tab **Keranjang** (icon 🛍️) untuk melihat pesanan yang akan dibuat.

### Yang tampil di keranjang:

**Item Pesanan:**
- Gambar item, nama, harga
- Badge pajak (jika item kena pajak)
- Tombol **+ / -** untuk mengubah jumlah
- Tombol **Hapus** (icon tempat sampah)
- Kolom catatan per item

**Ringkasan:**
- **Subtotal** — total harga sebelum pajak & diskon
- **Diskon Promo** — jika ada promo aktif
- **Pajak** — pajak per item (jika item memiliki persentase pajak)
- **Total** — jumlah akhir

### Pilih Meja (Wajib)

Sebagai Pelayan, Anda **harus** memilih meja untuk pelanggan:

| Cara              | Langkah                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| **Pilih Manual**  | Klik **"Pilih Meja"** → pilih meja yang tersedia (hijau) dari daftar    |
| **Ganti Meja**    | Jika sudah pilih meja, klik **"Ganti"** untuk memilih meja lain         |

Meja yang sudah terisi (occupied) akan berwarna abu-abu/merah dan tidak bisa dipilih.

### Pilih Cara Bayar

**Bayar Sekarang:**
- Pilih metode: **QRIS**, **Transfer Bank**, atau **Tunai**
- Klik **"Proses Pesanan"** untuk melanjutkan

**Bayar Nanti:**
- Pelanggan bayar langsung ke kasir
- Status pembayaran akan **"Belum Bayar"**
- Klik **"Pesan Sekarang, Bayar Nanti"**

### Konfirmasi Pesanan

1. Klik tombol pesan
2. Muncul jendela konfirmasi berisi:
   - Daftar item yang dipesan
   - Nomor meja
   - Total harga (termasuk diskon & pajak)
3. Klik **"Pesan Sekarang"** untuk mengirim pesanan
4. Pesanan masuk ke dapur dengan status **"Menunggu"**

---

## 5. Pesanan — Mengelola Pesanan Meja

Tab **Pesanan** menampilkan semua pesanan yang perlu Anda layani.

### Filter Tanggal

- Input tanggal untuk melihat pesanan pada hari tertentu
- Default: hari ini

### Yang tampil di setiap kartu pesanan:

| Informasi         | Penjelasan                             |
| ----------------- | -------------------------------------- |
| **#ID Pesanan**   | 5 karakter terakhir                   |
| **Status**        | Badge warna (Menunggu/Dimasak/dll)    |
| **Tanggal & Jam** | Waktu pesanan dibuat                  |
| **Meja**          | Nomor meja pelanggan                  |
| **Item**          | Daftar menu x jumlah                  |
| **Total**         | Jumlah tagihan                        |

### Aksi per Status Pesanan

| Status       | Tombol Aksi          | Fungsi                                                     |
| ------------ | -------------------- | ---------------------------------------------------------- |
| **Menunggu** | ❌ **Batal Pesanan** | Membatalkan pesanan (dengan alasan) — hanya jika menunggu  |
| **Siap Saji** (dine-in) | 🍽️ **Antarkan** | Menandai pesanan sudah diantarkan ke meja pelanggan |
| **Telah Diantar** + Lunas | ✅ **Selesaikan** | Menyelesaikan pesanan, meja kembali tersedia |

Klik kartu pesanan untuk melihat **detail lengkap** (item, diskon, ongkir, pajak, total, metode & status bayar, cetak invoice).

### Riwayat Pesanan

Di bagian bawah tab Pesanan, terdapat riwayat pesanan yang sudah **Selesai**, **Ditolak**, atau **Dibatalkan**. Klik kartu untuk melihat detail.

---

## 6. Profil dan Absensi

Klik tab **Profil** (icon 👤) di bagian bawah.

### Yang bisa Anda lakukan:

- **Lihat data diri** — nama, email, nomor telepon, avatar
- **Edit Profil** — ubah nama, email, telepon, alamat, password

### Absensi Geospasial (Check-In / Check-Out)

Sebagai Pelayan, Anda wajib melakukan absensi berbasis lokasi:

**Check-In:**
1. Buka tab **Profil**
2. Peta akan muncul dengan marker yang bisa digeser
3. Pastikan Anda **berada dalam radius 200 meter** dari kafe
4. Klik **"Check In"**
5. Status berubah menjadi **"Sedang Bekerja"**

**Check-Out:**
1. Jika sudah check-in, akan muncul kartu **"Sedang Bekerja"**
2. Klik **"Check Out"**
3. Absensi selesai

> **⚠️ Tanpa Check-In, Anda tidak bisa mengakses menu!** Pastikan check-in setiap hari sebelum mulai bekerja.

### Keluar dari Akun

- Klik **"Keluar"** untuk kembali ke halaman login

---

## 7. Alur Pesanan Lengkap (Dari Sisi Pelayan)

### Skenario 1: Makan di Tempat — Bayar Sekarang (QRIS/Transfer)

```
Check-in → Buka Menu → Pilih item → Tambah ke Keranjang →
Pilih Meja → Pilih "Bayar Sekarang" → Pilih QRIS/Transfer →
Konfirmasi Pesanan → Pesanan ke Dapur (Menunggu) →
Dapur Masak → Siap Saji →
Klik "Antarkan" → Antarkan ke Meja →
Klik "Selesaikan" → Pesanan Selesai
```

### Skenario 2: Makan di Tempat — Bayar Nanti

```
Check-in → Buka Menu → Pilih item → Tambah ke Keranjang →
Pilih Meja → Pilih "Bayar Nanti" →
Konfirmasi Pesanan → Pesanan ke Dapur (Menunggu) →
Dapur Masak → Siap Saji →
Klik "Antarkan" → Antarkan ke Meja →
Pelanggan bayar ke Kasir →
Klik "Selesaikan" → Pesanan Selesai
```

### Skenario 3: Pesanan Dibatalkan

```
Pesanan masih Menunggu → Klik "Batal Pesanan" →
Pilih alasan → Konfirmasi →
Pesanan Dibatalkan → Masuk Riwayat
```

### Diagram Alur Status:

```
Check-in (wajib)
    │
    ▼
Pilih Menu → Keranjang → Pilih Meja
    │
    ▼
Pesan → Menunggu
    │
    ▼ (Dapur masak)
Dimasak
    │
    ▼ (Semua item siap)
Siap Saji
    │
    ▼ (Klik "Antarkan")
Telah Diantar
    │
    ├── Lunas → Klik "Selesaikan" → Selesai
    │
    └── Belum Bayar → Kasir proses bayar → Klik "Selesaikan" → Selesai
```

---

## 8. Notifikasi

### 8.1 Notifikasi Pop-up (Toast)

| Jenis             | Warna  | Contoh                                        |
| ----------------- | ------ | --------------------------------------------- |
| ✅ **Sukses**     | Hijau  | "Item ditambahkan ke keranjang"               |
| ⚠️ **Peringatan** | Kuning | "Silakan pilih meja terlebih dahulu"          |
| ❌ **Error**      | Merah  | "Gagal memproses pesanan"                     |
| ℹ️ **Info**       | Biru   | "Pesanan dibatalkan"                          |

### 8.2 Notifikasi Lonceng (Notification Panel)

| Kejadian                  | Icon | Notifikasi yang Muncul                             |
| ------------------------- | ---- | -------------------------------------------------- |
| Pesanan siap saji         | ✅   | "Status Pesanan — #ID — Siap Saji"                |
| Pesanan diantar           | 🛵   | "Status Pesanan — #ID — Telah Diantar"            |
| Pesanan selesai           | ✅   | "Status Pesanan — #ID — Selesai"                  |

---

## 9. Tips Penting

- **Check-in adalah syarat mutlak** — tanpa check-in, Anda tidak bisa melihat menu atau membuat pesanan
- **Pilih meja sebelum pesan** — semua pesanan Pelayan WAJIB menggunakan meja (dine-in)
- **Pesanan hanya bisa dibatalkan** jika status masih **"Menunggu"**
- **Keranjang terpisah dari pelanggan** — keranjang Anda tidak tercampur dengan keranjang pelanggan di HP mereka
- **Tombol "Antarkan"** muncul saat pesanan sudah Siap Saji — antarkan ke meja lalu klik tombol
- **Tombol "Selesaikan"** hanya muncul jika pesanan sudah diantar dan LUNAS
- **Pantau tab Pesanan** untuk melihat pesanan yang perlu diantarkan
- **Gunakan catatan** pada item untuk menulis permintaan khusus pelanggan (kurang gula, ekstra es, dll)
- **Setiap pesanan Anda tercatat** — ID Anda (waiter_id) otomatis tersimpan di setiap pesanan yang Anda buat, berguna untuk pelacakan dan laporan

---

## 10. Pertanyaan Umum (FAQ)

**Q: Kenapa saya tidak bisa melihat menu?**
A: Anda harus **check-in** terlebih dahulu melalui tab **Profil**. Setelah check-in, buka tab **Menu** kembali.

**Q: Bagaimana cara memilih meja?**
A: Buka tab **Keranjang**, klik **"Pilih Meja"**, lalu pilih meja yang tersedia (berwarna hijau).

**Q: Kenapa tombol "Antarkan" tidak muncul?**
A: Tombol "Antarkan" hanya muncul untuk pesanan dengan status **"Siap Saji"**. Tunggu sampai dapur selesai memasak.

**Q: Bagaimana cara menyelesaikan pesanan?**
A: Klik **"Selesaikan"** pada pesanan yang sudah diantar dan sudah **Lunas**. Jika belum bayar, arahkan pelanggan ke kasir.

**Q: Apakah saya bisa membuat pesanan delivery?**
A: Tidak. Sebagai Pelayan, Anda hanya bisa membuat pesanan **Makan di Tempat (Dine-In)**.

**Q: Bagaimana cara membatalkan pesanan?**
A: Klik **"Batal Pesanan"** pada pesanan yang masih **"Menunggu"**. Pilih alasan, lalu konfirmasi.

**Q: Apakah saya bisa mencetak struk?**
A: Ya. Klik kartu pesanan di tab **Pesanan**, lalu klik **"Cetak Invoice"** di modal detail.

**Q: Saya lupa check-out, bagaimana?**
A: Buka tab **Profil** dan klik **"Check Out"**. Sistem akan mencatat waktu check-out saat itu juga.

---

_Dokumen ini dibuat untuk membantu Pelayan (Waiter) dalam menggunakan aplikasi ARQA Coffee._
