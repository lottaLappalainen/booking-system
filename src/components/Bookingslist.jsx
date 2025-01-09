import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import "react-calendar/dist/Calendar.css";
import { fetchBookings } from "../actions/bookingActions";

const Bookingslist = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const bookings = useSelector((state) => state.bookings || []);
  const dispatch = useDispatch();

  const TIME_SLOTS = ["12:00", "14:00", "16:00", "18:00", "20:00"];

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const getBookingsForDate = (date) => {
    const dateString = date.toDateString();
    return bookings.filter((booking) => booking.date === dateString);
  };

  const handleDateClick = (date) => {
    const dailyBookings = getBookingsForDate(date);
    console.log(dailyBookings)
    setSelectedDate(date.toDateString());
    setSelectedBookings(dailyBookings);
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const dailyBookings = getBookingsForDate(date);
    const bookedTimes = dailyBookings.map((booking) => booking.time);

    if (bookedTimes.length === TIME_SLOTS.length) return "day-full";
    if (bookedTimes.length > 0) return "day-partial";
    return null;
  };

  return (
    <div className="booking-container">
      <h1>Bookings</h1>
      <p>Click on a date to view bookings</p>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
      />
      {selectedDate && (
        <div className="booking-details">
          <h2>Bookings for {selectedDate}</h2>
          {selectedBookings.length > 0 ? (
            <ul>
              {selectedBookings.map((booking, index) => (
                <li key={index}>
                  At {booking.time} appointment "{booking.name}" booked by{" "}
                  {booking.userName}
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
          .booking-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .day-full {
            background-color:rgb(212, 124, 124);
            color: white;
          }
          .day-partial {
            background-color: #fff5b7; 
            color: black;
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

export default Bookingslist;
