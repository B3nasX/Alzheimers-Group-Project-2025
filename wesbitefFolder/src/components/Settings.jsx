import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import './Settings.css';

const Settings = ({ user, onLogout }) => {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [language, setLanguage] = useState('english');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: 'user@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
    specialization: '',
    department: ''
  });

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    
    setDarkMode(savedDarkMode);
    setFontSize(savedFontSize);
    
    applyDarkMode(savedDarkMode);
    applyFontSize(savedFontSize);
  }, []);

  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
    }
  };

  const applyFontSize = (size) => {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    applyDarkMode(newDarkMode);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    applyFontSize(size);
  };


  const handleCustomizeClick = () => {
    setIsCustomizeOpen(!isCustomizeOpen);
    setIsEditProfileOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
    setIsCustomizeOpen(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    console.log('Updating profile:', profileData);
    alert('Profile updated successfully!');
    setIsEditProfileOpen(false);
    
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleCancelEdit = () => {
    setIsEditProfileOpen(false);
    setProfileData({
      name: user?.name || '',
      email: 'user@example.com',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      phone: '',
      specialization: '',
      department: ''
    });
  };

  // Icon components
  const ProfileIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
  const CustomizeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );

  return (
    <div className="settings">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="content">
        <header>
          <h1>Settings</h1>
          <p>Manage your account</p>
        </header>

        <div className="settings-grid">
          
          <div className="setting-card">
            <div className="card-icon">
              <ProfileIcon />
            </div>
            <div className="card-content">
              <h3>Profile Settings</h3>
              <p>Update your personal information and contact details</p>
              <button 
                className="btn-primary" 
                onClick={handleEditProfileClick}
              >
                Edit Profile
              </button>
            </div>

            
            {isEditProfileOpen && (
              <div className="edit-profile-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2>Edit Profile</h2>
                    <button 
                      className="close-btn"
                      onClick={handleCancelEdit}
                    >
                      Close
                    </button>
                  </div>
                  <button>Change User details</button>
                  <br />
                  <button>Change Email</button>
                  <br />
                  <button>Change Password</button>
                </div>
              </div>
            )}
          </div>
          </div>
          <div className="setting-card">
            <div className="card-icon">
              <CustomizeIcon />
            </div>
            <div className="card-content">
              <h3>Customize</h3>
              <p>Customize your dashboard and display settings</p>
              <button 
                className="btn-primary" 
                onClick={handleCustomizeClick}
              >
                Customize
              </button>
            </div>

            {isCustomizeOpen && (
              <div className="customize-menu">
                <div className="customize-item">
                  <label className="customize-label">
                    <span>Dark Mode</span>
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={handleDarkModeToggle}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>

                <div className="customize-item">
                  <label className="customize-label">Font Size</label>
                  <div className="font-size-options">
                    <button
                      className={`font-size-btn ${fontSize === 'small' ? 'active' : ''}`}
                      onClick={() => handleFontSizeChange('small')}
                    >
                      Small
                    </button>
                    <button
                      className={`font-size-btn ${fontSize === 'medium' ? 'active' : ''}`}
                      onClick={() => handleFontSizeChange('medium')}
                    >
                      Medium
                    </button>
                    <button
                      className={`font-size-btn ${fontSize === 'large' ? 'active' : ''}`}
                      onClick={() => handleFontSizeChange('large')}
                    >
                      Large
                    </button>
                  </div>
                </div>

                <div className="customize-item">
                  <label className="customize-label">Language</label>
                </div>

                <div className="customize-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => setIsCustomizeOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Settings;