import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { db } from '../../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Home.css'; // Import your CSS

function Home() {
  const [email, setEmail] = useState(''); // State for email input
  const [uuiId, setUuiId] = useState(''); // State for Unique User ID input
  const [error, setError] = useState(''); // To show an error message
  const [showPopup, setShowPopup] = useState(false); // State for showing popup message
  const [adminPassword, setAdminPassword] = useState(''); // State for admin password
  const [showAdminPopup, setShowAdminPopup] = useState(false); // Admin pop-up state
  const navigate = useNavigate(); // Use this to navigate to the /test or /admin page

  const handleTakeTest = async () => {
    setError(''); // Reset error message

    // Query Firestore to check if the user is registered
    const q = query(
      collection(db, 'credentials'),
      where('email', '==', email),
      where('uuiId', '==', uuiId)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // User not registered
        setShowPopup(true); // Show the popup message
      } else {
        // User is registered, navigate to /test and pass user details
        const userData = querySnapshot.docs[0].data(); // Get the first matched user data
        const { name } = userData; // Extract the name

        // Navigate with email, uuiId, and name
        navigate('/test', { state: { email, uuiId, name } });
      }
    } catch (err) {
      setError('Error checking user registration: ' + err.message);
    }
  };

  const handleAdminNavigation = () => {
    if (adminPassword === '123456') {
      navigate('/admin'); // Navigate to admin page if password matches
    } else {
      alert('Invalid Admin Password!');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="app-name">THE QUIZ</h1>
        <div className="nav-links">
          <span onClick={() => handleNavigation('/leaderboard')}>Leaderboard</span>
          <span onClick={() => handleNavigation('/chat')}>Chat</span>
          <span onClick={() => handleNavigation('/home')}>Home</span>
        </div>
      </nav>
      <div className="content">
        <h2>Welcome to THE QUIZ!</h2>
        <p>Ready to take your test?</p>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Unique User ID"
            value={uuiId}
            onChange={(e) => setUuiId(e.target.value)}
            required
          />
        </div>
        <button onClick={handleTakeTest} className="take-test-button">
          Take Test
        </button>
      </div>

      {/* Admin Button */}
      <div className="admin-button-container">
        <button onClick={() => setShowAdminPopup(true)} className="admin-button">
          Admin
        </button>
      </div>

      {/* Admin password pop-up */}
      {showAdminPopup && (
        <div className="admin-popup">
          <div className="admin-popup-content">
            <span className="close-popup" onClick={() => setShowAdminPopup(false)}>X</span>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button onClick={handleAdminNavigation} className="submit-admin-password">
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Popup for user not found */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={() => setShowPopup(false)}>X</span>
            <p>User not registered. Please register first.</p>
            <span onClick={() => handleNavigation('/cred')} className="register-link">
              Click here to register
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
