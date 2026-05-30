# Panduan Penggunaan Aplikasi ARQA Coffee — Untuk Kasir

---

## 1. Cara Masuk ke Aplikasi

Ada 2 cara untuk masuk ke aplikasi ARQA Coffee sebagai Kasir:

### 1.1 Masuk Cepat (Demo)

- Dari halaman awal, klik card bertuliskan **"Kasir"**
- Anda akan langsung masuk dan diarahkan ke halaman **Pesanan**
- Cocok untuk mencoba fitur tanpa repot

### 1.2 Masuk dengan Email & Password

- Masukkan alamat email dan password Anda
- Klik tombol **"Masuk"**
- Jika email atau password salah, akan muncul notifikasi

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| Kasir | kasir@arqa.coffee | kasir123 |

---

## 2. Navigasi dan Tampilan Utama

Setelah berhasil masuk, Anda akan melihat 5 tab di **bottom nav** (bagian bawah layar):

| Tab          | Icon | Label            | Fungsi                                                            |
| ------------ | ---- | ---------------- | ----------------------------------------------------------------- |
| Buat Pesanan |      | **Buat Pesanan** | Membuat pesanan baru secara manual atau mengedit pesanan yang ada |
| Pesanan      | 📋   | **Pesanan**      | Melihat & mengelola semua pesanan masuk                           |
| Bayar        | 💳   | **Bayar**        | Memproses pembayaran & riwayat lunas                              |
| Laporan      | 📊   | **Laporan**      | Rekap harian, statistik, grafik revenue                           |
| Meja         | 🪑   | **Meja**         | Kelola data meja & cetak QR                                       |
| Profil       | 👤   | **Profil**       | Lihat data diri, absensi, keluar                                  |

**Notifikasi Lonceng:** Di pojok kanan atas terdapat icon lonceng dengan badge merah jika ada notifikasi baru.

**Notif Dot di Tab Pesanan:** Titik merah pada tab Pesanan muncul jika ada pesanan dengan status **Belum Bayar**.

---

## 3. Mengelola Pesanan (Tab Pesanan)

Tab **Pesanan** adalah halaman utama kerja Kasir. Menampilkan semua pesanan yang perlu diproses.

### 3.1 Stat Cards (Baris Atas)

3 kartu statistik di bagian atas:

| Stat                | Warna  | Arti                                                  |
| ------------------- | ------ | ----------------------------------------------------- |
| Angka **Menunggu**  | Kuning | Jumlah pesanan baru yang belum diterima               |
| Angka **Dimasak**   | Oranye | Jumlah pesanan yang sedang dimasak                    |
| Angka **Siap Saji** | Hijau  | Jumlah pesanan yang sudah siap diproses pembayarannya |

### 3.2 Kartu Pesanan Aktif

Menampilkan pesanan dengan status: **Menunggu**, **Dimasak**, **Siap Saji**, atau **Telah Diantar**.

Setiap kartu menampilkan:

| Elemen                  | Keterangan                                                                                                                                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🏷️ **#ID Pesanan**      | 5 karakter terakhir, misal `#XF3B4`                                                                                                                                                                                                    |
| **Badge Status**        | Warna sesuai status (pending=kuning, cooking=oranye, ready=hijau)                                                                                                                                                                      |
| 💳 **Badge Bayar**      | "Lunas" (hijau) atau "Belum Bayar" (merah)                                                                                                                                                                                             |
| 🕐 **Waktu**            | Jam masuk pesanan                                                                                                                                                                                                                      |
| 💺 / 🏍️ **Tipe + Meja** | "Meja 3" untuk dine-in, "Delivery" untuk antar                                                                                                                                                                                         |
| 👤 **Nama Pelanggan**   | Nama pemesan — untuk pesanan online diambil dari **data registrasi user**, untuk pesanan manual diisi kasir. Jika pelanggan terdaftar, **email user** ditampilkan dalam tanda kurung di samping nama (contoh: `Budi (budi@email.com)`) |
| **Item Pesanan**        | Daftar menu x jumlah (dipisah koma)                                                                                                                                                                                                    |
| 🏷️ **Diskon Promo**     | Jika ada promo, ditampilkan dalam warna hijau                                                                                                                                                                                          |
| 💰 **Total Harga**      | Total pesanan (warna aksen)                                                                                                                                                                                                            |
| 🔘 **Tombol Aksi**      | Tergantung kondisi (lihat di bawah)                                                                                                                                                                                                    |

