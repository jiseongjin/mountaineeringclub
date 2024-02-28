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
  apiKey: 'AIzaSyDZbxadVuuV8oyG2kYg7DZMxFXiDvij6nk',
  authDomain: 'mountain-184ba.firebaseapp.com',
  projectId: 'mountain-184ba',
  storageBucket: 'mountain-184ba.appspot.com',
  messagingSenderId: '53519254445',
  appId: '1:53519254445:web:27dfb3f69d164e639a9724',
  measurementId: 'G-5ZS7R37Y82'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
