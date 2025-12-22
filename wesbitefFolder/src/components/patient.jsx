import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import './patient.css';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import ChatbotWidget from './ChatbotWidget';

const PatientProfile = ({ user, onLogout }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
    const loadPatient = async () => {
        try {
            const patientDoc = doc(db, "patient", id);
            const patientSnapshot = await getDoc(patientDoc);

            if (!patientSnapshot.exists()) {
                console.error("No such patient!");
                return;
            }
            setPatient({ firebaseId: patientSnapshot.id, ...patientSnapshot.data() });
        } catch (error) {
            console.error("Error loading patient: ", error);
        }};

    useEffect(() => {
        loadPatient();
    }, [id]);

  if (!patient) {
    return <p>Loading patient data...</p>;
  }
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="patient-profile">
      
        <header>
          <h1 className="patient-name">
            {patient.first_name} {patient.last_name}
          </h1>
          <h3 id="patient-details">Patient Details</h3>
        </header>
        <div className="patient-info">    
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>GP ID:</strong> {patient.gp_ID}</p>
          <p><strong>Patient ID:</strong> {patient.patient_ID}</p>
          <p><strong>UID:</strong> {patient.UID}</p>
        </div>
        
          <button className="back-button" onClick={() => window.history.back()}>
            Back
          </button>
      </div>
      <ChatbotWidget />
    </>
  );
};
export default PatientProfile;