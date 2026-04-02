// 1. Import fungsi Firebase dari jaringan (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Konfigurasi Proyek Firebase Kamu
const firebaseConfig = {
  apiKey: "AIzaSyCqlUQaayGPfVIgZxr_tGuHgwr-h9YdXtI",
  authDomain: "sistem-rekomendasi-kopi-gerd.firebaseapp.com",
  projectId: "sistem-rekomendasi-kopi-gerd",
  storageBucket: "sistem-rekomendasi-kopi-gerd.firebasestorage.app",
  messagingSenderId: "955125085378",
  appId: "1:955125085378:web:d6211bb582ace6e557775b"
};

// 3. Inisialisasi Firebase, Auth, dan Firestore (Database)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ==========================================
// A. LOGIKA HALAMAN LOGIN (Sign In)
// ==========================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah halaman web me-refresh otomatis
        
        const email = document.getElementById('gmail').value;
        const password = document.getElementById('password').value;
        const btnLogin = loginForm.querySelector('button[type="submit"]');

        try {
            btnLogin.innerText = "Memverifikasi...";
            
            // Proses verifikasi ke Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Mengecek data user di database Firestore untuk melihat apakah sudah mengisi kuesioner
            const userDoc = await getDoc(doc(db, "Users", user.uid));
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Jika tingkatGerd masih 0, berarti user belum mengisi kuesioner
                if (userData.tingkatGerd === 0 || !userData.tingkatGerd) {
                    window.location.href = "kuesioner.html";
                } else {
                    // Jika sudah punya data GERD, langsung masuk ke dashboard
                    alert(`Selamat datang kembali di Sistem Rekomendasi Kopi!`);
                    window.location.href = "daftar_rekomendasi.html"; 
                }
            } else {
                // Berjaga-jaga jika dokumen user belum ada sama sekali
                window.location.href = "kuesioner.html";
            }

        } catch (error) {
            alert("Gagal Login: Periksa kembali Gmail dan Password Anda.");
            console.error("Detail Error:", error.message);
            btnLogin.innerText = "Masuk";
        }
    });
}


// ==========================================
// B. LOGIKA HALAMAN REGISTER (Buat Akun)
// ==========================================
const formRegister = document.getElementById('formRegister');
if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nama = document.getElementById('namaLengkap').value;
        const email = document.getElementById('emailRegister').value;
        const password = document.getElementById('passwordRegister').value;
        const btnRegister = document.getElementById('btnRegister');

        try {
            btnRegister.innerText = "Memproses Pendaftaran...";
            
            // Buat akun baru di Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Buat "KTP" user di Firestore dengan tingkatGerd default 0
            await setDoc(doc(db, "Users", user.uid), {
                namaLengkap: nama,
                email: email,
                tingkatGerd: 0 
            });

            alert("Pendaftaran Berhasil! Mari isi profil lambung Anda terlebih dahulu.");
            window.location.href = "kuesioner.html"; // Lempar ke halaman kuesioner

        } catch (error) {
            alert("Gagal mendaftar: " + error.message);
            btnRegister.innerText = "Daftar Akun";
        }
    });
}


// ==========================================
// C. LOGIKA HALAMAN KUESIONER GERD
// ==========================================
const formKuesioner = document.getElementById('formKuesioner');
if (formKuesioner) {
    formKuesioner.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btnHitung = document.getElementById('btnHitungGerd');
        
        // Mengambil poin dari pilihan radio button
        const q1 = parseInt(document.querySelector('input[name="q1"]:checked').value);
        const q2 = parseInt(document.querySelector('input[name="q2"]:checked').value);
        const q3 = parseInt(document.querySelector('input[name="q3"]:checked').value);
        
        // Menjumlahkan skor
        const totalSkor = q1 + q2 + q3;
        
        // Klasifikasi Level GERD
        let levelGerd = 0;
        if (totalSkor >= 3 && totalSkor <= 4) {
            levelGerd = 1; // Tingkat 1 (Ringan)
        } else if (totalSkor >= 5 && totalSkor <= 7) {
            levelGerd = 2; // Tingkat 2 (Sedang)
        } else if (totalSkor >= 8 && totalSkor <= 9) {
            levelGerd = 3; // Tingkat 3 (Berat)
        }

        btnHitung.innerText = "Menyimpan Profil...";

        // Cek siapa user yang sedang aktif mengisi kuesioner ini
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Update data tingkatGerd di Firestore
                    await setDoc(doc(db, "Users", user.uid), {
                        tingkatGerd: levelGerd,
                        skorMentah: totalSkor
                    }, { merge: true }); // merge: true memastikan nama & email tidak terhapus

                    alert(`Profil Tersimpan! Tingkat Toleransi Lambung Anda berada di Level ${levelGerd}.`);
                    window.location.href = "daftar_rekomendasi.html"; // Lanjut ke halaman utama
                    
                } catch (error) {
                    alert("Gagal menyimpan profil: " + error.message);
                    btnHitung.innerText = "Simpan Profil & Lihat Rekomendasi";
                }
            } else {
                alert("Sesi Anda telah habis. Silakan Sign In kembali.");
                window.location.href = "login.html";
            }
        });
    });
}