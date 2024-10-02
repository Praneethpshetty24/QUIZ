// src/Components/Home/Home.jsx
import React, { useState } from 'react';
import './Home.css'; // Import your CSS

function Home() {
  const [email, setEmail] = useState('');
  const [uuiId, setUuiId] = useState('');

  const handleTakeTest = () => {
    // Handle the test initiation here
    console.log({ email, uuiId });
    // Add your logic to start the test, e.g., navigate to the test page
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="app-name">THE QUIZ</h1>
        <div className="nav-links">
          <a href="/leaderboard">Leaderboard</a>
          <a href="/test">Test</a>
          <a href="/home">Home</a>
        </div>
      </nav>
      <div className="content">
        <h2>Welcome to THE QUIZ!</h2>
        <p>Ready to take your test?</p>
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
        <button onClick={handleTakeTest} className="take-test-button">Take Test</button>
      </div>
    </div>
  );
}

export default Home;
