import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Booking() {
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [payment, setPayment] = useState('');
  const [address, setAddress] = useState('');
  const [dressName, setDressName] = useState('');
  const [bookingList, setBookingList] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  // Fetch all bookings on component mount
  useEffect(() => {
    Axios.get('http://localhost:3002/bookings')
      .then((response) => {
        setBookingList(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Add a new booking
  const addBooking = () => {
    Axios.post("http://localhost:3002/insert", {
      customerName,
      dressName,
      size,
      quantity,
      price,
      phoneNumber,
      payment,
      address
    }).then(() => {
      alert("Booking added successfully!");
      window.location.reload();
    }).catch(err => {
      console.error("Error adding booking:", err.response ? err.response.data : err.message);
      alert("Error adding booking: " + (err.response ? err.response.data : err.message));
    });
  };

  // Set the fields to edit the selected booking
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setCustomerName(booking.customerName);
    setDressName(booking.dressName);
    setSize(booking.size);
    setQuantity(booking.quantity);
    setPrice(booking.price);
    setPhoneNumber(booking.phoneNumber);
    setPayment(booking.payment);  // Set payment field
    setAddress(booking.address);
  };

  // Update the selected booking
  const updateBooking = () => {
    Axios.put("http://localhost:3002/update", {
      id: editingBooking._id,
      newCustomerName: customerName,
      newDressName: dressName,
      newSize: size,
      newQuantity: quantity,
      newPrice: price,
      newPhoneNumber: phoneNumber,
      newPayment: payment,  // Send updated payment field
      newAddress: address
    }).then(() => {
      alert("Booking updated successfully!");
      setEditingBooking(null);  // Clear the editing state
      window.location.reload();  // Reload bookings to reflect the changes
    }).catch(err => {
      console.error("Error updating booking:", err);
      alert("Error updating booking");
    });
  };

  // Delete a selected booking
  const deleteBooking = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then(() => {
      alert("Booking deleted successfully!");
      setBookingList(bookingList.filter((booking) => booking._id !== id));  // Update the local list
    }).catch(err => {
      console.error("Error deleting booking:", err);
      alert("Error deleting booking");
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Booking Management</h2>

      {/* Form to add/edit bookings */}
      <div className="card p-4">
        <h4>{editingBooking ? 'Edit Booking' : 'Add New Booking'}</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label">Customer Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="customerName" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dressName" className="form-label">Dress Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="dressName" 
              value={dressName} 
              onChange={(e) => setDressName(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="size" className="form-label">Size</label>
            <input 
              type="text" 
              className="form-control" 
              id="size" 
              value={size} 
              onChange={(e) => setSize(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input 
              type="number" 
              className="form-control" 
              id="quantity" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input 
              type="number" 
              className="form-control" 
              id="price" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input 
              type="text" 
              className="form-control" 
              id="phoneNumber" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </div>

          {/* Payment Method Dropdown */}
          <div className="mb-3">
            <label htmlFor="payment" className="form-label">Payment Method</label>
            <select 
              id="payment" 
              className="form-select" 
              value={payment} 
              onChange={(e) => setPayment(e.target.value)} 
            >
              <option value="">Select Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea 
              className="form-control" 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={editingBooking ? updateBooking : addBooking}
          >
            {editingBooking ? 'Update Booking' : 'Add Booking'}
          </button>
        </form>
      </div>

      {/* List of bookings */}
      <div className="mt-4">
        <h4>Bookings List</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Dress Name</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.customerName}</td>
                <td>{booking.dressName}</td>
                <td>{booking.size}</td>
                <td>{booking.quantity}</td>
                <td>{booking.price}</td>
                <td>{booking.phoneNumber}</td>
                <td>{booking.payment}</td> {/* Show payment method */}
                <td>{booking.address}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm" 
                    onClick={() => handleEdit(booking)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm ms-2" 
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Booking;
