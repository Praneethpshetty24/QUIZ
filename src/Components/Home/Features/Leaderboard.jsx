import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css'; // Optional: Import a CSS file for additional styling

const Leaderboard = () => {
  const navigate = useNavigate();

  // Dummy data for leaderboard
  const leaderboardData = [
    { id: 1, name: 'Alice', score: 95 },
    { id: 2, name: 'Bob', score: 90 },
    { id: 3, name: 'Charlie', score: 85 },
    { id: 4, name: 'David', score: 80 },
    { id: 5, name: 'Eve', score: 75 }
  ];

  const handleViewAnalytics = (id) => {
    navigate(`/analytics/${id}`); // Navigate to the analytics page for the specific user
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Analytics</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
              <td>
                <button 
                  className="analytics-btn"
                  onClick={() => handleViewAnalytics(user.id)}
                >
                  View Analytics
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
