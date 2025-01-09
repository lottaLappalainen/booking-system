export const TOGGLE_TIMESLOT = 'TOGGLE_TIMESLOT';
export const ADD_TIMESLOT = 'ADD_TIMESLOT';
export const REMOVE_TIMESLOT = 'REMOVE_TIMESLOT';

export const toggleTimeSlot = (time) => ({
  type: TOGGLE_TIMESLOT,
  payload: time,
});

export const addTimeSlot = (time) => ({
  type: ADD_TIMESLOT,
  payload: time,
});

export const removeTimeSlot = (time) => ({
  type: REMOVE_TIMESLOT,
  payload: time,
});
