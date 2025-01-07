import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import notificationReducer from "../reducers/notificationReducer";
import bookingsReducer from "../reducers/bookingReducer"

import { composeWithDevTools } from "@redux-devtools/extension";

export const reducers = combineReducers({
  auth: authReducer, 
  notification: notificationReducer,
  bookings: bookingsReducer
});


export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);