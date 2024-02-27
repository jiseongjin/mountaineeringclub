// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDv5fqhW3vZfcwXOrumphk32GxAr55CHBc',
  authDomain: 'test41-44a15.firebaseapp.com',
  projectId: 'test41-44a15',
  storageBucket: 'test41-44a15.appspot.com',
  messagingSenderId: '323381496413',
  appId: '1:323381496413:web:a183d0b86a03cc7de11bb4'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
