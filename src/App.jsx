
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from './components/Login';
import Bookingslist from './components/Bookingslist.jsx';
import Booking from './components/Booking';
import Notification from './components/Notification';
import { fetchUserStatus} from './actions/authActions.jsx';
import './App.css'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserStatus());
  }, [dispatch]);

  const notification = useSelector(state => state.notification);

  return (
    <>
    <div>
      <Navbar/>
        <div>
          {notification && (
            <Notification/>
          )}
        </div>
        <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/bookings" element={<Bookingslist />} />
      </Routes>
    </div>
    </>
  )
}

export default App


