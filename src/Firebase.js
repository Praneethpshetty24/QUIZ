// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEeojPeB5pLBBTpOhqcnBvKC_rA3kWz1A",
  authDomain: "quiz-tech-5193c.firebaseapp.com",
  projectId: "quiz-tech-5193c",
  storageBucket: "quiz-tech-5193c.appspot.com",
  messagingSenderId: "363035779376",
  appId: "1:363035779376:web:37df73d6aafa7acb7de8f5",
  measurementId: "G-3E3GL6H05E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export Firestore, Auth, and Storage
export { db, auth, storage };
