import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { db } from '../../Firebase'; // Adjust the import based on your Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { IoArrowBack } from 'react-icons/io5'; // Import back icon
import './Cred.css'; // Import your CSS

function Cred() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [uuiId, setUuiId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await addDoc(collection(db, 'credentials'), {
        name,
        email,
        age,
        dob,
        uuiId,
      });

      setSuccess('Credentials submitted successfully!');
      setName('');
      setEmail('');
      setAge('');
      setDob('');
      setUuiId('');
    } catch (err) {
      setError('Error submitting credentials: ' + err.message);
    }
  };

  const handleBackClick = () => {
    navigate('/decision'); // Navigate to /decision when back button is clicked
  };

  return (
    <div className="cred-container">
      <div className="cred-header">
        <h2>User Credentials</h2>
      </div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="cred-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Unique User ID"
          value={uuiId}
          onChange={(e) => setUuiId(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleBackClick} className="back">
        Back
      </button>
    </div>
  );
}

export default Cred;
