import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { setNotification } from '../actions/notificationActions';
import { loginUser, fetchUserStatus } from '../actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      dispatch(setNotification({ message: 'Invalid email address', stateType: 'auth', requestStatus: 'error' }));
      return;
    }
    if (formData.password.length < 10) {
      dispatch(setNotification({ message: 'Password must be at least 10 characters long', stateType: 'auth', requestStatus: 'error' }));
      return;
    }

    try {
      dispatch(setNotification({ message: 'Logging in...', stateType: 'auth', requestStatus: 'loading' }));
      await dispatch(loginUser(formData));
      await dispatch(fetchUserStatus());
      dispatch(setNotification({ message: 'Login successful', stateType: 'auth', requestStatus: 'success' }));
      navigateTo('/');
    } catch (error) {
      dispatch(setNotification({ message: 'An error occurred while logging in. Please try again later.', stateType: 'auth', requestStatus: 'error' }));
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} data-testid="form-container">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password-input"
            required
          />
        </div>
        <button type="submit" className="btn" data-testid="submit">Login</button>
      </form>
      <style>
        {`
          .form-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }
          label {
            text-align: left;
          }
          .form-group {
            margin-bottom: 15px;
          }
          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
          }
          .form-group input {
            width: 94%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .btn {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
