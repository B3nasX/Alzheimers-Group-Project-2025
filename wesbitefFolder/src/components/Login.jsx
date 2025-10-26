import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // Mock user data 
  const users = {
    'doc001': { id: 'doc001', password: 'password123', name: 'Dr. Smith', role: 'doctor' },
    'doc002': { id: 'doc002', password: 'password123', name: 'Dr. Johnson', role: 'doctor' },
    'admin': { id: 'admin', password: 'admin', name: 'Admin', role: 'admin' }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = users[id];
    if (user && user.password === password) {
      onLogin(user);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Medical Portal Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              name="id"
              value={id}
              onChange={handleIdChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <div className="demo-accounts">
          <h4>Demo Accounts:</h4>
          <p>Doctor: doc001 / password123</p>
          <p>Admin: admin / admin</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
