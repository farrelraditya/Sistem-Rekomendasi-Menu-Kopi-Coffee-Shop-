// 1. Import Firebase Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Konfigurasi Firebase Kamu (GANTI DENGAN MILIKMU!)
const firebaseConfig = {
  apiKey: "AIzaSyCqlUQaayGPfVIgZxr_tGuHgwr-h9YdXtI",
  authDomain: "sistem-rekomendasi-kopi-gerd.firebaseapp.com",
  projectId: "sistem-rekomendasi-kopi-gerd",
  storageBucket: "sistem-rekomendasi-kopi-gerd.firebasestorage.app",
  messagingSenderId: "955125085378",
  appId: "1:955125085378:web:d6211bb582ace6e557775b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Array 40 Dataset Menu Kopi
const datasetKopi = [
    // --- KOPI KENANGAN (10 Menu) ---
    { nama_menu: "Kopi Kenangan Mantan", id_toko: "Kopi Kenangan", jenis_biji: "Blend (Arabika & Robusta)", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.5, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Kopi Kelapa", id_toko: "Kopi Kenangan", jenis_biji: "Blend (Arabika & Robusta)", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.5, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Salted Caramel Macchiato", id_toko: "Kopi Kenangan", jenis_biji: "Blend (Arabika & Robusta)", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.5, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Dua Shot Iced Shaken", id_toko: "Kopi Kenangan", jenis_biji: "Blend (Arabika & Robusta)", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.5, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Americano (Reguler)", id_toko: "Kopi Kenangan", jenis_biji: "Blend (Arabika & Robusta)", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.5, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Light Kopi Kenangan Mantan", id_toko: "Kopi Kenangan", jenis_biji: "100% Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1 },
    { nama_menu: "Light Americano", id_toko: "Kopi Kenangan", jenis_biji: "100% Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1 },
    { nama_menu: "Light Dua Shot Iced Shaken", id_toko: "Kopi Kenangan", jenis_biji: "100% Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1 },
    { nama_menu: "Strawberry Cream Macchiato", id_toko: "Kopi Kenangan", jenis_biji: "100% Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1 },
    { nama_menu: "Gula Melaka Americano", id_toko: "Kopi Kenangan", jenis_biji: "100% Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1 },

    // --- FORE COFFEE (10 Menu) ---
    { nama_menu: "Fore Pandan Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Aren Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Butterscotch Sea Salt Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Caramel Macchiato", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Classic Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Nutty Oat Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Americano", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Vanilla Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Hazelnut Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Roasted Almond Latte", id_toko: "Fore Coffee", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },

    // --- STARBUCKS COFFEE (10 Menu) ---
    { nama_menu: "Starbucks Cold Brew", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Cold Brew", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 1.0 },
    { nama_menu: "Vanilla Sweet Cream Cold Brew", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Cold Brew", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 1.0 },
    { nama_menu: "Caffe Americano", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },
    { nama_menu: "Caramel Macchiato", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },
    { nama_menu: "Asian Dolce Latte", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },
    { nama_menu: "Caffe Latte", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },
    { nama_menu: "Cappuccino", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },
    { nama_menu: "Vanilla Latte", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },
    { nama_menu: "Hazelnut Latte", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },
    { nama_menu: "Cafe Mocha", id_toko: "Starbucks", jenis_biji: "100% Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1 },

    // --- KOPI JANJI JIWA (10 Menu) ---
    { nama_menu: "Kopi Susu (Klasik)", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Kopi Pokat", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Kopi Soklat", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Americano (Klasik)", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Hazelnut Latte (Klasik)", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Caramel Macchiato (Klasik)", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Kopi Tarik", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Kopi Susu Senja", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Double Shaken Senja", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 },
    { nama_menu: "Americano Senja", id_toko: "Kopi Janji Jiwa", jenis_biji: "100% Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso", bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1 }
];

// 4. Logika Upload ke Firestore saat tombol ditekan
const btnInject = document.getElementById("btnInject");
const statusText = document.getElementById("statusText");

btnInject.addEventListener("click", async () => {
    btnInject.disabled = true;
    statusText.innerText = "Sedang mengunggah 40 data ke Firebase... Mohon tunggu.";
    
    let berhasil = 0;
    const menuKopiRef = collection(db, "MenuKopi"); // Nama koleksi: MenuKopi

    try {
        for (const menu of datasetKopi) {
            await addDoc(menuKopiRef, menu);
            berhasil++;
            console.log(`Berhasil upload: ${menu.nama_menu}`);
        }
        statusText.style.color = "green";
        statusText.innerText = `✅ Selesai! Berhasil mengunggah ${berhasil} menu kopi ke koleksi MenuKopi.`;
    } catch (error) {
        console.error("Error mengunggah data: ", error);
        statusText.style.color = "red";
        statusText.innerText = `❌ Terjadi kesalahan: ${error.message}`;
    }
});