// Import the functions you need from the SDKs you need
// import { initializeApp } from "@firebase/app-compat";
// import { getAnalytics } from "@firebase/analytics-compat";
// import { getFirestore } from "@firebase/firestore-compat";
// import firebase from "@firebase";
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnqGfsmGx60m3bI4syygEgEoRTPUlL5bo",
  authDomain: "techi-yogi.firebaseapp.com",
  databaseURL: "https://techi-yogi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "techi-yogi",
  storageBucket: "techi-yogi.appspot.com",
  messagingSenderId: "1082624603912",
  appId: "1:1082624603912:web:372e58e27261d6e7721ebd",
  measurementId: "G-MN9PLDB5J7"
};

// Initialize Firebase
//initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
//const db = getFirestore();
export default db;