import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';

function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="max-w-[1000px] mx-auto my-10 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold border-b-2 pb-5 text-gray-700 mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="flex justify-between mb-4">
            <div className="flex items-center space-x-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.company}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  Colors:
                  <div className="ml-2 flex gap-2">
                    {item.colors.map((color, index) => (
                      <span
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-4 h-4 rounded-full inline-block"
                      ></span>
                    ))}
                  </div>
                </p>
                <p className="text-lg font-semibold text-gray-800">${(item.price / 100).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
      )}
      <button className="w-72 mt-2 ml-96 py-2 bg-blue-600 text-white rounded-lg text-center">
        PLEASE LOGIN
      </button>
    </div>
  );
}

export default Cart;
