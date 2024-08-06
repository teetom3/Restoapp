const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // Add status field to handle confirmation/cancellation
});

module.exports = mongoose.model('Reservation', reservationSchema);

