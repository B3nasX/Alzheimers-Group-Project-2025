import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome, {user.name}</h1>
          <p>Role: {user.role.toUpperCase()}</p>
        </header>

        <div className="dashboard-grid">
          <Link to="/patients" className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Patient Profiles</h3>
            <p>View and manage patient information</p>
          </Link>

          <Link to="/test-results" className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Quiz Results</h3>
            <p>View patients Quiz results</p>
          </Link>

          {user.role === 'admin' && (
            <>
              <Link to="/manage-users" className="dashboard-card">
                <div className="card-icon">⚙️</div>
                <h3>User Management</h3>
                <p>Manage staff accounts</p>
              </Link>
              
            
            </>
          )}
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span>📋</span>
              <p>1 quiz result submitted</p>
            </div>
            <div className="activity-item">
              <span>👤</span>
              <p>1 patient registered today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;