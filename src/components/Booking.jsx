import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchBookings, addBooking } from "../actions/bookingActions";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingName, setBookingName] = useState("");
  const dispatch = useDispatch();
  const { bookings, role, user } = useSelector((state) => ({
    bookings: state.bookings,
    role: "customer", // Replace this with the actual user role from the state if available
    user: state.auth, // Replace with the actual user object from the state
  }));

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = () => {
    if (selectedDate && bookingName && selectedDate >= new Date()) {
      dispatch(addBooking(selectedDate, bookingName, user.name));
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && bookings.includes(date.toDateString())) {
      return "booked-day";
    }
    return null;
  };

  const tileDisabled = ({ date, view }) => {
    return (
      view === "month" &&
      (date < new Date().setHours(0, 0, 0, 0) ||
        bookings.includes(date.toDateString()))
    );
  };

  return (
    <div data-testid="main-container">
      <h1>Booking Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
      />
      <p>
        Selected Date:{" "}
        {selectedDate ? selectedDate.toDateString() : "None"}
      </p>
      <input
        type="text"
        placeholder="Enter booking name"
        value={bookingName}
        onChange={(e) => setBookingName(e.target.value)}
      />
      <button
        onClick={handleBooking}
        disabled={!selectedDate || !bookingName || role !== "customer"}
      >
        Book
      </button>

      <style>
        {`
          .booked-day {
            background-color: #ffcccb;
            color: white;
          }
          .booked-day:hover {
            background-color: #ff9999;
          }
        `}
      </style>
    </div>
  );
};

export default Booking;
