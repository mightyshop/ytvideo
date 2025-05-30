import React from 'react';
import SidebarItem from './SidebarItem';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full bg-black text-white border-r border-gray-800 flex flex-col">
      <div className="overflow-y-auto flex-1 pt-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <div className="px-2 space-y-1">
          <SidebarItem icon="shop" label="Shop" active={location.pathname === '/shop'} />
          <SidebarItem icon="cart" label="Cart" active={location.pathname === '/shop/cart'} />
          <SidebarItem icon="bag" label="Orders" active={location.pathname === '/shop/orders'} />
          <SidebarItem icon="user" label="Account" active={location.pathname === '/account'} />
          <SidebarItem icon="creator" label="Creator" active={location.pathname.startsWith('/creator')} />
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-800">
        <button
          onClick={() => navigate('/business/dashboard')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Business Center
        </button>
        <div className="text-xs text-gray-500 mt-4">
          <p>Built with Love by Mavin Tech Limited</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;