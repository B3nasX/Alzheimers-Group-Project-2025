import React from 'react';
import Navbar from './NavBar';
import './PatientsProfiles.css';

const PatientProfiles = ({ user, onLogout }) => {
  // Mock patient data with quiz status
  const patients = [
    { id: 1, name: 'Emily ', age: 45, condition: 'Dementia', lastVisit: '2024-01-15', doneQuiz: true },
    { id: 2, name: 'Beans', age: 32, condition: 'Alzheimer\'s', lastVisit: '2024-01-14', doneQuiz: false },
    { id: 3, name: 'Awbrie', age: 58, condition: 'Dementia', lastVisit: '2024-01-13', doneQuiz: true },
    { id: 4, name: 'Sean', age: 29, condition: 'Alzheimer\'s', lastVisit: '2024-01-12', doneQuiz: false }
  ];

  return (
    <div className="patient-profiles">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="content">
        <header>
          <h1>Patient Profiles</h1>
          <p>Manage and view patient information</p>
        </header>

        <div className="patients-grid">
          {patients.map(patient => (
            <div key={patient.id} className="patient-card">
              <div className="patient-header">
                <h3>{patient.name}</h3>
              </div>
              
              <div className="patient-info">
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Condition:</strong> {patient.condition}</p>
                <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
              </div>
              
              <div className="patient-actions">
                <button className="btn-primary">View Profile</button>
                <button className="btn-secondary">Test Results</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfiles;