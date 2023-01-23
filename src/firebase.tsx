// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQ2kRtpLyecybtv5tz61NdNfpb-5SG8Ok',
  authDomain: 'gnd-project-02.firebaseapp.com',
  projectId: 'gnd-project-02',
  storageBucket: 'gnd-project-02.appspot.com',
  messagingSenderId: '444827852717',
  appId: '1:444827852717:web:7d9cc25e6500a1487d4b24',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
