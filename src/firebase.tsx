// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAsG2LXb6xxZm7YuV5SuaDhUgt0SPJBwCU',
  authDomain: 'gndtest-1a0b4.firebaseapp.com',
  projectId: 'gndtest-1a0b4',
  storageBucket: 'gndtest-1a0b4.appspot.com',
  messagingSenderId: '840120285103',
  appId: '1:840120285103:web:f3d655eb403617f5c6615a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
