import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase'; // Import Firebase database
import './Leaderboard.css'; // Import CSS for styling
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'userTestResults'));
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  const showAnalytics = (entry) => {
    setSelectedEntry(entry);
    setTimeout(() => drawChart(entry), 100); // Delay to ensure the modal is rendered before drawing
  };

  const closePopup = () => setSelectedEntry(null);

  const drawChart = (entry) => {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Score', 'Time Taken (seconds)'],
        datasets: [{
          label: 'Test Data',
          data: [entry.score, entry.timeTaken],
          backgroundColor: ['#4CAF50', '#FF6384'],
          borderColor: ['#4CAF50', '#FF6384'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Score</th>
            <th>Time Taken</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map(entry => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.score}</td>
              <td>{formatTime(entry.timeTaken)}</td>
              <td>
                <button className="analytics-btn" onClick={() => showAnalytics(entry)}>Analyze</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEntry && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>×</span>
            <h3>Analytics for {selectedEntry.name}</h3>
            <canvas id="analyticsChart" width="400" height="200"></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
