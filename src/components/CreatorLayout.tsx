import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, DollarSign, Wrench, PieChart, Wallet, Settings, Menu, X } from 'lucide-react';

interface CreatorLayoutProps {
  children: React.ReactNode;
}

const CreatorLayout: React.FC<CreatorLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/creator/overview', label: 'Overview', icon: BarChart3 },
    { path: '/creator/affiliate', label: 'Affiliate', icon: DollarSign },
    { path: '/creator/tools', label: 'Tools', icon: Wrench },
    { path: '/creator/analytics', label: 'Analytics', icon: PieChart },
    { path: '/creator/wallet', label: 'Wallet', icon: Wallet },
    { path: '/creator/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 fixed top-0 left-0 bottom-0 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold">Creator Studio</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-500'
                    : 'text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-gray-800 rounded-lg md:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          <div className="absolute top-0 left-0 w-64 h-full bg-gray-800 border-r border-gray-700">
            <div className="flex items-center justify-between p-6">
              <h2 className="text-xl font-bold">Creator Studio</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="mt-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                      isActive
                        ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-500'
                        : 'text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default CreatorLayout;