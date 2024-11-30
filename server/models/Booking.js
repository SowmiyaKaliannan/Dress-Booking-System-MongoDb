const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customerName: String,
  dressName: String,
  size: String,
  quantity: Number,
  price: Number,
  phoneNumber: String,
  payment: String,
  address: String
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;

