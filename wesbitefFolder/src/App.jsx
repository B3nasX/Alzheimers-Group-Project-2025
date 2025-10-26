import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientProfiles from './components/PatientsProfiles';
import TestResults from './components/TestResults';
import Settings from './components/Settings';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/patients" 
            element={
              user ? <PatientProfiles user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/test-results" 
            element={
              user ? <TestResults user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/settings" 
            element={
              user ? <Settings user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
export { db, app };