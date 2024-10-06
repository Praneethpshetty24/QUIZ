import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Test.css';

function Test() {
  const { state } = useLocation();
  const { email, uuiId, name } = state || {};
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0); // Total time taken in seconds
  const startTimeRef = useRef(Date.now());
  const timeoutRef = useRef(null);
  const webcamRef = useRef(null); // Reference for the webcam feed
  const navigate = useNavigate();

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
    alert('Switching tabs will automatically submit your test!');

    timeoutRef.current = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleSubmit(); // Auto-submit if the tab is hidden (i.e., user switched tabs)
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timeoutRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    clearInterval(timeoutRef.current);

    let correctAnswers = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    const endTime = Date.now();
    const totalTimeTakenInSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
    setTotalTimeTaken(totalTimeTakenInSeconds);
    setScore(correctAnswers);
    setSubmitted(true);

    try {
      const testResultsRef = collection(db, 'userTestResults');
      await addDoc(testResultsRef, {
        name,
        email,
        uuiId,
        score: correctAnswers,
        totalQuestions: questions.length,
        timeTaken: totalTimeTakenInSeconds,
        timestamp: new Date(),
      });

      console.log('Test results saved successfully');
    } catch (error) {
      console.error('Error saving test results:', error.message);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

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

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="test-container">
      <h2 className="title">Take Your Test</h2>
      <div className="header">
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        <div className="webcam-container">
          <Webcam
            className="webcam-feed"
            ref={webcamRef}
            videoConstraints={{ width: 150, height: 150, facingMode: 'user' }}
          />
        </div>
      </div>

      {submitted ? (
        <div className="result-container">
          <h3>{name}, Your Score: {score} out of {questions.length}</h3>
          <p>Time Taken: {Math.floor(totalTimeTaken / 60)} minutes and {totalTimeTaken % 60} seconds</p>
          <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
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
