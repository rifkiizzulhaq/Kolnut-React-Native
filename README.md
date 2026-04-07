# Kolnut — Mobile App (React Native)

**Kolnut** adalah aplikasi mobile Android untuk membantu pengguna dalam mengidentifikasi **jenis makanan** melalui kamera dan mendapatkan **tips serta rekomendasi gizi sehat** berbasis AI.

Repositori ini adalah bagian **Frontend Mobile** dari ekosistem Kolnut, dibangun menggunakan **React Native 0.74**.

---

## Arsitektur Proyek

Aplikasi ini adalah bagian dari ekosistem yang terdiri dari 3 komponen:

```
[Kolnut-React-Native (repo ini)]
        |
        | (HTTP via Axios)
        ↓
[Kolnut-Laravel — Backend API]
        |
        | (cURL ke AI Server)
        ↓
[Model-AI-Detection-Objek-Tensorflow — Python FastAPI]
```

---

## Fitur & Halaman

| Halaman | Keterangan |
|---|---|
| **Main Page** | Halaman awal / splash screen |
| **Login** | Halaman masuk akun pengguna |
| **Register** | Halaman pendaftaran akun baru |
| **Dashboard** | Halaman utama setelah login, menampilkan konten |
| **Scan** | Kamera untuk mengambil gambar makanan dan mengirimnya ke AI |
| **Deskripsi Image** | Menampilkan hasil klasifikasi dan detail dari gambar yang di-scan |
| **Profile** | Halaman profil pengguna |

---

## Tech Stack

- **Framework**: React Native 0.74
- **Navigasi**: React Navigation (Stack + Bottom Tabs)
- **HTTP Client**: Axios
- **Storage**: AsyncStorage (untuk menyimpan token login)
- **Image Picker**: react-native-image-picker (untuk akses kamera/galeri)
- **Node.js**: >= 18

---

## Prasyarat

Pastikan semua perangkat lunak berikut sudah terinstal sebelum menjalankan proyek:

- **Node.js** >= 18 & **NPM**
- **Java JDK 17** (wajib, versi lain tidak kompatibel)
- **Android SDK** (via Android Studio atau Command Line Tools)
- **ADB** (Android Debug Bridge) sudah ditambahkan ke PATH sistem
- **HP Android** dengan USB Debugging aktif, atau emulator Android

> Panduan lengkap setup environment React Native tersedia di: https://reactnative.dev/docs/environment-setup

---

## Setup & Instalasi

### Langkah 1 — Install Dependensi
```bash
npm install
```

### Langkah 2 — Konfigurasi Base URL API

Buka file `app/baseUrl.js` dan sesuaikan IP address dengan IP lokal PC/Laptop Anda (cek dengan `ipconfig` di Windows):

```js
export const baseUrl = {
    url: 'http://<IP-PC-ANDA>:8888/api'
}
```

> Pastikan HP Android dan PC berada dalam jaringan WiFi yang **sama**.

### Langkah 3 — Hubungkan HP Android

1. Aktifkan **Developer Options** di HP Anda (ketuk "Build Number" 7x di pengaturan)
2. Aktifkan **USB Debugging** di dalam Developer Options
3. Hubungkan HP ke PC via kabel USB
4. Verifikasi HP terdeteksi:
```bash
adb devices
```
HP Anda harus muncul dengan status `device` (bukan `unauthorized`).

### Langkah 4 — Jalankan Aplikasi
```bash
npm run android
```

Proses build pertama kali akan memakan waktu beberapa menit. Setelah selesai, aplikasi akan otomatis terinstall dan terbuka di HP Anda.

---

## Koneksi ke Backend

Semua request API menggunakan `baseUrl` yang didefinisikan di `app/baseUrl.js`. Pastikan server **Kolnut-Laravel** sudah berjalan terlebih dahulu sebelum menggunakan aplikasi.

Lihat repositori [Kolnut-Laravel](../Kolnut-Laravel) untuk panduan menjalankan server backend.

---

## Tips Development

- Setelah menyimpan perubahan kode (`Ctrl+S`), aplikasi di HP akan otomatis *hot-reload*.
- Untuk membuka **Developer Menu** di HP: goyangkan HP atau tekan `Ctrl+M` (Windows).
- Untuk debug log: buka terminal Metro yang berjalan di background.

---

## Lisensi

Proyek ini menggunakan lisensi [MIT License](https://opensource.org/licenses/MIT).
