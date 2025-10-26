import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };