import Booking from '../models/booking.mjs';

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getBookingsByDate = async (req, res) => {
    const { date } = req.params;
  
    const parsedDate = new Date(date);
  
    try {
      // Filter bookings for the given date. We compare the date without time.
      const bookings = await Booking.find({
        date: {
          $gte: parsedDate.setHours(0, 0, 0, 0),
          $lt: parsedDate.setHours(23, 59, 59, 999), 
        }
      });
      return res.status(200).json(bookings);
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

export const createBooking = async (req, res) => {
    const { date, bookingName, userName, bookingTime } = req.body;
  
    if (!date || !bookingName || !userName || !bookingTime) {
      return res.status(400).json({ error: 'Date, Booking Name, and User Name, Booking time are required' });
    }
  
    try {
      const bookingDate = new Date(date);
  
      const newBooking = new Booking({ date: bookingDate, bookingName, userName, bookingTime });
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
      }
  };
  
