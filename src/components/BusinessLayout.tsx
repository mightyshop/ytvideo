import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Store, BarChart3, Package, Settings, Menu, X, CreditCard, ArrowDownToLine, Users, Mail } from 'lucide-react';

const BusinessLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFundsModal, setShowFundsModal] = useState<'deposit' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState('');

  const menuItems = [
    { path: '/business/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/business/seller', label: 'Seller', icon: Store },
    { path: '/business/customers', label: 'Customers', icon: Users },
    { path: '/business/email-marketing', label: 'Email Marketing', icon: Mail },
    { path: '/business/orders', label: 'Orders', icon: Package },
    { path: '/business/settings', label: 'Settings', icon: Settings },
  ];

  const handleFundsAction = () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    
    console.log(`${showFundsModal === 'deposit' ? 'Depositing' : 'Withdrawing'} $${amount}`);
    setAmount('');
    setShowFundsModal(null);
  };

  const FundsModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {showFundsModal === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount"
              min="1"
              step="0.01"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFundsModal(null)}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFundsAction}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              {showFundsModal === 'deposit' ? 'Add Funds' : 'Withdraw'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 fixed top-0 left-0 bottom-0 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold">Business Center</h2>
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
              <h2 className="text-xl font-bold">Business Center</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
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

      {/* Top Navigation */}
      <div className="fixed top-0 right-0 left-0 md:left-64 bg-gray-800 border-b border-gray-700 z-20">
        <div className="flex items-center justify-end px-4 md:px-8 h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFundsModal('deposit')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Add Funds</span>
            </button>
            <button
              onClick={() => setShowFundsModal('withdraw')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-24">
        {children}
      </main>

      {/* Funds Modal */}
      {showFundsModal && <FundsModal />}
    </div>
  );
};

export default BusinessLayout;