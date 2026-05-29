# Panduan Penggunaan Aplikasi ARQA Coffee — Untuk Juru Masak

---

## 1. Cara Masuk ke Aplikasi

Ada 2 cara untuk masuk ke aplikasi ARQA Coffee sebagai Juru Masak:

### 1.1 Masuk Cepat (Demo)

- Dari halaman awal, klik card bertuliskan **"Juru Masak"**
- Anda akan langsung masuk dan diarahkan ke halaman **Antrian Dapur**
- Cocok untuk mencoba fitur tanpa repot

### 1.2 Masuk dengan Email & Password

- Masukkan alamat email dan password Anda
- Klik tombol **"Masuk"**
- Jika email atau password salah, akan muncul notifikasi

| Role | Email | Password |
|------|-------|----------|
| Juru Masak | dapur@arqa.coffee | dapur123 |

---

## 2. Navigasi dan Tampilan Utama

Setelah berhasil masuk, Anda akan melihat 3 tab di **bottom nav** (bagian bawah layar):

| Tab | Icon | Label | Fungsi |
|-----|------|-------|--------|
| Antrian | 🔥 | **Antrian** | Melihat daftar item yang perlu dimasak |
| Riwayat | ⏳ | **Riwayat** | Melihat pesanan yang sudah selesai/ditolak |
| Profil | 👤 | **Profil** | Lihat data diri, absensi, dan keluar |

Di pojok kanan atas terdapat icon **lonceng** untuk notifikasi, meskipun Juru Masak jarang menerima notifikasi karena cukup memantau antrian langsung.

---

## 3. Antrian Dapur

Tab **Antrian** adalah halaman utama kerja Juru Masak. Semua item yang perlu dimasak muncul di sini secara real-time.

### Syarat Muncul di Antrian:

Pesanan hanya muncul jika:
1. **Kasir sudah menerima** pesanan (klik "Terima")
2. Status pesanan masih: **Menunggu**, **Dimasak**, atau **Siap Saji**

### Yang Ditampilkan:

**A. Stat Cards (2 kartu di atas):**

| Stat | Warna | Arti |
|-----|-------|------|
| Angka **Menunggu** | Kuning (ada animasi) | Jumlah item yang belum dimasak, perlu segera dikerjakan |
| Angka **Dimasak** | Oranye | Jumlah item yang sedang dimasak |

**B. Kartu Item:**

Setiap item makanan/minuman ditampilkan sebagai kartu terpisah (bukan per pesanan). Jika statusnya **Menunggu**, kartu akan memiliki efek **pulsa/glow** (`animate-breathe`) sebagai tanda prioritas.

Setiap kartu menampilkan:

| Elemen | Keterangan |
|--------|-----------|
| 🏷️ **Badge Status** | "Menunggu" (kuning) atau "Dimasak" (oranye) |
| **#ID Pesanan** | 5 karakter terakhir, misal `#XF3B4` |
| 👤 **Nama Pelanggan** | Nama pemesan (icon user) |
| 🕐 **Waktu** | Jam masuk pesanan |
| 💺 / 🏍️ **Tipe + Meja** | "Meja 3" untuk dine-in, "Delivery" untuk antar |
| 💳 **Status Bayar** | "Lunas" atau "Belum Bayar" |
| **Nama Menu x Jumlah** | Misal: "Kopi Susu x2" dengan warna aksen |
| 💰 **Harga Item** | Total harga per item |
| 📝 **Catatan** | Catatan khusus (misal: kurang gula) — jika ada |
| 🔘 **Tombol Aksi** | Tergantung status (lihat di bawah) |

---

## 4. Memasak Item

Ada 2 aksi utama yang bisa Anda lakukan pada setiap item.

### 4.1 Mulai Memasak

Jika item berstatus **"Menunggu"**, tersedia 2 tombol:

| Tombol | Fungsi |
|--------|--------|
| ✅ **Masak** | Menandai item sedang dimasak |
| ❌ **Tolak** | Menolak pesanan (dengan alasan) |

**Saat Anda klik "Masak":**

1. Status item berubah menjadi **"Dimasak"**
2. Status pesanan otomatis berubah menjadi **"Dimasak"** (jika ada item lain yang juga dimasak)
3. Item akan pindah ke bagian yang sama dengan kartu berwarna oranye
4. Tombol berubah menjadi **"Siap"**

### 4.2 Menandai Selesai Masak

Jika item berstatus **"Dimasak"**, tombol yang muncul:

