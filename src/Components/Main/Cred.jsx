import React, { useState } from 'react';
import { db } from '../../Firebase'; // Adjust the import based on your Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import './Cred.css'; // Import your CSS

function Cred() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [uuiId, setUuiId] = useState('');
  const [error, setError] = useState(''); // State to hold error messages
  const [success, setSuccess] = useState(''); // State to hold success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Create a new document in the credentials collection
      await addDoc(collection(db, 'credentials'), {
        name,
        email,
        age,
        dob,
        uuiId,
      });

      setSuccess('Credentials submitted successfully!'); // Set success message
      // Clear the form after submission
      setName('');
      setEmail('');
      setAge('');
      setDob('');
      setUuiId('');
    } catch (err) {
      setError('Error submitting credentials: ' + err.message); // Set error message
    }
  };

  return (
    <div className="cred-container">
      <h2>User Credentials</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      {success && <p className="success">{success}</p>} {/* Display success message */}
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
    </div>
  );
}

export default Cred;
