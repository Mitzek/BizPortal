// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2IaZsbGRhUt_0l6sXbCzy__IRqYCNOx4",
  authDomain: "bizportal-452eb.firebaseapp.com",
  projectId: "bizportal-452eb",
  storageBucket: "bizportal-452eb.appspot.com",
  messagingSenderId: "449215188455",
  appId: "1:449215188455:web:334350e73bcaf96863c142",
  measurementId: "G-QDPDYZSLMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);