import React from 'react';
import { User } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';

const Following: React.FC = () => {
  const suggestedUsers = [
    { id: 1, username: 'dance_star', followers: '1.2M', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 2, username: 'music_lover', followers: '890K', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 3, username: 'travel_guru', followers: '2.1M', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <EarningBanner message="Follow 5 new accounts to earn $1.00!" />
        <h1 className="text-3xl font-bold mb-8">Following</h1>
        
        <div className="grid gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-400">Following</p>
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-400">Likes</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Suggested Accounts</h2>
            <div className="space-y-4">
              {suggestedUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-medium">@{user.username}</p>
                      <p className="text-sm text-gray-400">{user.followers} followers</p>
                    </div>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Following;