import express from 'express';
import {
  checkStatus,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.mjs';
import {
  getBookings,
  createBooking,
  getBookingsByDate
} from '../controllers/booking.mjs';
import {
  requireNotAuthenticated,
} from '../middleware/auth.mjs';
import requireJson from '../middleware/requireJson.mjs';

const router = express.Router();

router.route('/check-status').get(checkStatus);

router.route('/login').post(requireJson, requireNotAuthenticated, loginUser);

router.route('/logout').get(logoutUser);

router.route('/register').post(requireJson, requireNotAuthenticated, registerUser);

router.get('/bookings', getBookings);
router.get('/bookings/:date', getBookingsByDate);
router.post('/bookings', createBooking);

export default router;