### 3.3 Tombol Aksi per Kondisi

| Kondisi                                    | Tombol                | Fungsi                                   |
| ------------------------------------------ | --------------------- | ---------------------------------------- |
| Status **Menunggu** & belum diterima       | **Terima** ✅         | Menerima pesanan, notifikasi ke dapur    |
| Status **Menunggu** & belum diterima       | **Edit** ✏️           | Mengubah item pesanan                    |
| Status **Menunggu** & belum diterima       | **Batal** ❌          | Membatalkan pesanan (dengan alasan)      |
| Status **Sudah diterima**                  | Badge "Diterima"      | Hanya badge informasi (tidak ada tombol) |
| Status **Siap Saji** & **Belum Bayar**     | **Bayar** 💳          | Membuka modal pembayaran                 |
| Status **Siap Saji** & **Lunas**           | **Selesai** ✅        | Menandai pesanan selesai                 |
| Status **Telah Diantar** & **Belum Bayar** | **Terima Setoran** 💵 | Menyelesaikan pembayaran COD             |

### 3.4 Menerima Pesanan

**Saat Anda klik "Terima":**

1. Status pesanan tetap **"Menunggu"**
2. Notifikasi dikirim ke **Dapur** — pesanan muncul di antrian dapur
3. **Pembayaran Tunai otomatis lunas:** Jika pelanggan memilih bayar **Tunai**, pesanan otomatis langsung **Lunas** saat diterima — tanpa perlu proses bayar lagi
4. Toast: _"Pesanan #ID diterima — menunggu dapur"_

### 3.5 Membatalkan Pesanan

**Pesanan hanya bisa dibatalkan jika status masih "Menunggu".**

**Langkah-langkah:**

1. Klik tombol **"Batal"** pada kartu pesanan
2. Akan muncul modal konfirmasi dengan pilihan alasan:

| Alasan                     | Keterangan                              |
| -------------------------- | --------------------------------------- |
| Pelanggan tidak jadi pesan | Pelanggan membatalkan pesanan           |
| Pesanan duplikat           | Pesanan ganda yang tidak sengaja dibuat |
| Pesanan salah              | Item atau jumlah tidak sesuai           |
| Stok bahan habis           | Bahan baku tidak tersedia               |
| Lainnya...                 | Ketik alasan spesifik sendiri           |

3. Jika memilih **"Lainnya..."**, akan muncul kolom teks untuk mengetik alasan
4. Klik **"Ya, Batalkan"** untuk mengonfirmasi

**Yang terjadi setelah pembatalan:**

- ⚠️ **Pesanan tidak dihapus** — status diubah menjadi **"Dibatalkan"** dengan alasan tersimpan
- Jika pesanan **dine-in** dan meja tidak punya pesanan lain, meja kembali **tersedia**
- Notifikasi dikirim ke **Pelanggan** dengan alasan pembatalan
- Pesanan yang dibatalkan masuk ke **Riwayat** dengan badge **Dibatalkan** dan tampilan teks & harga berwarna merah

### 3.6 Mengedit Pesanan

**Pesanan hanya bisa diedit jika status masih "Menunggu".**

1. Klik tombol **"Edit"** pada kartu pesanan
2. Item-item pesanan akan dimuat ke **keranjang kasir**
3. Anda akan dialihkan ke tampilan **Buat Pesanan** dengan data pesanan yang sudah terisi
4. Ubah item, jumlah, atau informasi lainnya
5. Klik **"Proses Pesanan"** dan simpan perubahan

### 3.7 Menyelesaikan Pesanan (Selesai)

Untuk pesanan yang sudah **Siap Saji** dan sudah **Lunas**:

