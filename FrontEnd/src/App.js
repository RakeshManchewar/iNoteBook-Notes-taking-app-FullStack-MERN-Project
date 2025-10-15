import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <NoteState>
      <Router>
        <div className="min-vh-100 bg-light">
          <Navbar />
          <Alert alert={alert} />

          <div className="container py-4">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;