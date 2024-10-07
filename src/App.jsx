import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/SignUp/Login"; 
import Cred from "./Components/Main/Cred"
import Decision from "./Components/Decision/Decision";
import Home from "./Components/Home/Home";
import Test from "./Components/TestQ/Test";
import Leaderboard from "./Components/Home/Features/Leaderboard";
import Question from "./Components/TestQ/Question";
import Admin from "./Components/Admin/Admin";
import Ai from "./Components/Home/Features/Ai";
import Score from "./Components/Home/Features/Score";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cred" element={<Cred />} />
        <Route path="/decision" element={<Decision />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/Question" element={<Question />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/score" element={<Score />} />
      
      </Routes>
    </Router>
  );
}

export default App;