| Tombol | Fungsi |
|--------|--------|
| 🟢 **Siap** | Menandai item sudah siap saji |

**Saat Anda klik "Siap":**

1. Status item berubah menjadi **"Siap"**
2. Item akan **hilang** dari antrian dapur (karena item siap tidak ditampilkan)
3. Jika **semua item** dalam satu pesanan sudah siap, maka:
   - Status pesanan otomatis menjadi **"Siap Saji"**
   - Notifikasi dikirim ke **Kasir** dan **Pelanggan**
   - Untuk delivery: **Kurir** bisa melihatnya di tab Tersedia

### 4.3 Status Pesanan Otomatis

Sistem secara otomatis menghitung status pesanan berdasarkan status item-item di dalamnya:

| Kondisi | Status Pesanan |
|---------|---------------|
| Ada item yang statusnya **"Dimasak"** (belum semua siap) | **Dimasak** |
| **Semua** item sudah **"Siap"** | **Siap Saji** |

> 💡 Jika ada item yang masih "Menunggu" dan tidak ada yang "Dimasak", status pesanan tetap di **"Menunggu"** meskipun beberapa item sudah Anda klik "Masak".

---

## 5. Menolak Pesanan

Anda bisa menolak pesanan yang bermasalah, asalkan statusnya masih **"Menunggu"** (belum dimasak).

### Langkah-langkah:

1. Klik tombol **"Tolak"** pada item yang ingin ditolak
2. Akan muncul jendela konfirmasi dengan dropdown alasan
3. Pilih alasan penolakan:

| Alasan | Keterangan |
|--------|-----------|
| Bahan habis | Bahan baku untuk menu tersebut tidak tersedia |
| Peralatan bermasalah | Alat masak/barista bermasalah |
| Menu tidak tersedia saat ini | Menu sedang tidak bisa dibuat |
| Pesanan tidak valid | Data pesanan tidak lengkap/salah |
| Antrian terlalu penuh | Kapasitas dapur sudah maksimal |
| Lainnya... | Ketik alasan spesifik sendiri |

4. Jika memilih **"Lainnya..."**, akan muncul kolom teks untuk mengetik alasan
5. Klik **"Tolak Pesanan"** untuk mengonfirmasi

### Yang Terjadi Setelah Penolakan:

- Status pesanan menjadi **"Ditolak"**
- Alasan penolakan tersimpan dan bisa dilihat di riwayat
- Jika pesanan **dine-in** dan meja tersebut tidak punya pesanan lain, meja akan kembali **tersedia**
- Notifikasi dikirim ke **Pelanggan** dan **Kasir**
- Pesanan masuk ke tab **Riwayat** dengan badge merah "Ditolak"

> ⚠️ **Pesanan tidak bisa ditolak** jika sudah ada item yang berstatus "Dimasak" atau "Siap".

---

## 6. Riwayat Pesanan

Klik tab **Riwayat** (icon jam) untuk melihat pesanan yang sudah selesai atau ditolak.

### Yang Ditampilkan:

Pesanan dengan status:
- **Siap Saji** — sudah selesai dimasak
- **Selesai** — sudah dibayar dan selesai
- **Ditolak** — ditolak oleh dapur

### Filter Tanggal:

- Gunakan input **"Dari Tanggal"** dan **"Sampai Tanggal"** untuk memfilter
- Klik tombol **X** (merah) untuk mereset filter

### Tampilan Kartu Riwayat:

Setiap kartu menampilkan:
- **#ID Pesanan** (5 karakter terakhir)
- **Badge status** — badge abu-abu untuk "Selesai"/"Siap Saji", badge merah untuk "Ditolak"
- **Tipe pesanan** — "Dine-In" atau "Delivery"
- **Nama pelanggan** + nomor meja
- **Daftar item** (dipotong jika terlalu panjang)
- **Tanggal dan jam**
- **Total harga**

Kartu bisa diklik untuk melihat **detail lengkap**.

### Detail Pesanan (Modal):

Saat kartu diklik, muncul jendela detail berisi:
- ID pesanan dan badge status
- Tipe pesanan, nomor meja, nama pelanggan
- Alamat delivery (jika ada)
- Jika status **Ditolak** — alasan penolakan ditampilkan dalam card merah dengan icon larangan
- Daftar item lengkap dengan catatan masing-masing
- Total harga
- Waktu pembuatan
- Tombol **"Tutup"**

---

## 7. Profil dan Keluar

Klik tab **Profil** (icon orang) di bagian bawah.

### Yang bisa Anda lakukan:

