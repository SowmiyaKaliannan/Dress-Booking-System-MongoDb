import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const navigate = useNavigate();

  // dress list with price, discount, and image paths
  const dresses = [
    { 
      id: 1, 
      name: 'Sarees', 
      description: 'Perfect for traditions', 
      price: 1299, 
      discount: 10, 
      imageSrc: '/images/saree.png'  
    },
    { 
      id: 2, 
      name: 'Blue Gown', 
      description: 'Elegant for formal events', 
      price: 2499, 
      discount: 15, 
      imageSrc: '/images/bluegown.png' 
    },
    { 
      id: 3, 
      name: 'T shirts', 
      description: 'Comfortable and stylish', 
      price: 3199, 
      discount: 5, 
      imageSrc: '/images/tshirt.png'  
    },
    { 
      id: 4, 
      name: 'White Wedding Dress', 
      description: 'For your special day', 
      price: 5999, 
      discount: 20, 
      imageSrc: '/images/white weddingdress.png'  
    },
    { 
      id: 5, 
      name: 'Kurtis', 
      description: 'Comfortable and stylish', 
      price: 1799, 
      discount: 12, 
      imageSrc: '/images/kurtis.png' 
    }
  ];

  // Cart state to track added items
  const [cart, setCart] = useState([]);

  const handleBuy = (dress) => {
    // Add dress to cart
    setCart([...cart, dress]);
  };

  const handleGoToCart = () => {
    // Navigate to cart page with cart items
    navigate('/cart', { state: { cart } });
  };

  const handleGoToBooking = (dress) => {
    // Navigate to booking page with selected dress as state
    navigate('/booking', { state: { dressName: dress.name } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Welcome to the Dress Booking System</h2>
      <p className="text-center mb-4 text-muted">Choose your favorite dress and proceed to book it!</p>

      <div className="row justify-content-center">
        {dresses.map((dress) => {
          const discountedPrice = dress.price - (dress.price * dress.discount) / 100;

          return (
            <div className="col-md-4 col-sm-6 mb-4" key={dress.id}>
              <div className="card shadow-lg h-100">
                <img
                  src={dress.imageSrc}  
                  className="card-img-top"
                  alt={dress.name}
                  style={{
                    width: '100%',  // Ensures the image takes full width of the card
                    height: '200px',  // Set fixed height for uniform image size
                    objectFit: 'contain'  // Ensures the full image is visible without cropping
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center text-primary">{dress.name}</h5>
                  <p className="card-text text-center">{dress.description}</p>
                  <p className="card-text text-center text-muted">
                    <strike>₹{dress.price}</strike> ₹{discountedPrice.toFixed(2)} <span className="text-success">(Discount: {dress.discount}%)</span>
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-success mr-3"
                      onClick={() => handleGoToBooking(dress)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleBuy(dress)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Button with Margin */}
      <div className="text-center mt-4">
        <button
          className="btn btn-warning mt-3"
          onClick={handleGoToCart}
          disabled={cart.length === 0} // Disable if cart is empty
        >
          Go to Cart ({cart.length})
        </button>
      </div>
    </div>
  );
}

export default Home;
