import Booking from '../models/booking.mjs';

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const createBooking = async (req, res) => {
    const { date, bookingName, userName } = req.body;
  
    if (!date || !bookingName || !userName) {
      return res.status(400).json({ error: 'Date, Booking Name, and User Name are required' });
    }
  
    try {
      const bookingDate = new Date(date);
      if (bookingDate < new Date()) {
        return res.status(400).json({ error: 'Cannot book a date in the past' });
      }
  
      const newBooking = new Booking({ date: bookingDate, bookingName, userName });
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Date is already booked' });
      } else {
        res.status(500).json({ error: 'Failed to create booking' });
      }
    }
  };
  
