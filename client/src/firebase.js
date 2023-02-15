// import firebase from "firebase/app"
// import "firebase/auth"
// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAhynMe3S4z0e7s0klVhaL-C1GA9kihQw4",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //databaseURL: "https://nam5.firebaseio.com",
  //process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: "blue-card-development",
  storageBucket: "blue-card-development.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export const db = getFirestore(app);
export const storageRef = getStorage(app);
