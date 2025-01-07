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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} data-testid="form-container">
        <div>
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
        <div>
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
        <button type="submit" data-testid="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;