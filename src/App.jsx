
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from './components/Login';
import Bookings from './components/Bookings';
import Booking from './components/Booking';
import './App.css'

const App = () => {

  return (
    <>
    <div>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </div>
    </>
  )
}

export default App


