// src/scripts/uploadQuestions.js
import { db } from '../../Firebase'; // Adjust the import based on your Firebase setup
import { collection, addDoc } from 'firebase/firestore';
import questions from './Qna'; // Import your questions

const uploadQuestions = async () => {
  const questionsCollectionRef = collection(db, 'questions'); // Your Firestore collection name

  for (const question of questions) {
    try {
      await addDoc(questionsCollectionRef, question);
      console.log(`Uploaded question: ${question.question}`);
    } catch (error) {
      console.error('Error uploading question:', error);
    }
  }
};

uploadQuestions();
