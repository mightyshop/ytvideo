import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowDownToLine, History, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Clock, CheckCircle } from 'lucide-react';

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState({
    total: 3125.50,
    available: 2580.50,
    pending: 545.00,
    earnings: {
      tasks: 1850.00,
      referrals: 875.50,
      affiliate: 400.00
    }
  });

  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [transactions] = useState([
    { id: 1, type: 'Task', amount: 1.00, date: '2024-03-15', task: 'Watched video', status: 'completed' },
    { id: 2, type: 'Task', amount: 1.00, date: '2024-03-15', task: 'Completed H5 game', status: 'completed' },
    { id: 3, type: 'Withdrawal', amount: -50.00, date: '2024-03-14', status: 'completed' },
    { id: 4, type: 'Referral', amount: 5.00, date: '2024-03-13', task: 'Referral bonus', status: 'completed' },
    { id: 5, type: 'Affiliate', amount: 45.00, date: '2024-03-12', task: 'Product commission', status: 'pending' },
    { id: 6, type: 'Task', amount: 1.00, date: '2024-03-12', task: 'Website visit', status: 'pending' }
  ]);

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0 || amount > balance.available) return;
    
    setBalance(prev => ({
      ...prev,
      available: prev.available - amount,
      total: prev.total - amount
    }));
    setWithdrawalAmount('');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wallet</h1>
        <p className="text-gray-400">Manage your earnings and withdrawals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <WalletIcon className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Balance</p>
              <p className="text-2xl font-bold">${balance.total.toFixed(2)}</p>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(balance.available / balance.total) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Available for Withdrawal</p>
              <p className="text-2xl font-bold">${balance.available.toFixed(2)}</p>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(balance.available / balance.total) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <History className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Earnings</p>
              <p className="text-2xl font-bold">${balance.pending.toFixed(2)}</p>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-yellow-500 rounded-full"
              style={{ width: `${(balance.pending / balance.total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Transaction History</h2>
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">
                        {transaction.type === 'Task' ? transaction.task : 
                         transaction.type === 'Referral' ? 'Referral bonus' : 
                         transaction.type === 'Affiliate' ? 'Product commission' :
                         'Withdrawal'}
                      </p>
                      {transaction.status === 'pending' && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <span className={`font-semibold ${
                    transaction.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {transaction.type === 'Withdrawal' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Withdraw Funds</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount (USD)</label>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                  max={balance.available}
                  step="0.01"
                />
              </div>
            </div>

            <button
              onClick={handleWithdrawal}
              disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > balance.available}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowDownToLine className="w-5 h-5" />
              <span>Withdraw Funds</span>
            </button>

            <div className="text-sm text-gray-400">
              <p>Minimum withdrawal: $1.00</p>
              <p>Processing time: 1-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;