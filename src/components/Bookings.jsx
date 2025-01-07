import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import { fetchBookings } from '../actions/bookingActions';

const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const bookings = useSelector((state) => state.bookings || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const isDateBooked = (date) => {
    const dateString = date.toDateString(); 
    return bookings.includes(dateString);
  };

  const handleDateClick = (date) => {
    const dateString = date.toDateString(); 
    if (bookings.includes(dateString)) {
      setSelectedDate(dateString);
      setSelectedBookings([{ name: `Booking for ${dateString}`, time: 'All Day' }]); 
    } else {
      setSelectedDate(dateString);
      setSelectedBookings([]);
    }
  };

  return (
    <div data-testid="main-container">
      <h1>Bookings Calendar</h1>
      <p>Click on a date to view bookings</p>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) => {
          if (view === 'month' && isDateBooked(date)) {
            return 'booked-date';
          }
        }}
      />
      {selectedDate && (
        <div className="booking-details">
          <h2>Bookings for {selectedDate}</h2>
          {selectedBookings.length > 0 ? (
            <ul>
              {selectedBookings.map((booking, index) => (
                <li key={index}>
                  {booking.name} at {booking.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings for this date.</p>
          )}
        </div>
      )}
      <style>
        {`
          .booked-date {
            background: lightblue;
            color: white;
          }
          .booking-details {
            margin-top: 20px;
          }
          .booking-details ul {
            list-style: none;
            padding: 0;
          }
          .booking-details li {
            margin: 5px 0;
          }
        `}
      </style>
    </div>
  );
};

export default Bookings;
