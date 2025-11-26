import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Medical Portal</h2>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'nav-links-active' : ''}`}>
        <Link 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </Link>
        <Link 
          to="/patients" 
          className={location.pathname === '/patients' ? 'active' : ''}
        >
          Patients
        </Link>
        <Link 
          to="/test-results" 
          className={location.pathname === '/test-results' ? 'active' : ''}
        >
          Test Results
        </Link>
        <Link 
          to="/settings" 
          className={location.pathname === '/settings' ? 'active' : ''}
        >
          Settings
        </Link>
      </div>

      <div className="nav-user">
        <span>{user.firstName}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;