1. Klik tombol **"Selesai"** (gradien hijau)
2. Status pesanan berubah menjadi **"Selesai"**
3. Pesanan masuk ke bagian **Riwayat**

### 3.8 Menerima Setoran Kurir (COD)

Untuk pesanan **Delivery** yang sudah diantar kurir dengan status **Belum Bayar (COD)**:

1. Kurir menyerahkan uang tunai kepada Anda
2. Klik tombol **"Terima Setoran"** (gradien biru)
3. Status pesanan berubah:
   - `status`: **Telah Diantar** → **Selesai**
   - `payment_status`: **Belum Bayar** → **Lunas**
   - `payment_method`: **COD**
4. Notifikasi dikirim ke pelanggan dan kurir

### 3.9 Cetak Invoice

Setiap pesanan yang sudah **selesai** bisa dicetak struknya (tidak tersedia untuk pesanan **Ditolak** atau **Dibatalkan**):

1. Klik kartu pesanan di bagian **Riwayat**
2. Klik tombol **"Cetak"** di modal detail
3. Browser akan membuka jendela baru dengan tampilan struk dan dialog print

Struk mencetak:

- Kop: **ARQA Coffee**
- Tipe pesanan, meja, pelanggan
- ID pesanan, tanggal, jam
- Daftar item (nama, qty, subtotal)
- Subtotal, diskon promo, pajak 10%, total akhir
- Metode & status pembayaran
- Footer: _"Terima kasih telah berbelanja di ARQA Coffee"_

### 3.10 Riwayat Pesanan (Completed / Rejected / Cancelled)

Di bagian bawah tab Pesanan, terdapat 5 pesanan terakhir yang sudah **Selesai**, **Ditolak**, atau **Dibatalkan**.

Setiap kartu riwayat menampilkan:

- #ID pesanan
- Tipe pesanan (Dine-In / Delivery) — diikuti nama pelanggan dan email user `(contoh: Budi (budi@email.com))`
- Badge **"Ditolak"** atau **"Dibatalkan"** (merah)
- Total harga — **hijau** untuk selesai, **merah** untuk ditolak/dibatalkan
- Teks info (tipe, nama, email) — **muted** untuk selesai, **merah** untuk ditolak/dibatalkan

Klik kartu untuk melihat **modal detail** lengkap:

- ID, status, tipe, meja, pelanggan (dengan email user dalam tanda kurung)
- Alasan tolak/batal (jika ada)
- Daftar item + total — **item dan harga berwarna merah** jika ditolak/dibatalkan
- Metode pembayaran + waktu selesai
- Tombol **Cetak** (hanya untuk status **Selesai**) dan **Tutup** (selalu ada)

---

## 4. Pembayaran (Tab Bayar)

Tab **Bayar** digunakan untuk memproses pembayaran dan melihat riwayat transaksi.

### 4.1 Pesanan Belum Lunas

Menampilkan semua pesanan yang masih **Belum Bayar** (kecuali yang sudah selesai/dibatalkan/ditolak).

Setiap kartu menampilkan:

- #ID + badge status
- 👤 Nama pelanggan — untuk pelanggan terdaftar, **email user** ditampilkan di sampingnya dengan warna aksen
- Total harga (warna aksen)
- Waktu, meja (jika dine-in), label "Delivery"
- Item pesanan
- Diskon promo (jika ada)
- 2 tombol: **Digital** 💳 dan **Tunai** 💵

Jika semua pesanan sudah lunas, akan muncul icon centang hijau dengan teks _"Semua pesanan sudah lunas"_.

### 4.2 Pembayaran Digital

1. Klik tombol **"Digital"** pada kartu pesanan (atau di modal pembayaran)
2. Status pesanan berubah:
   - `payment_status`: **Lunas**
   - `payment_method`: **Digital**
3. Notifikasi dikirim ke pelanggan, manager, admin
4. Toast: _"Pembayaran #ID berhasil (Digital)"_

### 4.3 Pembayaran Tunai

