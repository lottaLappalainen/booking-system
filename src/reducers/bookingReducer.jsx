import { FETCH_BOOKINGS, ADD_BOOKING } from "../actions/bookingActions";

const initialState = [];

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return action.payload.map((booking) => new Date(booking.date).toDateString());
    case ADD_BOOKING:
      return [...state, new Date(action.payload.date).toDateString()];
    default:
      return state;
  }
};

export default bookingReducer;
