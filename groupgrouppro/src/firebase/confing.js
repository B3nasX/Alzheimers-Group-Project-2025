// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

// Initialize Analytics (only if you need it)
const analytics = getAnalytics(app);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export the services you need
export { app, analytics, db, auth, storage };