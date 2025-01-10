import { ADD_BLOCKED_DATES, REMOVE_BLOCKED_DATES, UNBLOCK_DATES } from '../actions/blockingActions';

const initialState = {
  blockedDates: [],
};

const blockingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BLOCKED_DATES:
      return {
        ...state,
        blockedDates: [...new Set([...state.blockedDates, ...action.payload])],
      };

    case REMOVE_BLOCKED_DATES:
    case UNBLOCK_DATES:
      return {
        ...state,
        blockedDates: state.blockedDates.filter((date) => !action.payload.includes(date)),
      };

    default:
      return state;
  }
};

export default blockingReducer;
