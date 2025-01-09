import { TOGGLE_TIMESLOT, ADD_TIMESLOT, REMOVE_TIMESLOT } from '../actions/timeSlotActions';

const initialState = ['12:00', '14:00', '16:00', '18:00', '20:00'];

const timeSlotReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TIMESLOT:
      return state.includes(action.payload)
        ? state.filter((time) => time !== action.payload)
        : [...state, action.payload];
    case ADD_TIMESLOT:
      return [...state, action.payload];
    case REMOVE_TIMESLOT:
      return state.filter((time) => time !== action.payload);
    default:
      return state;
  }
};

export default timeSlotReducer;
