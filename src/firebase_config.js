import firebase from "firebase/compat/app";
import 'firebase/auth';

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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;