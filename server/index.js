const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import the Booking model
const BookingModel = require('./models/Booking');

// Middleware setup
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:admin@cluster0.ry51b.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define routes
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).send("Error fetching bookings");
  }
});

app.post('/insert', async (req, res) => {
  const newBooking = new BookingModel({
    customerName: req.body.customerName,
    dressName: req.body.dressName,
    size: req.body.size,
    quantity: req.body.quantity,
    price: req.body.price,
    phoneNumber: req.body.phoneNumber,
    payment: req.body.payment,
    address: req.body.address
  });

  try {
    await newBooking.save();
    res.send("Booking added successfully!");
  } catch (err) {
    console.error("Error adding booking:", err);
    res.status(500).send("Error adding booking");
  }
});

app.put('/update', async (req, res) => {
  const { id, newCustomerName, newDressName, newSize, newQuantity, newPrice, newPhoneNumber, newPayment, newAddress } = req.body;

  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(id, {
      customerName: newCustomerName,
      dressName: newDressName,
      size: newSize,
      quantity: newQuantity,
      price: newPrice,
      phoneNumber: newPhoneNumber,
      payment: newPayment,
      address: newAddress
    }, { new: true });

    res.send("Booking updated successfully!");
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).send("Error updating booking");
  }
});

// DELETE: Delete a booking by ID
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    // Attempt to find and remove the booking
    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (deletedBooking) {
      res.status(200).send("Booking deleted successfully");
    } else {
      res.status(404).send("Booking not found");
    }
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).send("Error deleting booking");
  }
});

// Start server
app.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});
