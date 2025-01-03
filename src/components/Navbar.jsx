import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const userRole = "customer"

  const handleLogout = async () => {
    console.log("logout")
  };

  return (
    <div data-testid="navbar-container">
      <ul>
        {userRole === 'guest' && (
          <React.Fragment>
            <li><Link to="/login" data-testid="login-link">Login</Link></li>
            <li><Link to="/register" data-testid="register-link">Register</Link></li>
          </React.Fragment>
        )}
        {userRole === 'customer' && (
          <React.Fragment>
            <li><Link to="/">Booking</Link></li>
            <li><Link to="/bookings" >Bookings</Link></li>
            <li><Link to="#" onClick={handleLogout} data-testid="logout">Logout</Link></li>
          </React.Fragment>
        )}
        {userRole === 'admin' && (
          <React.Fragment>
            <li><Link to="/bookings" >Bookings</Link></li>
            <li><Link to="#" onClick={handleLogout} data-testid="logout">Logout</Link></li>
          </React.Fragment>
        )}
      </ul>
      <div data-testid="role-value">
        {userRole}
      </div>
    </div>
  );
};

export default Navbar;