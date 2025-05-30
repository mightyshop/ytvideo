import React, { useState } from 'react';
import { Wallet as WalletType, Transaction } from '../types';

const Wallet: React.FC = () => {
  const [wallet, setWallet] = useState<WalletType>({
    id: '1',
    balance: 0,
    currency: 'USD',
    transactions: []
  });

  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: depositAmount,
      type: 'deposit',
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    setWallet(prev => ({
      ...prev,
      balance: prev.balance + depositAmount,
      transactions: [newTransaction, ...prev.transactions]
    }));

    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Wallet</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400">Available Balance</p>
              <p className="text-4xl font-bold">${wallet.balance.toFixed(2)}</p>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
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
              <button
                onClick={handleDeposit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <div className="space-y-4">
            {wallet.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {transaction.type === 'deposit' ? 'Deposit' : 'Campaign Spend'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
            {wallet.transactions.length === 0 && (
              <p className="text-center text-gray-400">No transactions yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;