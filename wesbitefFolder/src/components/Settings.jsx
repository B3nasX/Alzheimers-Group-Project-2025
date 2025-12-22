import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "./Settings.css";

const Settings = ({ user, onLogout }) => {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const handleCustomizeClick = () => {
    setIsCustomizeOpen(!isCustomizeOpen);
    setIsEditProfileOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
    setIsCustomizeOpen(false);
  };

  const handlePrimaryCardClick = () => {
    if (isAdmin) {
      navigate("/manage-users");
    } else {
      handleEditProfileClick();
    }
  };

  return (
    <div className="settings">
      <Navbar user={user} onLogout={onLogout} />

      <div className="content">
        <header>
          <h1>Settings</h1>
          <p>Manage your preferences</p>
        </header>

        <div className="settings-grid">
          <div className="setting-card">
            <h3>{isAdmin ? "Manage User Accounts" : "Profile Settings"}</h3>
            <p>
              {isAdmin
                ? "View and manage staff accounts"
                : "Update your personal information"}
            </p>

            <button className="open-button" onClick={handlePrimaryCardClick}>
              {isAdmin ? "Open User Management" : "Edit Profile"}
            </button>

            {!isAdmin && isEditProfileOpen && (
              <div className="edit-box">
                <div className="edit-box-header">
                  <h2>Edit Profile</h2>
                  <button
                    className="close-button"
                    onClick={() => setIsEditProfileOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <button>Change User Details</button>
                <br />
                <button>Change Email</button>
                <br />
                <button>Change Password</button>
              </div>
            )}
          </div>

          <div className="setting-card">
            <h3>Customize</h3>
            <p>Adjust your dashboard preferences</p>

            <button className="customize-button" onClick={handleCustomizeClick}>
              Customize
            </button>

            {isCustomizeOpen && (
                <button
                  className="close-button"
                  onClick={() => setIsCustomizeOpen(false)}
                >
                  Close
                </button>
              
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
