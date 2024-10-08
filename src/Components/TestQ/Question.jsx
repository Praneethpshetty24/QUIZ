import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Adjust the import path based on your project structure
import './Question.css';

// Populate this array with your questions
const questionsToUpload = [
  { question: "Which planet is known for its prominent rings?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: "Saturn" },
  { question: "Who was the first female Prime Minister of the United Kingdom?", options: ["Margaret Thatcher", "Theresa May", "Angela Merkel", "Indira Gandhi"], correctAnswer: "Margaret Thatcher" }
];



function Question() {
  const [questionCount, setQuestionCount] = useState(0);
  
  const fetchQuestionCount = async () => {
    const questionsCollectionRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsCollectionRef);
    setQuestionCount(snapshot.size); // Set the count to the state
  };

  const uploadQuestions = async () => {
    const questionsCollectionRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsCollectionRef);
    const existingQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Fetch existing questions

    for (const question of questionsToUpload) {
      const matchingQuestion = existingQuestions.find(q => q.question === question.question);

      if (matchingQuestion) {
        // If the question already exists, update it
        try {
          const questionDocRef = doc(db, 'questions', matchingQuestion.id); // Get document reference by ID
          await updateDoc(questionDocRef, question); // Update the existing document
          console.log(`Updated question: ${question.question}`);
        } catch (error) {
          console.error('Error updating question:', error);
        }
      } else {
        // If the question doesn't exist, add it
        try {
          await addDoc(questionsCollectionRef, question);
          console.log(`Uploaded new question: ${question.question}`);
        } catch (error) {
          console.error('Error uploading question:', error);
        }
      }
    }

    alert('Questions uploaded/updated successfully!');
    fetchQuestionCount(); // Update the count after uploading
  };

  const deleteAllQuestions = async () => {
    const questionsCollectionRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsCollectionRef);

    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref)); // Create an array of delete promises

    try {
      await Promise.all(deletePromises); // Wait for all delete operations to complete
      console.log('All questions deleted successfully!');
      alert('All questions deleted successfully!');
      setQuestionCount(0); // Update the question count
    } catch (error) {
      console.error('Error deleting questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestionCount(); // Fetch question count when the component mounts
  }, []);

  return (
    <div className="question-container">
      <h2>Upload Questions</h2>
      <p>There are currently {questionCount} questions in the database.</p>
      <p>
        If you have contacted the team, the questions will be updated here. 
        Click the button below to upload the latest questions.
      </p>
      <button className="upload-button" onClick={uploadQuestions}>Upload Latest Questions</button>
      <button className="delete-button" onClick={deleteAllQuestions}>
        Delete All Questions
      </button>
    </div>
  );
}

export default Question;
