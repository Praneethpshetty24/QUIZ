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
import Chat from "./Components/Home/Features/Chat";



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
        <Route path="/chat" element={<Chat/>} />
       
      </Routes>
    </Router>
  );
}

export default App;
