import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GradientGenerator = ({ darkMode }) => {
  const [color1, setColor1] = useState('#ffee00');
  const [color2, setColor2] = useState('#0000ff');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleViewHistory = () => {
    navigate('/history');
  };

  const handleColor1Change = (e) => setColor1(e.target.value);
  const handleColor2Change = (e) => setColor2(e.target.value);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please login to save your gradient');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/gradients',
        {
          name: 'Custom Gradient',
          color1:color1,
          color2:color2,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setMessage('Gradient saved successfully!');
      } else {
        setMessage('Failed to save gradient');
      }
    } catch (error) {
      console.error('Error saving gradient:', error.response || error);
      setMessage('Error saving gradient');
    }
  };

  const gradientStyle = {
    background: `linear-gradient(to left, ${color1}, ${color2})`,
    height: '150px',
    borderRadius: '10px',
    marginTop: '20px',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
  };

  const containerStyle = {
    maxWidth: '500px',
    padding: '30px',
    margin: 'auto',
    textAlign: 'center',
    color: darkMode ? '#fff' : '#222',
    borderRadius: '18px',
    boxShadow: '0 0 15px rgba(0,0,3,0.3)',
  };

  const inputStyle = {
    marginLeft: '10px',
    cursor: 'pointer',
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
    border: `1px solid ${darkMode ? '#0076ff' : '#ccc'}`,
    borderRadius: '14px',
    padding: '3px 6px',
    width: '100px',
    textTransform: 'lowercase',
  };

  const buttonStyle = {
    marginTop: '10px',
    borderRadius: '10px',
    padding: '10px 10px',
    backgroundColor: '#0076ff',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={handleViewHistory}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: darkMode ? '#bb86fc' : '#6200ee',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        View History
      </button>

      <h2>Create Your Gradient</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Color 1:
          <input
            type="color"
            value={color1}
            onChange={handleColor1Change}
            style={{ ...inputStyle, width: '40px', padding: 0 }}
          />
        </label>
        <input
          type="text"
          value={color1}
          onChange={handleColor1Change}
          style={inputStyle}
          placeholder="#ff0000 or red"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Color 2:
          <input
            type="color"
            value={color2}
            onChange={handleColor2Change}
            style={{ ...inputStyle, width: '40px', padding: 0 }}
          />
        </label>
        <input
          type="text"
          value={color2}
          onChange={handleColor2Change}
          style={inputStyle}
          placeholder="#ffffff"
        />
      </div>

      <div style={gradientStyle}></div>

      <button onClick={handleSave} style={buttonStyle}>
        Save Gradient
      </button>

      <p style={{ marginTop: '10px' }}>{message}</p>
    </div>
  );
};

export default GradientGenerator;
