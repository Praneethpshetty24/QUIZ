import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Webcam from 'react-webcam';
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
        {activeTestUsers.length > 0 ? (
          activeTestUsers.map((user, index) => (
            <div key={index} className="user-feed">
              <h3>{user.email}</h3>
              <Webcam className="webcam-feed" videoConstraints={{ width: 150, height: 150, facingMode: 'user' }} />
            </div>
          ))
        ) : (
          <p>No active users currently taking the test.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
