import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FETCH_USER_STATUS } from '../actions/authActions';

const initialState = {
  role: 'guest',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        role: action.payload.user.role,
      };
    case LOGOUT_USER:
      return {
        ...state,
        role: 'guest',
      };
    case REGISTER_USER:
      return {
        ...state,
        role: action.payload.user.role,
      };
    default:
      return state;
  }
};

export default authReducer;