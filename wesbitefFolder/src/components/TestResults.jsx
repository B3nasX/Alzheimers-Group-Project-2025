import React from 'react';
import Navbar from './NavBar';
import './TestResults.css';

const TestResults = ({ user, onLogout }) => {
  // Mock test results data
  const testResults = [
    { id: 1, patient: 'John Doe', test: 'Blood Work', date: '2024-01-15', status: 'Completed', result: '10/100' },
    { id: 2, patient: 'Jane Smith', test: 'Glucose Test', date: '2024-01-14', status: 'Completed', result: '80/100' },
    { id: 3, patient: 'Mike Johnson', test: 'X-Ray', date: '2024-01-13', status: 'Pending', result: '60/100' },
    { id: 4, patient: 'Sarah Wilson', test: 'Allergy Panel', date: '2024-01-12', status: 'Completed', result: '40/100' }
  ];

  return (
    <div className="test-results">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="content">
        <header>
          <h1>Test Results</h1>
          <p>View and manage laboratory test results</p>
        </header>

        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Result</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map(test => (
                <tr key={test.id}>
                  <td>{test.patient}</td>
                  <td>{test.date}</td>
                  <td>{test.result}</td>
                  <td>
                    <button className="btn-primary">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestResults;