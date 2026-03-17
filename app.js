// 1. Import fungsi Firebase dari jaringan (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2. Konfigurasi Proyek Firebase Kamu
// PENTING: Ganti isi variabel ini dengan konfigurasi asli dari Firebase Console milikmu!
const firebaseConfig = {
  apiKey: "AIzaSyCqlUQaayGPfVIgZxr_tGuHgwr-h9YdXtI",
  authDomain: "sistem-rekomendasi-kopi-gerd.firebaseapp.com",
  projectId: "sistem-rekomendasi-kopi-gerd",
  storageBucket: "sistem-rekomendasi-kopi-gerd.firebasestorage.app",
  messagingSenderId: "955125085378",
  appId: "1:955125085378:web:d6211bb582ace6e557775b"
};

// 3. Inisialisasi Firebase & Firebase Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Menangkap aksi ketika tombol "Masuk" ditekan
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah halaman web me-refresh otomatis

    // Mengambil nilai teks yang diketik pengguna di kolom input
    const email = document.getElementById('gmail').value;
    const password = document.getElementById('password').value;
    
    // 5. Proses verifikasi ke Firebase Auth
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Jika email dan password cocok di database
            const user = userCredential.user;
            alert("Login Berhasil! Selamat datang di Sistem Rekomendasi Kopi.");
            
            // Arahkan ke Halaman Daftar Rekomendasi (UC-2)
            // (Pastikan kamu sudah membuat file daftar_rekomendasi.html nanti)
            window.location.href = "daftar_rekomendasi.html"; 
        })
        .catch((error) => {
            // Jika gagal login (password salah / email belum terdaftar)
            const errorMessage = error.message;
            alert("Gagal Login: Periksa kembali Gmail dan Password Anda.");
            console.error("Detail Error:", errorMessage);
        });
});