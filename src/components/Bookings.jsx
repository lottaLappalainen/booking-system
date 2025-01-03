import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);

  // Mock bookings data (replace with your API call to fetch bookings)
  useEffect(() => {
    setBookings([
      { date: '2025-01-05', name: 'Meeting with Alice', time: '10:00 AM' },
      { date: '2025-01-10', name: 'Project Deadline', time: '2:00 PM' },
      { date: '2025-01-15', name: 'Dentist Appointment', time: '11:00 AM' },
    ]);
  }, []);

  // Function to check if a date has bookings
  const isDateBooked = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return bookings.some((booking) => booking.date === dateString);
  };

  // Handle date click
  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const dailyBookings = bookings.filter((booking) => booking.date === dateString);
    setSelectedDate(dateString);
    setSelectedBookings(dailyBookings);
  };

  return (
    <div data-testid="main-container">
      <h1>Bookings Calendar</h1>
      <p>Click on a date to view bookings</p>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) => {
          // Add custom class for booked dates
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
