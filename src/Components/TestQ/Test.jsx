import React, { useState, useEffect, useRef } from 'react';
import './Test.css';
import Webcam from 'react-webcam';

function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [warning, setWarning] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [awayTime, setAwayTime] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const dummyQuestions = [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctAnswer: "Paris"
      },
      {
        id: 2,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
      }
    ];

    setQuestions(dummyQuestions);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        if (!warning) {
          alert('You have switched tabs! The test will automatically be submitted in 5 minutes if you do not return.');
        }
      } else {
        setIsTabActive(true);
        setAwayTime(0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [warning]);

  useEffect(() => {
    if (!isTabActive) {
      timeoutRef.current = setInterval(() => {
        setAwayTime((prevAwayTime) => {
          if (prevAwayTime >= 299) {
            clearInterval(timeoutRef.current);
            handleSubmit();
            setWarning(true);
            alert("Test automatically submitted after 5 minutes of inactivity.");
          }
          return prevAwayTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(timeoutRef.current);
    }

    return () => clearInterval(timeoutRef.current);
  }, [isTabActive]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let correctAnswers = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    setScore(correctAnswers);
    setSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="test-container">
      <h2 className="title">Take Your Test</h2>
      <div className="header">
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        <div className="webcam-container">
          <Webcam
            className="webcam-feed"
            videoConstraints={{ width: 150, height: 150, facingMode: 'user' }}
          />
        </div>
      </div>

      {warning && (
        <div className="warning-message">
          <h3>Test Ended Due to Inactivity!</h3>
          <p>You switched tabs for too long, and the test has been automatically submitted.</p>
        </div>
      )}

      {submitted ? (
        <div className="result-container">
          <h3>Your Score: {score} out of {questions.length}</h3>
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
            <button type="button" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="prev-button">
              Previous
            </button>
            <button type="button" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="next-button">
              Next
            </button>
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
