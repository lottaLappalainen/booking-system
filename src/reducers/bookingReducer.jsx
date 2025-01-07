import { FETCH_BOOKINGS, ADD_BOOKING, FETCH_BOOKINGS_BY_DATE } from "../actions/bookingActions";

const initialState = [];

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS:
        return action.payload.map((booking) => ({
            date: new Date(booking.date).toDateString(), 
            time: booking.bookingTime,
            name: booking.bookingName,
            userName: booking.userName,
          }));
    case FETCH_BOOKINGS_BY_DATE:
      return action.payload.map((booking) => new Date(booking.date).toDateString());
    case ADD_BOOKING:
      return [...state, new Date(action.payload.date).toDateString()];
    default:
      return state;
  }
};

export default bookingReducer;
