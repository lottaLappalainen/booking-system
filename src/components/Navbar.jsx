import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions';
import { logoutUser } from '../actions/authActions';

const Navbar = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const userRole = user.role;

  const handleLogout = async () => {
    try {
      dispatch(setNotification({ message: 'Logging out...', stateType: 'auth', requestStatus: 'loading' }));

      await dispatch(logoutUser());

      dispatch(setNotification({ message: 'Logout successful', stateType: 'auth', requestStatus: 'success' }));

      navigateTo('/login');
    } catch (error) {
      console.error('Error:', error);
      dispatch(setNotification({ message: 'Problem with logging out', stateType: 'auth', requestStatus: 'error' }));
    }
  };

  return (
    <>
      <div className="navbar-container" data-testid="navbar-container">
        <ul className="navbar-list">
          {userRole === 'guest' && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                  data-testid="login-link"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                  data-testid="register-link"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          {userRole === 'customer' && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                >
                  Booking
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={handleLogout}
                  data-testid="logout"
                  className="logout-link"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <li>
                <NavLink
                  to="/bookings"
                  className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                >
                  Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={handleLogout}
                  data-testid="logout"
                  className="logout-link"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="role-display" data-testid="role-value">
          Role: {userRole}
        </div>
      </div>
      <div className="navbar-spacing"></div>

      <style>
        {`
          .navbar-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.7); 
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            z-index: 1000;
          }

          .navbar-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 30px;
          }

          .navbar-list a {
            color: white;
            text-decoration: none;
            font-size: 18px; 
            transition: color 0.3s ease;
          }

          .navbar-list a:hover {
            color: rgba(105, 226, 202, 0.9); 
          }

          .role-display {
            font-size: 16px;
            color: rgba(105, 226, 202, 0.9);
            margin-right: 50px;
          }

          .navbar-spacing {
            height: 30px;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
