import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { db } from '../../Firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Home.css'; // Import your CSS

function Home() {
  const [email, setEmail] = useState('');
  const [uuiId, setUuiId] = useState('');
  const [error, setError] = useState(''); // To show an error message
  const navigate = useNavigate(); // Use this to navigate to the /test page

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
        setError('User not registered. Please register first.');
      } else {
        // User is registered, navigate to /test and pass user details
        navigate('/test', { state: { email, uuiId } });
      }
    } catch (err) {
      setError('Error checking user registration: ' + err.message);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="app-name">THE QUIZ</h1>
        <div className="nav-links">
          <a href="/leaderboard">Leaderboard</a>
          <a href="/some">Some</a>
          <a href="/home">Home</a>
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
    </div>
  );
}

export default Home;
