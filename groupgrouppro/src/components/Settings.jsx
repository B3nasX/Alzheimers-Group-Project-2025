import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import './Settings.css';

const Settings = ({ user, onLogout }) => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [language, setLanguage] = useState('english');
  
  // Edit Profile State
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
    const savedLanguage = localStorage.getItem('language') || 'english';
    
    setDarkMode(savedDarkMode);
    setFontSize(savedFontSize);
    setLanguage(savedLanguage);
    
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

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handlePreferencesClick = () => {
    setIsPreferencesOpen(!isPreferencesOpen);
    setIsEditProfileOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
    setIsPreferencesOpen(false);
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

  const SecurityIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const NotificationIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );

  const PreferencesIcon = () => (
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
          <p>Manage your account preferences</p>
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

          
          <div className="setting-card">
            <div className="card-icon">
              <SecurityIcon />
            </div>
            <div className="card-content">
              <h3>Security</h3>
              <p>Change password and manage security settings</p>
              <button className="btn-primary">Security Settings</button>
            </div>
          </div>

          <div className="setting-card">
            <div className="card-icon">
              <NotificationIcon />
            </div>
            <div className="card-content">
              <h3>Notifications</h3>
              <p>Manage email and push notifications</p>
              <button className="btn-primary">Notification Settings</button>
            </div>
          </div>
          <div className="setting-card">
            <div className="card-icon">
              <PreferencesIcon />
            </div>
            <div className="card-content">
              <h3>Preferences</h3>
              <p>Customize your dashboard and display settings</p>
              <button 
                className="btn-primary" 
                onClick={handlePreferencesClick}
              >
                Preferences
              </button>
            </div>

            {isPreferencesOpen && (
              <div className="preferences-menu">
                <div className="preference-item">
                  <label className="preference-label">
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

                <div className="preference-item">
                  <label className="preference-label">Font Size</label>
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

                <div className="preference-item">
                  <label className="preference-label">Language</label>
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="language-select"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </div>

                <div className="preference-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => setIsPreferencesOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;