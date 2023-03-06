import { boot } from "quasar/wrappers";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs5Eii6UK8Ri5ZarvCY4zAJera2zMcgu4",
  authDomain: "cashcraft-banking.firebaseapp.com",
  projectId: "cashcraft-banking",
  storageBucket: "cashcraft-banking.appspot.com",
  messagingSenderId: "1094953670868",
  appId: "1:1094953670868:web:1c7d5a498c6ae841c94341",
  measurementId: "G-K7NNGFJCH9",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase);
const auth = getAuth(firebase);

console.log("Firebase initialized");

export default boot(({ app }) => {
  app.config.globalProperties.$firebase = firebase;
  app.config.globalProperties.$db = db;
  app.config.globalProperties.$auth = auth;
});

export { firebase, db, auth };
