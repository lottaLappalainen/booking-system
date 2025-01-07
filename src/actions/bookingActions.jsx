import axios from "axios";
import { setNotification } from "./notificationActions";

export const FETCH_BOOKINGS = "FETCH_BOOKINGS";
export const FETCH_BOOKINGS_BY_DATE = "FETCH_BOOKINGS_BY_DATE";
export const ADD_BOOKING = "ADD_BOOKING";

export const fetchBookings = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/api/bookings");
    dispatch({
      type: FETCH_BOOKINGS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

export const fetchBookingsByDate = (date) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/bookings${date}`);
      dispatch({
        type: FETCH_BOOKINGS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

export const addBooking = (date, bookingName, userName, bookingTime) => async (dispatch) => {
  try {
    dispatch(setNotification({ message: 'Creating booking...', requestStatus: 'loading' }));
    console.log(date, bookingName, userName, bookingTime)
    const response = await axios.post("http://localhost:3001/api/bookings", { date, bookingName, userName, bookingTime });
    dispatch({
      type: ADD_BOOKING,
      payload: response.data,
    });
    console.log(response)
    dispatch(setNotification({ message: 'Booking was created succesfuly', requestStatus: 'success' }));
  } catch (error) {
    dispatch(setNotification({ message: 'Error in booking creation', requestStatus: 'error' }));
    console.error("Error adding booking:", error);
  }
};
