import React, { useState } from 'react';
import{useNavigate} from 'react-router-dom';

function Register({ darkMode ,setIsLoggedIn}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const style = {
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#eee' : '#222',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: darkMode ? '1px solid #555' : '1px solid #ccc',
    backgroundColor: darkMode ? '#555' : '#fff',
    color: darkMode ? '#eee' : '#222',
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    try{
      const res = await fetch('https://color-gradient-app.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name:formData.name,
          email:formData.email,
          password:formData.password,
      }),
      });
    const data = await res.json();
    if (res.ok && data.success) {
      setIsLoggedIn(true);
      navigate('/generator');
    }else {
      setMessage(data.msg || 'Registration failed');
    }
    }catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };
  

  return (
    <div style={style}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: darkMode ? '#bb86fc' : '#6200ee',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '20px', color: darkMode ? '#bb86fc' : '#6200ee' }}>
          {message}
        </p>
      )}
      <p style={{ marginTop: '20px' ,textAlign: 'center', cursor: 'pointer', color:"#007bff" }}
        onClick={() => navigate('/login')}
        >
        Already have an account? Login
      </p>

    </div>
  );
}

export default Register;
