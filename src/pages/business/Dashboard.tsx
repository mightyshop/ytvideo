import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, ShoppingBag, CheckCircle, ArrowUpRight, ArrowDownRight, Clock, RefreshCcw } from 'lucide-react';
import BusinessLayout from '../../components/BusinessLayout';
import BusinessVerification from '../../components/BusinessVerification';

const Dashboard: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  // Financial data
  const financialData = {
    salesRevenue: 5280.50,
    availableForWithdrawal: 2580.50,
    pendingSales: 2700.00,
    campaignExpenses: 1850.75,
    refunds: 150.00,
    totalCustomers: 892
  };

  const handleVerificationComplete = () => {
    setIsVerified(true);
    setShowVerificationForm(false);
  };

  if (showVerificationForm) {
    return <BusinessVerification onVerified={handleVerificationComplete} />;
  }

  return (
    <BusinessLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {!isVerified && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Activate Your Account</h2>
                <p className="text-gray-400">Complete verification to access business features</p>
              </div>
              <button
                onClick={() => setShowVerificationForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <span>Activate Account</span>
              </button>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="bg-green-500/10 rounded-lg p-6 mb-8 flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="text-green-500">Your business account is verified and active!</p>
          </div>
        )}

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-green-500" />
                <span className="text-green-500">+12.5%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Sales Revenue</h3>
            <p className="text-2xl font-bold mt-1">${financialData.salesRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-green-500" />
                <span className="text-green-500">+8.2%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Available for Withdrawal</h3>
            <p className="text-2xl font-bold mt-1">${financialData.availableForWithdrawal.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-500">+15.3%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Pending Sales</h3>
            <p className="text-2xl font-bold mt-1">${financialData.pendingSales.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex items-center space-x-2">
                <ArrowDownRight className="w-5 h-5 text-red-500" />
                <span className="text-red-500">-5.7%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Campaign Expenses</h3>
            <p className="text-2xl font-bold mt-1">${financialData.campaignExpenses.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <RefreshCcw className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Refunds</h3>
            <p className="text-2xl font-bold mt-1">${financialData.refunds.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-purple-500" />
                <span className="text-purple-500">+5.7%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Total Customers</h3>
            <p className="text-2xl font-bold mt-1">{financialData.totalCustomers.toLocaleString()}</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-400">Revenue chart will be displayed here</p>
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
};

export default Dashboard;