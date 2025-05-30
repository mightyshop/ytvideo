import React, { useState } from 'react';
import { Wallet, ArrowDownToLine, History, Settings, Users, Gift, ExternalLink, DollarSign, Clock, CheckCircle, Share2 } from 'lucide-react';

const Profile: React.FC = () => {
  const [balance, setBalance] = useState({
    total: 3125.50,
    available: 2580.50,
    pending: 545.00,
    earnings: {
      tasks: 1850.00,
      referrals: 875.50
    }
  });

  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [referralLink] = useState(`https://example.com/ref/${Math.random().toString(36).substring(2, 8)}`);
  
  const [transactions] = useState([
    { id: 1, type: 'Task', amount: 1.00, date: '2024-03-15', task: 'Watched video', status: 'completed' },
    { id: 2, type: 'Task', amount: 1.00, date: '2024-03-15', task: 'Completed H5 game', status: 'completed' },
    { id: 3, type: 'Withdrawal', amount: -50.00, date: '2024-03-14', status: 'completed' },
    { id: 4, type: 'Referral', amount: 5.00, date: '2024-03-13', task: 'Referral bonus', status: 'completed' },
    { id: 5, type: 'Task', amount: 1.00, date: '2024-03-12', task: 'Website visit', status: 'pending' }
  ]);

  const [referrals] = useState([
    { id: 1, username: '@user123', date: '2024-03-10', earned: 5.00, status: 'active' },
    { id: 2, username: '@creator99', date: '2024-03-12', earned: 5.00, status: 'active' }
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

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
              <div>
                <h1 className="text-2xl font-bold">@username</h1>
                <p className="text-gray-400">Task Earner</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Earnings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Task Earnings</p>
                  <p className="text-xl font-bold">${balance.earnings.tasks.toFixed(2)}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-600 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Referral Earnings</p>
                  <p className="text-xl font-bold">${balance.earnings.referrals.toFixed(2)}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-600 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-400">Total Balance</p>
                <p className="text-3xl font-bold">${balance.total.toFixed(2)}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-sm text-gray-400">Available for Withdrawal</p>
                </div>
                <p className="text-2xl font-bold text-green-500">${balance.available.toFixed(2)}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm text-gray-400">Pending</p>
                </div>
                <p className="text-2xl font-bold text-yellow-500">${balance.pending.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <input
                type="number"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="1"
                max={balance.available}
                step="0.01"
              />
              <button
                onClick={handleWithdrawal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > balance.available}
              >
                <ArrowDownToLine className="w-5 h-5" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          {/* Referral Card */}
          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Gift className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Refer & Earn</h2>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">
              Share your referral link and earn $5 when your friends withdraw $10 or more!
            </p>

            <button
              onClick={copyReferralLink}
              className="w-full bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800/80 transition-colors"
            >
              <span className="text-gray-300 truncate">{referralLink}</span>
              <ExternalLink className="w-5 h-5 text-blue-400" />
            </button>
          </div>

          {/* Referrals Section */}
          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold">Your Referrals</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-4">User</th>
                    <th className="pb-4">Joined</th>
                    <th className="pb-4">You Earned</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {referrals.map(referral => (
                    <tr key={referral.id}>
                      <td className="py-4">{referral.username}</td>
                      <td className="py-4 text-gray-400">{referral.date}</td>
                      <td className="py-4 text-green-400">${referral.earned.toFixed(2)}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                          {referral.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <History className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Transaction History</h2>
            </div>
            
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">
                        {transaction.type === 'Task' ? transaction.task : 
                         transaction.type === 'Referral' ? 'Referral bonus' : 
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
      </div>
    </div>
  );
};

export default Profile;