1. Klik tombol **"Tunai"** pada kartu pesanan
2. Status pesanan berubah:
   - `payment_status`: **Lunas**
   - `payment_method`: **Tunai**
3. Notifikasi dikirim ke pelanggan, manager, admin
4. Toast: _"Pembayaran #ID berhasil (Tunai)"_

### 4.4 Modal Pembayaran

Saat klik **"Bayar"** dari tab Pesanan, muncul modal yang menampilkan:

- ID, tipe, meja, nama pelanggan (dengan email user jika terdaftar)
- Total harga (warna aksen)
- Daftar item lengkap
- Diskon promo (jika ada)
- 3 tombol:
  - **Digital** — proses pembayaran digital
  - **Tunai** — proses pembayaran tunai
  - **Cetak Invoice** — cetak struk saja (tanpa bayar)

### 4.5 Riwayat Lunas

Bagian collapsible yang bisa dibuka/tutup. Menampilkan 20 transaksi lunas terakhir.

Tampilan:

- Header: _"Riwayat Lunas (jumlah)"_
- Setiap baris: #ID, tanggal + jam, metode bayar (Tunai/Digital), nama pelanggan (dengan email user jika terdaftar), total harga
- Klik baris → modal detail pesanan

---

## 5. Buat Pesanan Manual

Fitur ini digunakan untuk membuat pesanan secara langsung tanpa melalui pelanggan. Cocok untuk:

- Pesanan **walk-in** (pelanggan datang langsung)
- Pesanan **takeaway** (bawa pulang)
- **Mengedit** pesanan yang sudah ada

### 5.1 Cara Mengakses

- Di tab **Pesanan**, klik tombol **"Buat Pesanan"** (icon tambah, di bagian atas)
- Atau klik **"Edit"** pada pesanan yang masih pending

### 5.2 Tampilan Buat Pesanan

**Header:**

- Tombol **Kembali** (panah) → kembali ke tab Pesanan, mengosongkan keranjang
- Judul: **"Buat Pesanan Manual"** atau **"Edit Pesanan"**

**Search Bar:**

- Kolom pencarian dengan icon search
- Filter menu secara real-time berdasarkan nama (tanpa reload halaman)

**Category Chips:**
5 filter kategori: **Semua**, **Kopi**, **Non-Kopi**, **Makanan**, **Snack**

**Grid Menu (2 kolom):**

- Hanya menampilkan menu yang tersedia (`is_available = true`)
- Setiap card: nama menu (terpotong jika panjang), harga (warna aksen)
- Klik card → item ditambahkan ke keranjang

### 5.3 Keranjang Kasir

Sidebar yang muncul di bagian bawah saat ada item di keranjang:

| Elemen | Keterangan                                         |
| ------ | -------------------------------------------------- |
| Header | **"Pesanan (jumlah item)"**                        |
| Item   | Nama item + tombol **−** jumlah **+**              |
| Total  | **"Total (inc. Pajak)"** — harga × 1.1 (pajak 10%) |
| Tombol | **"Proses Pesanan"** (sticky di bawah)             |

Jika keranjang kosong: icon alat makan + _"Pilih menu untuk menambahkan ke pesanan"_.

### 5.4 Mengatur Jumlah Item

- Klik **+** → jumlah bertambah 1
- Klik **−** → jumlah berkurang 1 (jika 0, item dihapus)
- Tambahan item yang sama akan otomatis menambah jumlah (bukan duplikat)

### 5.5 Proses Pesanan (Modal)

Klik **"Proses Pesanan"** → muncul modal dengan form:

| Field                                      | Deskripsi                                                                                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nama Pelanggan (Opsional)**              | Input teks nama pelanggan. Jika dikosongkan, akan terisi otomatis **"Pelanggan Offline"**. Saat edit pesanan, field ini terisi dengan nama sebelumnya |
| **Tipe Pesanan**                           | Dropdown: **Makan di Tempat (Dine-in)** atau **Bawa Pulang (Takeaway)**                                                                               |
| **Pilih Meja**                             | Hanya muncul jika tipe **Dine-in** — dropdown daftar meja, meja terisi di-disable                                                                     |
| **Status Pembayaran**                      | Dropdown: **Sudah Lunas** atau **Belum Bayar**                                                                                                        |
| Tombol **Batal**                           | Kembali, kosongkan editing ID                                                                                                                         |
| Tombol **Buat Pesanan / Simpan Perubahan** | Finalisasi pesanan                                                                                                                                    |

### 5.6 Finalisasi Pesanan Baru

Saat tombol **"Buat Pesanan"** diklik:

1. Data dikumpulkan dari form (nama, tipe, meja, status bayar)
2. **Pajak 10%** otomatis ditambahkan ke total
3. Jika **dine-in + pilih meja** → meja diubah statusnya menjadi **Terisi**
4. Pesanan baru dibuat dengan:
   - `accepted: true` ✅ — **otomatis diterima**, tidak perlu proses terima lagi
   - `status: pending`
   - `user_id: "walk-in"` — pelanggan offline
   - `customer_name`: sesuai input, atau **"Pelanggan Offline"** jika dikosongkan
   - `payment_status` sesuai pilihan
5. Notifikasi dikirim ke **dapur** — item langsung muncul di antrian
6. Keranjang dikosongkan, kembali ke tab **Pesanan**

### 5.7 Finalisasi Edit Pesanan

Saat tombol **"Simpan Perubahan"** diklik:

1. Data yang sama dikumpulkan dari form
2. Jika **meja berubah**:
   - Meja lama dibebaskan (jika tidak ada pesanan lain)
   - Meja baru diisi
3. Data pesanan diperbarui: nama pelanggan, meja, tipe, total, item
4. Item-item direset ke status **pending**
5. Kembali ke tab **Pesanan**

---

## 6. Laporan (Tab Laporan)

Tab **Laporan** menampilkan rekap harian kasir.

### 6.1 Filter Tanggal

- Input **"Dari Tanggal"** dan **"Sampai Tanggal"**
- Default: hari ini
- Tombol **X** (merah) untuk mereset filter

### 6.2 Stat Cards (4 Kartu)

| Kartu                | Isi                                 | Aksi Klik                                  |
| -------------------- | ----------------------------------- | ------------------------------------------ |
| 💵 **Bayar Tunai**   | Total nominal tunai + COD           | Tampilkan/sembunyikan tabel detail tunai   |
| 💳 **Bayar Digital** | Total nominal digital/QRIS/Transfer | Tampilkan/sembunyikan tabel detail digital |
| ✅ **Lunas**         | Jumlah pesanan lunas                | Pindah ke tab Bayar → Riwayat Lunas        |
| ❌ **Belum Bayar**   | Jumlah pesanan unpaid               | Pindah ke tab Bayar                        |

### 6.3 Tabel Detail (Expandable)

**Tabel Tunai:**

- Header: total & jumlah transaksi
- Baris: Tanggal, Jam, #ID Orders (dengan nama pelanggan & email user), Menu, Total
- Footer: total keseluruhan
- Klik baris → modal detail pesanan

**Tabel Digital:**

- Struktur sama seperti tabel tunai
- Menampilkan metode bayar per baris (QRIS / Transfer / Digital)
- Juga menampilkan nama pelanggan & email user di kolom Orders

### 6.4 Peringatan Stok

Jika ada bahan baku yang stoknya **menipis** (jumlah ≤ minimum), akan muncul card merah dengan icon peringatan dan daftar item yang perlu di-restock.

### 6.5 Pesanan Terbaru

Daftar 6 pesanan terakhir (scrollable):

- #ID, badge status, icon promo (jika ada), nama pelanggan (dengan email user), total harga

### 6.6 Grafik Revenue

Grafik **bar chart** yang menampilkan revenue harian (dalam ribuan Rp) untuk 7 hari terakhir. Grafik dibuat otomatis menggunakan Chart.js.

---

## 7. Kelola Meja (Tab Meja)

Tab **Meja** digunakan untuk mengelola data meja di kafe.

### Tampilan:

