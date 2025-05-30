import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import BottomNav from '../components/BottomNav';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  // For demo purposes, showing 2 products in cart
  const cartItems = [
    { product: products[0], quantity: 1 },
    { product: products[2], quantity: 2 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.title}</h3>
                      <p className="text-sm text-gray-400">{item.product.seller.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-green-500 font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button className="text-red-400 hover:text-red-300 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 my-4"></div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/shop/checkout')}
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Cart;