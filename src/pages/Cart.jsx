import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, cartTotal, clearCart } =
    useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/listing" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <Link
                  to={`/items/${item._id}`}
                  className="font-semibold text-lg text-gray-900 hover:text-primary"
                >
                  {item.name}
                </Link>
                <p className="text-gray-500 text-sm">{item.category?.name}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-sm mt-2 flex items-center hover:text-red-600"
                >
                  <FiTrash2 className="mr-1" /> Remove
                </button>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-lg">
                  ₹{(item.offerPrice * item.qty).toFixed(2)}
                </span>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                  <button
                    onClick={() => addToCart(item, -1)}
                    disabled={item.qty <= 1}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-500 underline text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 text-gray-600">
              <div className="flex justify-between">
                <span>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                  items)
                </span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-full btn-primary h-12 rounded-xl text-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
