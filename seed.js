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
    // ==========================================
    // 1. KOPI KENANGAN (10 Menu)
    // ==========================================
    {
        nama_menu: "Kopi Kenangan Mantan",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Kopi Kenangan Mantan.png",
        jenis_biji: "Blend (Arabika & Robusta)", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.5, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Kopi Kelapa",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Kopi Kelapa.png",
        jenis_biji: "Blend (Arabika & Robusta)", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.5, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Dua Shot Iced Shaken",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Duo Shot Ice Shaken.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Americano (Reguler)",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Americano.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Light Kopi Kenangan Mantan",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Light Kopi Kenangan.png",
        jenis_biji: "Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1
    },
    {
        nama_menu: "Light Americano",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Light Americano.png",
        jenis_biji: "Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1
    },
    {
        nama_menu: "Light Dua Shot Iced Shaken",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Light Double Iced Shaken.png",
        jenis_biji: "Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1
    },
    {
        nama_menu: "Light Latte",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Light Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1
    },
    {
        nama_menu: "Light Hazelnut Latte",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Light Hazelnut Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1
    },
    {
        nama_menu: "Light Avocado Coffee",
        id_toko: "Kopi Kenangan",
        url_gambar: "images_menu/Kopken Light Avocado Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.5, bobot_seduh: 0.1
    },

    // ==========================================
    // 2. FORE COFFEE (10 Menu)
    // ==========================================
    {
        nama_menu: "Fore Pandan Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Pandan Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Aren Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Aren Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Butterscotch Sea Salt Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Butterscoth.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Caramel Macchiato",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Caramel Machiato.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Classic Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Classic Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Nutty Oat Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Nutty Oat Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Americano (Reguler)",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Americano.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Iced Buttercream Tiramisu Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Ice ButterCream Tiramissu Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Iced Bumi Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Ice Bumi Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Iced Malty Latte",
        id_toko: "Fore",
        url_gambar: "images_menu/Fore Ice Malty Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },

    // ==========================================
    // 3. STARBUCKS (10 Menu)
    // ==========================================
    {
        nama_menu: "Starbucks Cold Brew",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Cold Brew.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Cold Brew",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 1.0
    },
    {
        nama_menu: "Vanilla Sweet Cream Cold Brew",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Vanilla Sweet Cream Cold Brew.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Cold Brew",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 1.0
    },
    {
        nama_menu: "Caffe Americano",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Americano.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },
    {
        nama_menu: "Caramel Macchiato",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Caramel Macchiato.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },
    {
        nama_menu: "Asian Dolce Latte",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Asian Dolce Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },
    {
        nama_menu: "Caffe Latte",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Caffe Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },
    {
        nama_menu: "Cappuccino",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Cappuccino.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },
    {
        nama_menu: "Vanilla Latte",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Vanilla Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },
    {
        nama_menu: "Hazelnut Latte",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Hazelnut Latte.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },
    {
        nama_menu: "Cafe Mocha",
        id_toko: "Starbucks",
        url_gambar: "images_menu/Starbucks Mocha Cafe.png",
        jenis_biji: "Arabika", teknik_roast: "Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 1.0, bobot_seduh: 0.1
    },

    // ==========================================
    // 4. KOPI JANJI JIWA (10 Menu)
    // ==========================================
    {
        nama_menu: "Kopi Susu (Klasik)",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Kopi Susu Signature.png",
        jenis_biji: "Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Kopi Pokat",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Kopi Pokat.png",
        jenis_biji: "Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Kopi Soklat",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Kopi Soklat.png",
        jenis_biji: "Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Americano (Klasik)",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Americano.png",
        jenis_biji: "Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Hazelnut Latte (Klasik)",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Hazelnut Latte.png",
        jenis_biji: "Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Caramel Macchiato (Klasik)",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Caramel Macchiato.png",
        jenis_biji: "Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Kopi Hitam",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Kopi Hitam.png",
        jenis_biji: "Robusta", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 0.1, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Kopi Susu Senja",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Kopi Susu Senja Series.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Double Shaken Senja",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Kopi Double Shaken Senja Series.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    },
    {
        nama_menu: "Americano Senja",
        id_toko: "Janji Jiwa",
        url_gambar: "images_menu/Janji jiwa Kopi Americano Senja Series.png",
        jenis_biji: "Arabika", teknik_roast: "Medium-Dark Roast", metode_seduh: "Espresso",
        bobot_biji: 1.0, bobot_roast: 0.8, bobot_seduh: 0.1
    }
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