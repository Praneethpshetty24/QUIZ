import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Admin.css';

function Admin() {
  const [activeTestUsers, setActiveTestUsers] = useState([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const userTestResultsRef = collection(db, 'userTestResults');
        const userSnapshot = await getDocs(userTestResultsRef);
        const users = userSnapshot.docs.map(doc => doc.data());
        setActiveTestUsers(users);
      } catch (error) {
        console.error('Error fetching active test users:', error);
      }
    };

    fetchActiveUsers();
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="user-feed-container">
        {activeTestUsers.map((user, index) => (
          <div key={index} className="user-feed">
            <h3>{user.email}</h3>
            <div className="video-placeholder">Webcam feed of {user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
