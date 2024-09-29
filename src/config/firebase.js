import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC6pHIdqBnTABtGIDzrTZj1lL77Htd7A0E',
  authDomain: 'fix-day.firebaseapp.com',
  projectId: 'fix-day',
  storageBucket: 'fix-day.appspot.com',
  messagingSenderId: '74772052957',
  appId: '1:74772052957:web:017b53a764f6b5a26d1434',
  measurementId: 'G-0BE54V4FH2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
