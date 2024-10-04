import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Decision.css';
import { FaCheckCircle, FaTimesCircle, FaUserShield, FaInfoCircle } from 'react-icons/fa'; // Importing icons

function Decision() {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate('/home');
  };

  const handleNo = () => {
    navigate('/cred');
  };

  return (
    <div className="decision-page">
      <div className="decision-container">
        <FaUserShield className="hero-icon" />
        <h2>Do you have your credentials?</h2>
        <p className="funny-text">Your credentials can unlock many adventures!</p>
        <div className="decision-buttons">
          <button onClick={handleYes} className="decision-button">
            <FaCheckCircle /> Yes
          </button>
          <button onClick={handleNo} className="decision-button">
            <FaTimesCircle /> No
          </button>
        </div>
        <div className="info-section">
          <FaInfoCircle className="info-icon" />
          <p className="info-text">If you need help, please contact support.</p>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 THE QUIZ... All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Decision;
