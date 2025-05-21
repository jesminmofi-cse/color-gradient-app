import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, toggleMode, isLoggedIn, user, handleLogout }) => {
  const location = useLocation();

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const linkContainerStyle = {
    display: 'flex',
    gap: '20px',
  };

  const linkStyle = {
    color: darkMode ? '#f5f5f5' : '#333',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: '#0076ff',
    fontWeight: '700',
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: darkMode ? '#bb86fc' : '#6200ee',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  return (
    <nav style={navbarStyle}>
      <div>
        <h1 style={{ margin: 0, color: darkMode ? '#f5f5f5' : '#333' }}>
          🎨 Gradient App
        </h1>
      </div>

      <div style={linkContainerStyle}>
        {isLoggedIn ? (
          <>
            <Link
              to="/generator"
              style={location.pathname === '/generator' ? activeLinkStyle : linkStyle}
            >
              Generator
            </Link>
            <Link
              to="/history"
              style={location.pathname === '/history' ? activeLinkStyle : linkStyle}
            >
              History
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={location.pathname === '/login' ? activeLinkStyle : linkStyle}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={location.pathname === '/register' ? activeLinkStyle : linkStyle}
            >
              Register
            </Link>
          </>
        )}
      </div>

      <div style={userInfoStyle}>
        <button onClick={toggleMode} style={buttonStyle}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {isLoggedIn && (
          <>
            <span style={{ color: darkMode ? '#f5f5f5' : '#333' }}>
              {user?.name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              style={{
                ...buttonStyle,
                backgroundColor: darkMode ? '#cf6679' : '#b00020',
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;