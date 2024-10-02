// src/Components/Test/Test.jsx
import React, { useEffect, useState } from 'react';
import './Test.css';
import { db } from '../../Firebase';
import { collection, getDocs } from 'firebase/firestore';

function Test() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(questionsRef);
      const allQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const selectedQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
      setQuestions(selectedQuestions);
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctAnswers = 0;

    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    setScore(correctAnswers);
    setSubmitted(true);
  };

  return (
    <div className="test-container">
      <h2>Take Your Test</h2>
      {submitted ? (
        <div className="result-container">
          <h3>Your Score: {score} out of {questions.length}</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="test-form">
          {questions.map((question) => (
            <div key={question.id} className="question-card">
              <h4>{question.question}</h4>
              {question.options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={() => handleAnswerChange(question.id, option)}
                    required
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Test;
