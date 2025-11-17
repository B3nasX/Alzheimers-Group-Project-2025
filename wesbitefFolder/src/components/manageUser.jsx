import React from "react";
import NavBar from "./NavBar";
import "./manageUser.css";

const ManageUsers = ({ user, onLogout }) => {
  // Mock list of users (static, no functions)
  const users = [
    { id: "doc001", name: "Dr. Smith", role: "doctor", email: "smith@hospital.com" },
    { id: "doc002", name: "Dr. Johnson", role: "doctor", email: "johnson@hospital.com" },
    { id: "nurse05", name: "Nurse Kelly", role: "nurse", email: "kelly@hospital.com" },
    { id: "admin", name: "Admin User", role: "admin", email: "admin@hospital.com" }
  ];

  return (
    <div className="manage-users">
      <NavBar user={user} onLogout={onLogout} />
    
      <div className="content">
        <header>
          <h1>User Accounts</h1>
          <p>View all system users</p>
        </header>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td className="role">{u.role.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;
