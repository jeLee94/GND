// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClfU4LhUElDLP2_d_wiCDiX5JKS_OzCk8",
  authDomain: "gnd-project-864c1.firebaseapp.com",
  projectId: "gnd-project-864c1",
  storageBucket: "gnd-project-864c1.appspot.com",
  messagingSenderId: "962932000525",
  appId: "1:962932000525:web:6eebfc8c01c1c188985244",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
