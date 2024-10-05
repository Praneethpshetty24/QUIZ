import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Test.css';

function Test() {
  const { state } = useLocation();
  const { email, uuiId, name } = state || {}; // Include name in the state
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0); // Total time taken in seconds
  const startTimeRef = useRef(Date.now()); // Track start time using a ref to maintain value across renders
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsCollectionRef = collection(db, 'questions');
        const questionSnapshot = await getDocs(questionsCollectionRef);
        const allQuestions = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const selectedQuestions = getRandomQuestions(allQuestions, 10);
        setQuestions(selectedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();

    timeoutRef.current = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timeoutRef.current);
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

  // Stop the timer and submit the test
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInterval(timeoutRef.current); // Stop the timer

    let correctAnswers = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    const endTime = Date.now();
    const totalTimeTakenInSeconds = Math.floor((endTime - startTimeRef.current) / 1000); // Calculate time in seconds
    setTotalTimeTaken(totalTimeTakenInSeconds); // Save total time taken in state
    setScore(correctAnswers);
    setSubmitted(true);

    try {
      const testResultsRef = collection(db, 'userTestResults');
      await addDoc(testResultsRef, {
        name, // Save the user's name
        email, // Save the user's email
        uuiId, // Save the user's unique identifier
        score: correctAnswers, // Save the score
        totalQuestions: questions.length, // Save the total number of questions
        timeTaken: totalTimeTakenInSeconds, // Time in seconds
        timestamp: new Date(), // Save the current timestamp
      });

      console.log('Test results saved successfully');
    } catch (error) {
      console.error('Error saving test results:', error.message);
    }
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Navigation between questions
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="test-container">
      <h2 className="title">Take Your Test</h2>
      <div className="header">
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        <div className="webcam-container">
          <Webcam className="webcam-feed" videoConstraints={{ width: 150, height: 150, facingMode: 'user' }} />
        </div>
      </div>

      {submitted ? (
        <div className="result-container">
          <h3>{name}, Your Score: {score} out of {questions.length}</h3>
          <p>
            Time Taken: {Math.floor(totalTimeTaken / 60)} minutes and {totalTimeTaken % 60} seconds
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="test-form">
          {questions.length > 0 && (
            <div className="question-card">
              <h4>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</h4>
              {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                <div key={optionIndex} className="option">
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
            <button
              type="button"
              className="prev-button"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                type="button"
                className="next-button"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">Submit</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Test;
