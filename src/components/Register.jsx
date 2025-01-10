import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions.jsx';
import { registerUser, fetchUserStatus } from '../actions/authActions.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      dispatch(setNotification({ message: 'Name must be at least 3 characters long', stateType: 'auth', requestStatus: 'error' }));
      return; 
    }
    else if (formData.password.length < 10) {
      dispatch(setNotification({ message: 'Password must be at least 10 characters long', stateType: 'auth', requestStatus: 'error' }));
      return; 
    }
    else if (formData.password !== formData.passwordConfirmation) {
      dispatch(setNotification({ message: 'Passwords do not match', stateType: 'auth', requestStatus: 'error' }));
      return; 
    }

    try {
      dispatch(setNotification({ message: 'Registering...', stateType: 'auth', requestStatus: 'loading' }));
      const { passwordConfirmation, ...requestData } = formData;
      await dispatch(registerUser(requestData));
      dispatch(setNotification({ message: 'Registration successful', stateType: 'auth', requestStatus: 'success' }));
      await dispatch(fetchUserStatus());
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setNotification({ message: 'Email is already in use', stateType: 'auth', requestStatus: 'error' }));
      } else {
        console.log(error)
        dispatch(setNotification({ message: 'An error occurred while registering. Please try again later.', stateType: 'auth', requestStatus: 'error' }));
      }
    }
  };

  return (
    <div className="form-container" data-testid="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirmation">Password Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            data-testid="passwordConfirmation-input"
            required
          />
        </div>

        <button type="submit" className="btn" data-testid="submit">
          Register
        </button>
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
          .form-group {
            margin-bottom: 15px;
          }
          label {
            text-align: left;
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
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          .btn:hover {
            background-color: #218838;
          }
        `}
      </style>
    </div>
  );
};

export default Register;