- Header: **"Kelola Meja"** + tombol **Tambah** (untuk menambah meja baru)
- Grid kartu meja (2 kolom mobile, 4 kolom desktop)

### Setiap Kartu Meja:

| Elemen                 | Keterangan                                     |
| ---------------------- | ---------------------------------------------- |
| 🗑️ **Hapus**           | Tombol merah di pojok kiri atas                |
| 🪑 **Icon Meja**       | Lingkaran hijau (tersedia) atau merah (terisi) |
| **"Meja {number}"**    | Nama meja                                      |
| **QR: ARQA-T{number}** | Kode QR meja                                   |
| **Badge Status**       | "Tersedia" (hijau) atau "Terisi" (oranye)      |
| **Toggle Status**      | Tombol mengubah status meja                    |
| **QR**                 | Tombol menampilkan kode QR meja                |

### Fungsi:

| Aksi              | Fungsi                                                            |
| ----------------- | ----------------------------------------------------------------- |
| **Tambah Meja**   | Membuat meja baru dengan nomor urut berikutnya, status "Tersedia" |
| **Toggle Status** | Mengubah antara "Tersedia" ↔ "Terisi"                             |
| **Hapus Meja**    | Konfirmasi → hapus permanen                                       |
| **Lihat QR**      | Modal menampilkan QR code + tombol download PNG                   |

---

## 8. Profil dan Keluar

Klik tab **Profil** (icon orang) di bagian bawah.

### Yang bisa Anda lakukan:

- **Lihat data diri** — nama, email, nomor telepon, avatar

