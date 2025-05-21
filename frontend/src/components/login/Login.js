import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ darkMode, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    console.log("Sending login request with:", { email, password });
    try {
      const res = await fetch('https://color-gradient-app.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      let data;
      try {
       data = await res.json();
       } catch (err) {
         const text=await res.text();
         console.error('Not Json:', text);
         setError('Server did not return valid JSON');
         setLoading (false);
         return;

       }
      if (res.ok && data?.success) {
           setIsLoggedIn(true);
           navigate('/generator');
      }else{
        setError(data.msg || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:',err);
      setError(err.msg||'Something went wrong.');
    } finally{
      setLoading(false);
    }
  };
  const inputStyle = {
    backgroundColor: darkMode ? '#2a2a2a' : '#f0f4f8',
    color: darkMode ? '#eee' : '#000',
    border: darkMode?'1px solid #555': '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px',
    width: '90%',
  };
  const formStyle = {
  backgroundColor: darkMode ? '#1f1f1f' : '#ffffff',
  color: darkMode ? '#eee' : '#000',
  padding: '40px 30px',
  borderRadius: '10px',
  boxShadow: darkMode
    ? '0px 4px 15px rgba(255, 255, 255, 0.05)'
    : '0px 4px 20px rgba(0, 0, 0, 0.1)',
  width: '350px',
  maxWidth: '90%',
};


  return (
    <div className={`login-container ${darkMode ? 'dark' : '#121212'}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: darkMode ? '#121212' : '#f0f4f8',
      }}>
      <form className="login-form" style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ color: darkMode ? '#fff' : '#000' }}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        {error && (
          <p style={{ color: 'red',textAlign:'center' }}>{error}</p>
        )}
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '95%',
            padding: '10px',
            backgroundColor: loading ? '#6c757d':'#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '15px',
          }}
        >
          {loading ? "Logging in...." : "Login"}
        </button>

        <p style={{ marginTop: '150px', color: darkMode ? '#ccc' : '#000' }}>
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ cursor: 'pointer', color: '#007bff' }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
