import React from 'react';
import { ShoppingBag, Home, ShoppingCart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-2 md:hidden z-50">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/shop')}
            className={`flex flex-col items-center space-y-1 p-2 ${
              location.pathname === '/shop' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Shop</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop/cart')}
            className={`flex flex-col items-center space-y-1 p-2 ${
              location.pathname === '/shop/cart' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs">Cart</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop/orders')}
            className={`flex flex-col items-center space-y-1 p-2 ${
              location.pathname === '/shop/orders' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs">Orders</span>
          </button>

          <button 
            onClick={() => navigate('/account')}
            className={`flex flex-col items-center space-y-1 p-2 ${
              location.pathname === '/account' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomNav;