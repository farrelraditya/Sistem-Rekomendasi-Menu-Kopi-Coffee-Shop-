import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyB-xxxxxxx",
  authDomain: "skripsi-kopi.firebaseapp.com",
  projectId: "skripsi-kopi",
  storageBucket: "skripsi-kopi.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firebase berhasil terhubung, Farrel!");
console.log("Database Firestore siap digunakan.");