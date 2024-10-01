import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBjMKNeMDucWjlKuCaqhJtA_t18lvElY4Y",
  authDomain: "quiz-e4cb6.firebaseapp.com",
  projectId: "quiz-e4cb6",
  storageBucket: "quiz-e4cb6.appspot.com",
  messagingSenderId: "192333827310",
  appId: "1:192333827310:web:3316ad5f3cc0d13191b7ff",
  measurementId: "G-F0QN18N2JM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);