// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHhEB-AF_qCj-4a4cNqfWremIJOSm9UAk",
  authDomain: "group-group-project.firebaseapp.com",
  projectId: "group-group-project",
  storageBucket: "group-group-project.firebasestorage.app",
  messagingSenderId: "482465876201",
  appId: "1:482465876201:web:920683a1ad556bb7c74878",
  measurementId: "G-ZF3LK3LE9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);