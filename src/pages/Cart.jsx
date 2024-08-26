import React, { useContext, useState } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [count, setCount] = useState();

  function calculateTotal() {
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.amount;
    });
    const shipping = 5.00;
    const tax = subtotal * 0.1;
    const orderTotal = subtotal + shipping + tax;
    return { subtotal, shipping, tax, orderTotal };
  };

  const totals = calculateTotal();

  function handleNavigate(event) {
    event.preventDefault();
    navigate('/login')
  }

  return (
    <div className="max-w-[1160px] mx-auto my-10 p-6 bg-white rounded-lg">
      <h2 className="text-4xl font-semibold border-b-2 pb-5 text-gray-700 mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="flex justify-between">
          <div className="w-2/2">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-4 border-b pb-4">
                <div className="flex items-center space-x-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-[20px] font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-[16px] mt-2 mb-2 text-gray-500">{item.company}</p>
                    <p className="text-md text-gray-500 flex items-center">
                      Color:
                      <span
                        style={{ backgroundColor: item.color }}
                        className="ml-2 w-4 h-4 rounded-full inline-block"
                      ></span>
                    </p>
                  </div>
                </div>
                <div className="flex mr-32 ml-32 items-center space-x-4">
                  <select
                  onChange={(e) => {console.log(`Update quantity to ${e.target.value + item}`)
                  item.amount = e.target.value;
                  e.target.value=item.amount
                }}
                    value={item.amount}
                    className="select select-bordered w-full max-w-xs"
                    
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="text-blue-600 border-none hover:underline"
                    onClick={() => (cartItems)}
                  >
                    remove
                  </button>
                </div>
                <p className="text-lg font-semibold text-yellow-700 mt-[37px]">${(item.price / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="w-80 bg-blue-50 p-6 h-48 rounded-lg">
            <p className="flex mb-2 justify-between text-gray-700">
              Subtotal: <span>${(totals.subtotal / 100).toFixed(2)}</span>
            </p>
            <p className="flex mb-2 justify-between text-gray-700">
              Shipping: <span>${totals.shipping.toFixed(2)}</span>
            </p>
            <p className="flex mb-2 justify-between text-gray-700">
              Tax: <span>${totals.tax.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-gray-900 font-semibold">
              Order Total: <span>${totals.orderTotal.toFixed(2)}</span>
            </p>
            <button onClick={handleNavigate} className="w-80 mt-16 py-2 bg-blue-600 text-white ml-[-23px] rounded-lg text-center">
              PLEASE LOGIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
