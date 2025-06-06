import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from './config'; // Import the config

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password, userType });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', userType); // Store user type
      const redirectPath = userType === 'student' ? '/student' : userType === 'instructor' ? '/instructor' : '/admin';
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials or server connection.');
    }
  };

  return (
    <div className="form-container" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="form-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <h1 className="text-center mb-4">Login</h1>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userType" className="form-label">User Type:</label>
            <select
              className="form-select"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          New user? <Link to="/signup" className="text-decoration-none">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
