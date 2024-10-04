// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase'; // Import Firebase database
import './Leaderboard.css'; // Import CSS for styling

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const testResultsCollectionRef = collection(db, 'userTestResults');
        const snapshot = await getDocs(testResultsCollectionRef);
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort results by score in descending order
        results.sort((a, b) => b.score - a.score);
        setLeaderboardData(results);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Score</th>
            <th>Time Taken (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.id}>
              <td>{entry.email}</td>
              <td>{entry.score}</td>
              <td>{Math.floor(entry.timeTaken / 60)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