- **Absensi Geospasial** — check-in/check-out berbasis lokasi (detail lengkap ada di [dokumen terpisah](kitchen-flow.md#7-profil-dan-keluar))

- **Keluar** — klik **"Keluar"** untuk kembali ke halaman login

---

## 9. Alur Pesanan Lengkap (Dari Sisi Kasir)

### Skenario 1: Makan di Tempat — Bayar Digital

```
Pelanggan pesan dari HP → Muncul di tab Pesanan (Menunggu) →
Klik "Terima" → Notif ke dapur → Dapur masak →
Dapur selesai → Status "Siap Saji" →
Klik "Bayar" → Pilih "Digital" → Lunas →
Klik "Selesai" → Pesanan selesai
```

### Skenario 2: Makan di Tempat — Bayar Tunai

```
Pelanggan pesan dari HP → Muncul di tab Pesanan (Menunggu) →
Klik "Terima" → Otomatis Lunas (karena Tunai) → Notif ke dapur →
Dapur masak → Siap Saji →
Klik "Selesai" → Pesanan selesai
```

### Skenario 3: Delivery — COD

```
Pelanggan pesan antar → Muncul di tab Pesanan (Menunggu) →
Klik "Terima" → Dapur masak → Siap Saji →
Kurir ambil → Antar → Status "Telah Diantar" →
Kurir setor uang → Klik "Terima Setoran" →
Lunas & Selesai
```

### Skenario 4: Pesanan Manual (Walk-in / Takeaway)

```
Buka tab Pesanan → Klik "Buat Pesanan" →
Pilih menu dari grid → Atur jumlah →
Klik "Proses Pesanan" → Isi nama pelanggan (atau biarkan default) →
Pilih tipe, meja, status bayar →
Klik "Buat Pesanan" → Otomatis diterima → Notif ke dapur
```

### Skenario 5: Pesanan Dibatalkan

```
Pesanan masuk (Menunggu) → Klik "Batal" →
Pilih alasan dari dropdown → Klik "Ya, Batalkan" →
Status pesanan diubah jadi "Dibatalkan" → Meja dibebaskan →
Notif ke pelanggan → Masuk Riwayat dengan teks & harga merah
```

### Diagram Alur Status:

```
Pelanggan Pesan
      │
      ▼
  Menunggu ─── Batal → ⛔ Dihapus
      │
      ▼ (Klik "Terima")
  Diterima (accepted=true)
      │
      ▼ (Dapur masak)
  Dimasak
      │
      ▼ (Dapur selesai)
  Siap Saji
      │
      ├── Belum Bayar → Klik "Bayar" (Digital/Tunai) → Lunas → Klik "Selesai"
      │
      └── Sudah Lunas → Klik "Selesai"
      │
      ▼
  Selesai ✓
```

---

## 10. Notifikasi

### 10.1 Notifikasi Pop-up (Toast)

Notifikasi ini muncul sebagai kotak kecil di pojok kanan atas layar dan akan menghilang sendiri setelah beberapa detik.

| Jenis             | Warna  | Contoh                                                 |
| ----------------- | ------ | ------------------------------------------------------ |
| ✅ **Sukses**     | Hijau  | "Pesanan #XF3B4 diterima — menunggu dapur"             |
| ⚠️ **Peringatan** | Kuning | "Pesanan tidak dapat dibatalkan karena sudah diproses" |
| ❌ **Error**      | Merah  | (jarang terjadi)                                       |
| ℹ️ **Info**       | Biru   | "Pesanan berhasil dibatalkan"                          |

### 10.2 Notifikasi Lonceng (Notification Panel)

Di pojok kanan atas layar terdapat icon **lonceng**. Jika ada angka merah, artinya ada notifikasi baru yang belum dibaca.

Berikut notifikasi yang diterima Kasir:

| Kejadian                | Icon | Notifikasi yang Muncul                                  |
| ----------------------- | ---- | ------------------------------------------------------- |
| Pesanan baru masuk      | 🛍️   | "Pesanan Baru — #ID — {nama} memesan {n} item"          |
| Pesanan mulai dimasak   | 🔥   | "Status Pesanan — #ID — Dimasak"                        |
| Pesanan siap saji       | ✅   | "Status Pesanan — #ID — Siap Saji"                      |
| Pesanan sedang diantar  | 🏍️   | "Status Pesanan — #ID — Diantar"                        |
| Pesanan selesai         | ✅   | "Status Pesanan — #ID — Selesai"                        |
| Pesanan ditolak dapur   | ⚠️   | "Pesanan Ditolak — #ID — Alasan: {alasan}"              |
| Pesanan ditolak kurir   | ⛔   | "Pesanan Ditolak Kurir — #ID — Alasan: {alasan}"        |
| Pelanggan membatalkan pesanan | ❌   | "Pesanan Dibatalkan Pelanggan — #ID — Alasan: {alasan}" |
| Kurir mengambil pesanan | 🏍️   | "Pesanan Diambil Kurir — #ID — {nama} sedang mengantar" |
| Pengantaran selesai     | ✅   | "Pesanan Selesai — #ID — Pengantaran selesai"           |
| Pembayaran diterima     | 💳   | "Pembayaran Diterima — #ID — Lunas via Digital/Tunai"   |

---

## 11. Tips Penting

- **Pesanan Tunai auto-lunas** saat klik "Terima" — tidak perlu proses bayar lagi
- **Pembatalan tidak destruktif** — pesanan diubah status jadi "Dibatalkan", bukan dihapus, tetap masuk riwayat
- **Pesanan manual otomatis diterima** (`accepted: true`) — langsung masuk antrian dapur
- **Hanya pesanan status "Menunggu"** yang bisa diedit atau dibatalkan
- **Meja otomatis dikelola** — saat terima, batal, atau edit, meja diatur statusnya secara otomatis
- **Pajak 10% otomatis** untuk pesanan manual — total sudah include pajak
- **Pesanan delivery COD** harus menunggu tombol "Terima Setoran" setelah kurir setor
- **Notif dot merah** di tab Pesanan menandakan ada pesanan yang belum lunas
- **Laporan bisa difilter tanggal** — gunakan untuk rekap harian
- **Stok menipis** — cek bagian bawah laporan untuk peringatan stok

---

## 12. Pertanyaan Umum (FAQ)

**Q: Bagaimana cara menerima pesanan?**
A: Di tab **Pesanan**, klik tombol **"Terima"** pada kartu pesanan yang statusnya "Menunggu". Pesanan akan masuk ke antrian dapur.

**Q: Kenapa tombol "Terima" tidak muncul?**
A: Tombol "Terima" hanya muncul untuk pesanan dengan status **"Menunggu"** yang **belum diterima**. Jika sudah diterima, akan muncul badge "Diterima".

**Q: Bagaimana cara membatalkan pesanan?**
A: Klik **"Batal"** pada pesanan yang masih **"Menunggu"**, pilih alasan, konfirmasi. Status pesanan berubah menjadi **"Dibatalkan"** dan masuk ke riwayat.

**Q: Kenapa pesanan tidak bisa dibatalkan?**
A: Pesanan hanya bisa dibatalkan jika status masih **"Menunggu"**. Jika sudah "Dimasak" atau "Siap Saji", tombol Batal tidak tersedia.

**Q: Bagaimana cara memproses pembayaran?**
A: Untuk pesanan "Siap Saji" yang belum bayar, klik **"Bayar"** lalu pilih **"Digital"** atau **"Tunai"**.

**Q: Apa bedanya "Digital" dan "Tunai"?**
A: **Digital** untuk pembayaran non-tunai (QRIS, transfer). **Tunai** untuk pembayaran uang cash. Statusnya sama-sama "Lunas", hanya metode yang berbeda.

**Q: Bagaimana cara menyelesaikan pesanan delivery COD?**
A: Setelah kurir mengantar dan menerima uang, kurir setor ke kasir. Klik **"Terima Setoran"** pada pesanan yang statusnya "Telah Diantar".

**Q: Bagaimana cara membuat pesanan untuk pelanggan walk-in?**
A: Klik **"Buat Pesanan"** di tab Pesanan, pilih menu, atur jumlah, isi data, klik **"Buat Pesanan"**. Pesanan otomatis diterima.

**Q: Bagaimana cara mengedit pesanan yang sudah ada?**
A: Klik **"Edit"** pada pesanan yang masih "Menunggu". Item akan dimuat ke keranjang, Anda bisa mengubahnya lalu simpan.

**Q: Kenapa tombol "Edit" tidak muncul?**
A: "Edit" hanya tersedia untuk pesanan dengan status **"Menunggu"** yang **belum diterima**. Jika sudah diterima atau status lain, tidak bisa diedit.

**Q: Bagaimana cara mencetak struk?**
A: Klik kartu pesanan di bagian **Riwayat**, lalu klik **"Cetak"** di modal detail. Browser akan membuka dialog print.

**Q: Bagaimana cara menambah meja baru?**
A: Di tab **Meja**, klik tombol **"Tambah"** di pojok kanan atas. Meja baru akan dibuat dengan nomor urut berikutnya.

**Q: Kenapa ada titik merah di tab Pesanan?**
A: Titik merah menandakan ada satu atau lebih pesanan yang masih **Belum Bayar**.

**Q: Bagaimana cara melihat laporan harian?**
A: Buka tab **Laporan**. Anda bisa memfilter berdasarkan tanggal dan melihat statistik tunai, digital, serta grafik revenue.

**Q: Apakah nama pelanggan wajib diisi saat buat pesanan manual?**
A: Tidak. Jika kolom nama pelanggan dikosongkan, secara otomatis akan terisi **"Pelanggan Offline"**. Nama ini yang akan tampil di kartu pesanan, struk, dan riwayat.

**Q: Dari mana asal nama pelanggan pada pesanan online?**
A: Nama pelanggan diambil dari **data registrasi user** saat pelanggan login dan membuat pesanan melalui aplikasi pelanggan.

**Q: Apa email dalam tanda kurung di samping nama pelanggan?**
A: Email tersebut adalah **email registrasi user** yang diambil dari database (`getUser(o.user_id)`). Email hanya muncul jika pelanggan adalah user terdaftar (bukan walk-in). Berguna untuk mengidentifikasi pelanggan yang sudah punya akun.

---

_Dokumen ini dibuat untuk membantu Kasir dalam menggunakan aplikasi ARQA Coffee._
