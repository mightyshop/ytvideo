import React, { useState } from 'react';
import { Share2, DollarSign, Star, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, X, Globe, Link as LinkIcon } from 'lucide-react';

interface VerificationFormData {
  platform: string;
  profileUrl: string;
  revenueShare: string;
}

const Overview: React.FC = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [form, setForm] = useState<VerificationFormData>({
    platform: '',
    profileUrl: '',
    revenueShare: '10'
  });

  const stats = {
    affiliateEarnings: {
      amount: 1389.56,
      percentage: 100,
      label: 'Affiliate Earnings'
    },
    totalEarnings: {
      amount: 1389.56,
      change: '+12.5%',
      label: 'Total Earnings'
    },
    pendingReviews: {
      count: 5,
      status: 'in progress',
      label: 'Pending Reviews'
    }
  };

  const recentActivity = [
    {
      type: 'Task',
      amount: 1.00,
      date: '2024-03-15',
      task: 'Watched video',
      status: 'completed'
    },
    {
      type: 'Task',
      amount: 1.00,
      date: '2024-03-15',
      task: 'Completed H5 game',
      status: 'completed'
    },
    {
      type: 'Withdrawal',
      amount: -50.00,
      date: '2024-03-14',
      status: 'completed'
    },
    {
      type: 'Referral',
      amount: 5.00,
      date: '2024-03-13',
      task: 'Referral bonus',
      status: 'completed'
    },
    {
      type: 'Affiliate',
      amount: 45.00,
      date: '2024-03-12',
      task: 'Product commission',
      status: 'pending'
    },
    {
      type: 'Task',
      amount: 1.00,
      date: '2024-03-12',
      task: 'Website visit',
      status: 'pending'
    }
  ];

  const affiliateProducts = [
    {
      id: 1,
      title: 'Premium Wireless Headphones',
      price: 299.99,
      commission: 45.00,
      image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'High-quality wireless headphones with noise cancellation.'
    },
    {
      id: 2,
      title: 'Smart Fitness Watch',
      price: 199.99,
      commission: 30.00,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Track your fitness goals with this advanced smartwatch.'
    },
    {
      id: 3,
      title: 'Portable Bluetooth Speaker',
      price: 129.99,
      commission: 19.50,
      image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Powerful sound in a compact, waterproof design.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', form);
    setShowApplicationForm(false);
    setForm({
      platform: '',
      profileUrl: '',
      revenueShare: '10'
    });
  };

  const ApplicationModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Creator Application</h2>
            <button 
              onClick={() => setShowApplicationForm(false)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Requirements</h3>
            <div className="bg-gray-700 rounded-lg p-4 space-y-3">
              <ul className="space-y-2 text-gray-300">
                <li>• Minimum 10,000 followers on any social media platform</li>
                <li>• At least 100,000 views on your content</li>
                <li>• Active social media presence</li>
                <li>• High-quality content creation skills</li>
                <li>• Consistent posting schedule</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Platform</label>
              <select
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
                className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Platform</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Profile URL</label>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={form.profileUrl}
                  onChange={(e) => setForm({ ...form, profileUrl: e.target.value })}
                  className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your profile URL"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Revenue Share</label>
              <p className="text-sm text-gray-400 mb-3">Choose how much revenue you want to share with your sub-creators</p>
              <div className="grid grid-cols-5 gap-2">
                {['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, revenueShare: value })}
                    className={`p-2 rounded-lg border-2 transition-colors ${
                      form.revenueShare === value
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-gray-700 hover:border-gray-600 text-gray-400'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                You will share {form.revenueShare}% of your earnings with sub-creators who complete tasks through your referral
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={() => setShowApplicationForm(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        <p className="text-gray-400">Dashboard overview and key metrics</p>
      </div>

      {/* Become a Creator Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Become a Creator</h2>
            <p className="text-white/80 mt-1">Start your journey as a content creator</p>
          </div>
          <button 
            onClick={() => setShowApplicationForm(true)}
            className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Share2 className="w-5 h-5 text-purple-400" />
            <span className="text-gray-400">Affiliate Earnings</span>
          </div>
          <p className="text-2xl font-bold">${stats.affiliateEarnings.amount.toFixed(2)}</p>
          <p className="text-sm text-gray-400">{stats.affiliateEarnings.percentage}% of total</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-gray-400">Total Earnings</span>
          </div>
          <p className="text-2xl font-bold">${stats.totalEarnings.amount.toFixed(2)}</p>
          <p className="text-sm text-green-400">{stats.totalEarnings.change} this month</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400">Pending Reviews</span>
          </div>
          <p className="text-2xl font-bold">{stats.pendingReviews.count}</p>
          <p className="text-sm text-blue-400">{stats.pendingReviews.status}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">
                      {activity.type === 'Task' ? activity.task : 
                       activity.type === 'Referral' ? 'Referral bonus' : 
                       activity.type === 'Affiliate' ? 'Product commission' :
                       'Withdrawal'}
                    </p>
                    {activity.status === 'pending' && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{activity.date}</p>
                </div>
                <span className={`font-semibold ${
                  activity.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {activity.type === 'Withdrawal' ? '-' : '+'}${Math.abs(activity.amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Affiliate Products */}
      <div>
        <h2 className="text-xl font-bold mb-6">Featured Affiliate Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {affiliateProducts.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-500">${product.price.toFixed(2)}</span>
                  <div className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm">
                    ${product.commission.toFixed(2)} commission
                  </div>
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                  Promote Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showApplicationForm && <ApplicationModal />}
    </div>
  );
};

export default Overview;