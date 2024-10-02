import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Decision.css'; // Import your CSS


function Decision() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleYes = () => {
    navigate('/hi'); // Navigate to /hi if the user has credentials
  };

  const handleNo = () => {
    navigate('/cred'); // Navigate to /cred if the user does not have credentials
  };

  return (
    <div className="decision-container">
      <h2>Do you have your credentials?</h2>
      <div className="decision-buttons">
        <button onClick={handleYes} className="decision-button">Yes</button>
        <button onClick={handleNo} className="decision-button">No</button>
      </div>
    </div>
  );
}

export default Decision;
