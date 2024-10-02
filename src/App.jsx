import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/SignUp/Login"; 
import Cred from "./Components/Main/Cred"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cred" element={<Cred />} />
      </Routes>
    </Router>
  );
}

export default App;
