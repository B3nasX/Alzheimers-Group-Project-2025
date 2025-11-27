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
import ManageUsers from './components/manageUser';
import PatientProfile from './components/patient';

import { app, db } from './firebase/config';


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

          <Route path="manage-users" element={<ManageUsers user={user} onLogout={handleLogout}/>}  />
          <Route path="patient/:id" element={<PatientProfile user={user} onLogout={handleLogout}/>}  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