- **Lihat data diri** — nama, email, nomor telepon, avatar

- **Absensi Geospasial** — fitur check-in/check-out berbasis lokasi:

  **Sebelum Check-in:**
  - Saat tab Profil dibuka, sebuah **peta preview** akan muncul dengan marker yang bisa **digeser (draggable)**
  - Peta menampilkan area sekitar kafe (ARQA Coffee) menggunakan citra satelit Esri
  - Tunggu hingga label koordinat muncul (posisi marker saat ini)
  - Anda bisa **menyeret marker** ke posisi yang lebih akurat jika perlu
  - Label akan menampilkan:
    - **Koordinat** (latitude, longitude) — misal: `-6.2088, 106.8456`
    - **Jarak dari kafe** — misal: `30m` (dihitung dari titik pusat ARQA Coffee)
  - Check-in **hanya bisa dilakukan dalam radius 200 meter** dari titik pusat kafe

  **Check-in:**
  - Pastikan posisi marker sudah sesuai dengan lokasi Anda
  - Klik tombol **"Check In"** (icon masuk, warna biru)
  - Sistem akan:
    1. Memeriksa jarak marker ke titik pusat kafe
    2. Jika lebih dari **200 meter**, akan muncul peringatan: *"Anda di luar radius kafe (300m). Check-in hanya dalam 200m"*
    3. Jika dalam radius, absensi tercatat dengan:
       - Waktu check-in (timestamp otomatis)
       - Koordinat lokasi (latitude & longitude)
       - Status: **present**
  - Setelah berhasil, kartu berubah:
    - Icon berubah menjadi jam dengan warna **hijau**
    - Status: **"Sedang Bekerja"** (tulisan hijau)
    - Menampilkan jam check-in, misal: *"Check-in: 08:15 — Lokasi tersimpan"*
    - Tombol berubah menjadi **"Check Out"** (warna merah)

  **Check-out:**
  - Klik tombol **"Check Out"** (icon keluar, warna merah)
  - Sistem akan:
    1. Mencari absensi aktif hari ini (check-in tanpa check-out)
    2. Meminta izin lokasi browser (jika diizinkan, lokasi check-out juga tersimpan)
    3. Jika izin lokasi ditolak, check-out tetap berhasil hanya tanpa koordinat
    4. Mencatat waktu check-out (timestamp otomatis)
  - Setelah berhasil, muncul toast: *"Check-out berhasil — lokasi tersimpan"*
  - Kartu absensi kembali ke tampilan awal dengan peta dan tombol **"Check In"**

  **Riwayat Absensi:**
  - Data absensi Anda tersimpan di `DB.attendances` dan bisa dilihat oleh **Manager** atau **Admin** melalui tab **Presensi**
  - Manager/Admin dapat klik kartu staf untuk melihat laporan:
    - **Presensi Hari Ini** — jumlah check-in hari ini + total jam kerja
    - **Presensi Bulan Ini** — jumlah check-in bulan ini + total jam kerja
    - **Riwayat Harian** — daftar 10 absensi terakhir (tanggal, jam masuk, jam keluar, durasi)

- **Keluar** — klik **"Keluar"** untuk kembali ke halaman login

---

## 8. Alur Pesanan Lengkap (Dari Sisi Dapur)

### Skenario 1: Makan di Tempat (Dine-In)

```
Customer pesan → Kasir Terima → Muncul di Antrian →
Stat "Menunggu" bertambah →
Klik "Masak" → Item jadi "Dimasak" → Stat "Dimasak" bertambah →
Klik "Siap" → Item jadi "Siap" → Item hilang dari antrian →
Semua item siap → Otomatis "Siap Saji" → Notif ke cashier →
Kasir bayar → Selesai (masuk Riwayat)
```

### Skenario 2: Pesan Antar (Delivery)

```
Customer pesan → Kasir Terima → Muncul di Antrian →
Klik "Masak" → Klik "Siap" → Semua item siap →
Otomatis "Siap Saji" →
Kurir ambil dan antar → Selesai (masuk Riwayat)
```

### Skenario 3: Pesanan Ditolak

```
Pesanan masuk → Status "Menunggu" →
Klik "Tolak" → Pilih alasan → Konfirmasi →
Pesanan "Ditolak" → Meja dibebaskan (jika dine-in) →
Notifikasi ke customer & kasir → Masuk Riwayat
```

---

## 9. Notifikasi

Juru Masak hanya menerima **satu jenis notifikasi**:

### 9.1 Notifikasi Pop-up (Toast)

Notifikasi ini muncul sebagai kotak kecil di pojok kanan atas layar dan akan menghilang sendiri setelah beberapa detik.

| Jenis | Warna | Contoh |
|-------|-------|--------|
| ✅ **Sukses** | Hijau | "Status diupdate: Dimasak" |
| ⚠️ **Peringatan** | Kuning | "Pesanan sudah diproses, tidak bisa ditolak" |
| ℹ️ **Info** | Biru | "Pesanan #XF3B4 ditolak: Bahan habis" |

### 9.2 Notifikasi Lonceng

Juru Masak **tidak menerima notifikasi lonceng** secara khusus. Cukup pantau **tab Antrian** yang selalu diperbarui secara real-time setiap kali ada perubahan data.

> 💡 Cukup biarkan tab Antrian terbuka, semua item baru akan muncul otomatis.

---

## 10. Tips Penting

- **Item dengan efek pulsa/glow** (`animate-breathe`) artinya masih **Menunggu** dan perlu segera dikerjakan — ini prioritas
- **Pesanan hanya bisa ditolak** jika status masih **"Menunggu"** — jika sudah "Dimasak", tombol Tolak tidak akan muncul
- **Item siap otomatis hilang** dari antrian dapur — tidak perlu khawatir jika item menghilang, itu tandanya sudah selesai
- **Status pesanan otomatis jadi "Siap Saji"** saat semua item sudah siap — Anda tidak perlu mengubah status pesanan secara manual
- **Stat "Menunggu" dan "Dimasak"** dihitung **per-item**, bukan per-pesanan — jadi jika 1 pesanan punya 3 item, masing-masing dihitung terpisah
- **Riwayat bisa difilter** berdasarkan tanggal — gunakan jika ingin mencari pesanan lama
- Pantau **catatan (notes)** pada item — pelanggan sering menambahkan permintaan khusus seperti "kurang gula" atau "ekstra es"

---

## 11. Pertanyaan Umum (FAQ)

**Q: Kenapa pesanan tidak muncul di antrian?**
A: Pastikan kasir sudah mengklik **"Terima"** pada pesanan tersebut. Tanpa itu, pesanan tidak akan muncul di dapur.

**Q: Bagaimana cara menolak pesanan?**
A: Klik **"Tolak"** pada item yang masih berstatus **"Menunggu"**, pilih alasan, lalu konfirmasi.

**Q: Kenapa tombol "Tolak" tidak muncul?**
A: Tombol "Tolak" hanya muncul untuk item berstatus **"Menunggu"**. Jika sudah "Dimasak", tombol berubah menjadi "Siap" saja.

**Q: Apakah saya bisa memasak beberapa item sekaligus?**
A: Ya. Setiap item bisa dikelola secara independen. Anda bisa klik "Masak" pada beberapa item, lalu "Siap" satu per satu sesuai selesai.

**Q: Bagaimana cara tahu pesanan sudah selesai semua?**
A: Jika **semua item** dalam satu pesanan sudah berstatus "Siap", pesanan akan otomatis berubah menjadi "Siap Saji" dan notifikasi dikirim ke kasir.

**Q: Kenapa pesanan tidak otomatis jadi "Siap Saji"?**
A: Pastikan **setiap item** dalam pesanan tersebut sudah Anda klik **"Siap"**. Sistem baru mengubah status pesanan jika semua item sudah siap.

**Q: Apakah saya bisa melihat riwayat pesanan yang sudah lama?**
A: Ya. Gunakan filter tanggal di tab **Riwayat** untuk melihat pesanan dalam rentang tanggal tertentu.

**Q: Kenapa ada item yang tiba-tiba hilang dari antrian?**
A: Item akan hilang dari antrian jika statusnya sudah **"Siap"**. Item yang sudah selesai dimasak tidak perlu ditampilkan lagi.

**Q: Saya tidak sengaja klik "Siap" padahal belum selesai, bagaimana?**
A: Setelah item berstatus "Siap", tidak ada tombol untuk mengembalikannya ke "Dimasak". Sebaiknya koordinasi dengan kasir jika terjadi kesalahan.

**Q: Apakah saya bisa melihat detail pesanan dari antrian?**
A: Tidak dari antrian langsung. Untuk melihat detail lengkap, buka tab **Riwayat** dan klik kartu pesanan yang ingin dilihat.

---

*Dokumen ini dibuat untuk membantu Juru Masak dalam menggunakan aplikasi ARQA Coffee.*
