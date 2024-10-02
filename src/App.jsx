import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/SignUp/Login"; 
import Cred from "./Components/Main/Cred"
import Decision from "./Components/Decision/Decision";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cred" element={<Cred />} />
        <Route path="/decision" element={<Decision />} />
      </Routes>
    </Router>
  );
}

export default App;
