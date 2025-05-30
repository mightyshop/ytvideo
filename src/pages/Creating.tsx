import React, { useState } from 'react';
import { Video, Music, Link, X, Play, Image, Gamepad, TrendingUp as Trending, Building, Smartphone } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  type: 'ugc' | 'freestyle';
  category: 'music' | 'video' | 'game' | 'challenge' | 'app' | 'business';
  reward: number;
  totalBudget: number;
  remainingBudget: number;
  viewsRequired: number;
  remainingViews: number;
  description: string;
  requirements: string[];
  thumbnail: string;
}

const Creating: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Campaign['category'] | 'all'>('all');

  const categories = [
    { id: 'all', label: 'All Categories', icon: Video },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'game', label: 'Game', icon: Gamepad },
    { id: 'challenge', label: 'Challenge', icon: Trending },
    { id: 'app', label: 'App', icon: Smartphone },
    { id: 'business', label: 'Business', icon: Building }
  ];

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Fashion Haul',
      type: 'ugc',
      category: 'video',
      reward: 10,
      totalBudget: 1000,
      remainingBudget: 850,
      viewsRequired: 100000,
      remainingViews: 85000,
      description: 'Create an engaging UGC video showcasing summer fashion trends',
      requirements: [
        'Video length: 30-60 seconds',
        'Show at least 5 different outfits',
        'Include on-screen text for each item',
        'Natural lighting preferred',
        'Background music required'
      ],
      thumbnail: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Dance Challenge',
      type: 'freestyle',
      category: 'challenge',
      reward: 5,
      totalBudget: 500,
      remainingBudget: 375,
      viewsRequired: 50000,
      remainingViews: 37500,
      description: 'Create a freestyle dance video to our trending song',
      requirements: [
        'Video length: 15-30 seconds',
        'Use provided music track',
        'Full body shots required',
        'Well-lit environment',
        'Smooth transitions'
      ],
      thumbnail: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Product Review',
      type: 'ugc',
      category: 'business',
      reward: 10,
      totalBudget: 2000,
      remainingBudget: 1600,
      viewsRequired: 200000,
      remainingViews: 160000,
      description: 'Create an honest review video of our skincare product',
      requirements: [
        'Video length: 45-90 seconds',
        'Show product application',
        'Discuss key benefits',
        'Include before/after shots',
        'Natural, authentic style'
      ],
      thumbnail: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'Mobile Game Review',
      type: 'ugc',
      category: 'game',
      reward: 15,
      totalBudget: 1500,
      remainingBudget: 1200,
      viewsRequired: 150000,
      remainingViews: 120000,
      description: 'Create a gameplay review video of our new mobile game',
      requirements: [
        'Video length: 2-3 minutes',
        'Show actual gameplay footage',
        'Highlight key features',
        'Include game tips',
        'Engaging commentary'
      ],
      thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'Music Cover Challenge',
      type: 'freestyle',
      category: 'music',
      reward: 8,
      totalBudget: 800,
      remainingBudget: 640,
      viewsRequired: 80000,
      remainingViews: 64000,
      description: 'Create a unique cover of our latest track',
      requirements: [
        'Video length: 60-90 seconds',
        'Original interpretation',
        'High-quality audio',
        'Creative visuals',
        'Use official backing track'
      ],
      thumbnail: 'https://images.pexels.com/photos/7594244/pexels-photo-7594244.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      title: 'App Tutorial',
      type: 'ugc',
      category: 'app',
      reward: 12,
      totalBudget: 1200,
      remainingBudget: 960,
      viewsRequired: 120000,
      remainingViews: 96000,
      description: 'Create a tutorial video for our productivity app',
      requirements: [
        'Video length: 2-4 minutes',
        'Clear step-by-step guide',
        'Show key features',
        'Include use cases',
        'Professional tone'
      ],
      thumbnail: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    console.log('Submission:', {
      campaignId: selectedCampaign.id,
      videoUrl,
      screenshotUrl
    });

    setVideoUrl('');
    setScreenshotUrl('');
    setSelectedCampaign(null);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const filteredCampaigns = selectedCategory === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Available Campaigns</h1>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as Campaign['category'] | 'all')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedCampaign(campaign)}
            >
              <div className="relative">
                <img
                  src={campaign.thumbnail}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8" />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-500 text-white text-sm">
                  ${campaign.reward}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {campaign.type === 'ugc' ? (
                    <Video className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Music className="w-5 h-5 text-purple-400" />
                  )}
                  <span className="text-sm text-gray-400">
                    {campaign.type === 'ugc' ? 'UGC Video' : 'Freestyle Music'}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">
                    {categories.find(cat => cat.id === campaign.category)?.label}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{campaign.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{campaign.description}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Campaign Budget</span>
                    <span className="text-green-500">${formatNumber(campaign.remainingBudget)} / ${formatNumber(campaign.totalBudget)}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(campaign.remainingBudget / campaign.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Remaining Views</span>
                    <span className="text-blue-400">{formatNumber(campaign.remainingViews)} / {formatNumber(campaign.viewsRequired)}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(campaign.remainingViews / campaign.viewsRequired) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No campaigns found in this category</p>
          </div>
        )}
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full bg-gray-800 rounded-lg">
            <div className="relative">
              <img
                src={selectedCampaign.thumbnail}
                alt={selectedCampaign.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCampaign.title}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-400">
                      {selectedCampaign.type === 'ugc' ? 'UGC Video' : 'Freestyle Music'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">
                      {categories.find(cat => cat.id === selectedCampaign.category)?.label}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-blue-500 rounded-full text-white">
                  ${selectedCampaign.reward}
                </div>
              </div>

              <p className="text-gray-300 mb-6">{selectedCampaign.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Campaign Budget</span>
                    <span className="text-green-500">
                      ${formatNumber(selectedCampaign.remainingBudget)} / ${formatNumber(selectedCampaign.totalBudget)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(selectedCampaign.remainingBudget / selectedCampaign.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Remaining Views</span>
                    <span className="text-blue-400">
                      {formatNumber(selectedCampaign.remainingViews)} / {formatNumber(selectedCampaign.viewsRequired)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(selectedCampaign.remainingViews / selectedCampaign.viewsRequired) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedCampaign.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Video URL</label>
                  <div className="flex items-center space-x-2">
                    <Link className="w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter video URL"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Screenshot URL (for verification)</label>
                  <div className="flex items-center space-x-2">
                    <Image className="w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={screenshotUrl}
                      onChange={(e) => setScreenshotUrl(e.target.value)}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter screenshot URL"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Submit for Review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creating;