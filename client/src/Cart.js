import React from 'react';
import { useLocation } from 'react-router-dom';

function Cart() {
  const location = useLocation();
  const cart = location.state?.cart || []; // Get cart items passed via navigation

  const getTotalPrice = () => {
    return cart.reduce((total, dress) => {
      const discountedPrice = dress.price - (dress.price * dress.discount) / 100;
      return total + discountedPrice;
    }, 0);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty. Add some items to the cart!</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((dress, index) => {
              const discountedPrice = dress.price - (dress.price * dress.discount) / 100;

              return (
                <li key={index} className="list-group-item">
                  <h5>{dress.name}</h5>
                  <p>{dress.description}</p>
                  <p>
                    <strike>₹{dress.price}</strike> ₹{discountedPrice.toFixed(2)} (Discount: {dress.discount}%)
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="text-center mt-4">
            <h4>Total Price: ₹{getTotalPrice().toFixed(2)}</h4>
            <button className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
