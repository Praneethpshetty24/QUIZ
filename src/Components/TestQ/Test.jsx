import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Import Firebase database
import './Test.css';

function Test() {
  const { state } = useLocation(); // Access the passed state
  const { email, uuiId } = state || {}; // Destructure email and uuiId
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [startTime] = useState(Date.now()); // Track test start time
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsCollectionRef = collection(db, 'questions'); // Fetch questions from Firestore
        const questionSnapshot = await getDocs(questionsCollectionRef);
        const allQuestions = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const selectedQuestions = getRandomQuestions(allQuestions, 10); // Select 10 random questions
        setQuestions(selectedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getRandomQuestions = (questions, num) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Function to handle test submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let correctAnswers = 0;

    // Calculate the score based on correct answers
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    const totalTimeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate total time taken in seconds
    setScore(correctAnswers);
    setSubmitted(true);

    // Save the test result to Firestore in a new collection 'userTestResults'
    try {
      const testResultsRef = collection(db, 'userTestResults'); // Create or access 'userTestResults' collection
      await addDoc(testResultsRef, {
        email,
        uuiId,
        score: correctAnswers,
        totalQuestions: questions.length,
        timeTaken: totalTimeTaken,
        timestamp: new Date(),
      });

      console.log('Test results saved successfully');
    } catch (error) {
      console.error('Error saving test results:', error.message); // Log the error message
    }
  };

  return (
    <div className="test-container">
      <h2 className="title">Take Your Test</h2>
      <div className="header">
        <div className="timer">Time Left: {timeLeft} seconds</div>
        <div className="webcam-container">
          <Webcam className="webcam-feed" videoConstraints={{ width: 150, height: 150, facingMode: 'user' }} />
        </div>
      </div>

      {submitted ? (
        <div className="result-container">
          <h3>Your Score: {score} out of {questions.length}</h3>
          <p>Time Taken: {Math.floor((Date.now() - startTime) / 60000)} minutes</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="test-form">
          {questions.length > 0 && (
            <div className="question-card">
              <h4>{questions[currentQuestionIndex].question}</h4>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    name={questions[currentQuestionIndex].id}
                    value={option}
                    checked={answers[questions[currentQuestionIndex].id] === option}
                    onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                    required
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          )}

          <div className="navigation-buttons">
            <button type="button" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0}>Previous</button>
            <button type="button" onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
          </div>

          {currentQuestionIndex === questions.length - 1 && (
            <button type="submit" className="submit-button">Submit</button>
          )}
        </form>
      )}
    </div>
  );
}

export default Test;
