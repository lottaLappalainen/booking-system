import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, 
  },
  userName: {
    type: String,
    required: true,
  },
  bookingName: {
    type: String,
    required: true,
  },
  bookingTime: {
    type: String,
    required: true,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
