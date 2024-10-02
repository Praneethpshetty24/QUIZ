import React, { useState } from 'react';
import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error message

    try {
      if (isSignUp) {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign up successful');
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful'); // Optional: you can keep or remove this alert
      }
      // Redirect to /cred after successful login/signup
      navigate('/decision');
    } catch (error) {
      setError(error.message); // Set error message for any errors encountered
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-name">THE QUIZ</h1>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      {error && <p className="error">{error}</p>} {/* Display error message if any */}
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <span onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
          {isSignUp ? ' Log in here' : ' Sign up here'}
        </span>
      </p>
    </div>
  );
}

export default Login;
