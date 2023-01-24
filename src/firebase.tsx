// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk3vmimpiYM_WXej3V5li-sl5M9_j-KTQ",
  authDomain: "gnd-test01.firebaseapp.com",
  projectId: "gnd-test01",
  storageBucket: "gnd-test01.appspot.com",
  messagingSenderId: "395962895012",
  appId: "1:395962895012:web:35ab7fd918773f516a3431"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
