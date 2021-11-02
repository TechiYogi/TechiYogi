import firebase from "firebase/compat/app";
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;