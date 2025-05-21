import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/login/Login';
import GradientGenerator from './components/GradientGenerator';
import History from './components/History'; // make sure this exists
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on mount and whenever login state might change
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // coerces token presence to true/false
  }, []);

  const toggleMode = () => setDarkMode(!darkMode);

  const appStyle = {
    backgroundColor: darkMode ? '#121212' : '#f5f5f5',
    color: darkMode ? '#f5f5f5' : '#121212',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease',
  };

  return (
    <Router>
      <div style={appStyle}>
        <button
          onClick={toggleMode}
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: darkMode ? '#bb86fc' : '#6200ee',
            color: '#fff',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
        >
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>

        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public routes */}
          <Route path="/login" element={<Login darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected routes */}
          <Route
            path="/generator"
            element={isLoggedIn ? <GradientGenerator darkMode={darkMode} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/history"
            element={isLoggedIn ? <History darkMode={darkMode} /> : <Navigate to="/login" replace />}
          />

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/generator" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
