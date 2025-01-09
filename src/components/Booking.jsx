import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchBookings, addBooking } from "../actions/bookingActions";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingName, setBookingName] = useState("");
  const dispatch = useDispatch();
  const { bookings, user, TIME_SLOTS } = useSelector((state) => ({
    bookings: state.bookings || [],
    user: state.auth,
    TIME_SLOTS: state.timeSlots
  }));

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const getBookingsForDate = (date) => {
    const dateString = date.toDateString();
    return bookings.filter((booking) => booking.date === dateString);
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const dailyBookings = getBookingsForDate(date);
    const bookedTimes = dailyBookings.map((booking) => booking.time);

    if (bookedTimes.length === TIME_SLOTS.length) return "day-full";
    if (bookedTimes.length > 0) return "day-partial";
    return null;
  };

  const handleDateChange = (date) => {
    const dailyBookings = getBookingsForDate(date);
    const bookedTimes = dailyBookings.map((booking) => booking.time);
    const freeTimes = TIME_SLOTS.filter((time) => !bookedTimes.includes(time));

    setSelectedDate(date);
    setAvailableTimes(freeTimes);
    setSelectedTime("");
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && bookingName) {
      const dateString = selectedDate.toISOString();
      dispatch(addBooking(dateString, bookingName, user.name, selectedTime));
      setSelectedDate(null);
      setSelectedTime("");
      setAvailableTimes([]);
      setBookingName("");
      dispatch(fetchBookings());
    } else {
      alert("Please enter a booking name and select a time.");
    }
  };

  return (
    <div className="booking-container">
      <h1>Booking Calendar</h1>
      <Calendar
        className="calendar"
        onClickDay={handleDateChange}
        tileClassName={tileClassName}
      />
      <p>Selected Date: {selectedDate ? selectedDate.toDateString() : "None"}</p>
      {selectedDate && availableTimes.length > 0 && (
        <div>
          <h3>Available Times</h3>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="" disabled>
              Select a time
            </option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <div>
            <input
              type="text"
              placeholder="Enter appointment name"
              value={bookingName}
              onChange={(e) => setBookingName(e.target.value)}
            />
          </div>
          <button onClick={handleBooking} disabled={!selectedTime || !bookingName}>
            Book
          </button>
        </div>
      )}
      {selectedDate && availableTimes.length === 0 && (
        <p>All time slots for this date are fully booked.</p>
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
          .day-full:hover,
          .day-partial:hover,
          .day-available:hover {
            opacity: 0.8;
          }
          select,
          input {
            margin: 10px 0;
          }
        `}
      </style>
    </div>
  );
}  

export default Booking;
