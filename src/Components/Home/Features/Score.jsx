import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase'; // Ensure Firebase is correctly set up

function Score({ uuiId }) {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        console.log('Fetching results for uuiId:', uuiId); // Debugging log
        const resultsCollectionRef = collection(db, 'userTestResults');
        const q = query(resultsCollectionRef, where('uuiId', '==', uuiId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userResults = querySnapshot.docs.map(doc => doc.data())[0]; // Assuming one result per user
          setTestResults(userResults);
        } else {
          setTestResults(null); // No test results found for this user
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test results:', error);
        setLoading(false);
      }
    };

    fetchTestResults();
  }, [uuiId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!testResults) {
    return <div>No test results found for this user.</div>;
  }

  return (
    <div className="score-container">
      <h2>{testResults.name}'s Test Result</h2>
      <p><strong>Email:</strong> {testResults.email}</p>
      <p><strong>Score:</strong> {testResults.score} / {testResults.totalQuestions}</p>
      <p><strong>Time Taken:</strong> {Math.floor(testResults.timeTaken / 60)} minutes and {testResults.timeTaken % 60} seconds</p>

      <h3>Question Details</h3>
      <ul>
        {testResults.questionDetails.map((question, index) => (
          <li key={index}>
            <p><strong>Question:</strong> {question.questionText}</p> {/* Assuming this field exists */}
            <p><strong>Your Answer:</strong> {question.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
            <p><strong>Status:</strong> {question.isCorrect ? 'Correct' : 'Wrong'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Score;
