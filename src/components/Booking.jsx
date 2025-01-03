import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const role = "customer";

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = () => {
    if (
      selectedDate &&
      !bookedDates.includes(selectedDate.toDateString()) &&
      selectedDate >= new Date()
    ) {
      setBookedDates((prevDates) => [...prevDates, selectedDate.toDateString()]);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && bookedDates.includes(date.toDateString())) {
      return "booked-day";
    }
    return null;
  };

  const tileDisabled = ({ date, view }) => {
    // Disable dates in the past and already booked dates
    return (
      view === "month" &&
      (date < new Date().setHours(0, 0, 0, 0) ||
        bookedDates.includes(date.toDateString()))
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
      <button
        onClick={handleBooking}
        disabled={!selectedDate || role !== "customer"}
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
