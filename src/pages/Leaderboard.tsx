import React from 'react';
import { Trophy, Gift, Medal, Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const topEarners = [
    { id: 1, username: '@crypto_master', earnings: 2580, tasks: 156, streak: 14, avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 2, username: '@task_queen', earnings: 2340, tasks: 142, streak: 21, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 3, username: '@digital_ninja', earnings: 2120, tasks: 128, streak: 7, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
  ];

  const rewards = [
    {
      id: 1,
      title: 'iPhone 15 Pro',
      description: 'Complete 1000 tasks and maintain a 30-day streak',
      image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 65,
      value: '$999'
    },
    {
      id: 2,
      title: 'MacBook Air',
      description: 'Earn $5000 in total rewards',
      image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 40,
      value: '$1299'
    },
    {
      id: 3,
      title: 'Cash Reward',
      description: 'Top earner of the month',
      image: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 85,
      value: '$500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-yellow-500 rounded-full">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-gray-400 mt-1">Top earners and available rewards</p>
          </div>
        </div>

        {/* Monthly Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topEarners.map((earner, index) => (
            <div key={earner.id} className="bg-gray-800 rounded-lg p-6 relative overflow-hidden">
              {index === 0 && (
                <div className="absolute top-4 right-4">
                  <Crown className="w-6 h-6 text-yellow-500" />
                </div>
              )}
              <div className="flex items-center space-x-4 mb-4">
                <img src={earner.avatar} alt={earner.username} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-semibold">{earner.username}</h3>
                  <p className="text-gray-400 text-sm">#{index + 1} this month</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-500">${earner.earnings}</p>
                  <p className="text-sm text-gray-400">Earned</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-500">{earner.tasks}</p>
                  <p className="text-sm text-gray-400">Tasks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-500">{earner.streak}</p>
                  <p className="text-sm text-gray-400">Streak</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Available Rewards */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Gift className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold">Available Rewards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <img src={reward.image} alt={reward.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{reward.title}</h3>
                    <span className="text-green-500 font-semibold">{reward.value}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{reward.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-blue-400">{reward.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${reward.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Prizes */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Medal className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold">Monthly Prizes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">1st Place</div>
              <p className="text-white/80">$1000 Cash Prize</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">2nd Place</div>
              <p className="text-white/80">$500 Cash Prize</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">3rd Place</div>
              <p className="text-white/80">$250 Cash Prize</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;