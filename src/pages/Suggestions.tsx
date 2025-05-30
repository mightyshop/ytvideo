import React, { useState } from 'react';
import { Star, Users, Heart, Twitter, Instagram, Youtube, Facebook, ImageIcon, X, MessageCircle, Share2, ExternalLink, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const tasks = [
  {
    id: 1,
    type: 'following',
    title: 'Follow New Creators',
    description: 'Follow new accounts to support the community',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    type: 'social',
    title: 'Engage with Content',
    description: 'Like, comment, or share posts to show your support',
    icon: Heart,
    color: 'bg-red-500'
  }
];

const socialPosts = [
  {
    id: 1,
    platform: 'Instagram',
    username: '@digital_creator',
    icon: Instagram,
    color: 'bg-pink-500',
    likes: '2.5K',
    comments: '180',
    shares: '45'
  },
  {
    id: 2,
    platform: 'Twitter',
    username: '@digital_creator',
    icon: Twitter,
    color: 'bg-blue-400',
    likes: '1.8K',
    comments: '230',
    shares: '89'
  },
  {
    id: 3,
    platform: 'Facebook',
    username: '@DigitalCreator',
    icon: Facebook,
    color: 'bg-blue-600',
    likes: '3.2K',
    comments: '275',
    shares: '120'
  }
];

const socialAccounts = [
  {
    id: 1,
    platform: 'Instagram',
    username: '@digital_creator',
    followers: '125K',
    icon: Instagram,
    color: 'bg-pink-500'
  },
  {
    id: 2,
    platform: 'Twitter',
    username: '@digital_creator',
    followers: '82K',
    icon: Twitter,
    color: 'bg-blue-400'
  },
  {
    id: 3,
    platform: 'YouTube',
    username: '@DigitalCreator',
    followers: '250K',
    icon: Youtube,
    color: 'bg-red-500'
  },
  {
    id: 4,
    platform: 'Facebook',
    username: '@DigitalCreator',
    followers: '180K',
    icon: Facebook,
    color: 'bg-blue-600'
  }
];

const socialLinks = {
  Instagram: 'https://www.instagram.com/digital_creator',
  Twitter: 'https://twitter.com/digital_creator',
  YouTube: 'https://youtube.com/@DigitalCreator',
  Facebook: 'https://facebook.com/DigitalCreator'
};

type EngagementType = 'like' | 'comment' | 'share';

const Suggestions: React.FC = () => {
  const navigate = useNavigate();
  const [showSocialList, setShowSocialList] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<typeof socialAccounts[0] | null>(null);
  const [selectedPost, setSelectedPost] = useState<typeof socialPosts[0] | null>(null);
  const [selectedEngagement, setSelectedEngagement] = useState<EngagementType | null>(null);
  const [proofUrl, setProofUrl] = useState('');
  const creatorName = '@digital_creator';

  const suggestedProducts = products.slice(0, 3);

  const handleTaskClick = (taskType: string) => {
    setSelectedTask(taskType);
    setShowSocialList(true);
  };

  const handleFollow = (account: typeof socialAccounts[0]) => {
    setSelectedAccount(account);
    setSelectedPost(null);
    setSelectedEngagement(null);
    setShowProofModal(true);
  };

  const handleEngagement = (post: typeof socialPosts[0], type: EngagementType) => {
    setSelectedPost(post);
    setSelectedAccount(null);
    setSelectedEngagement(type);
    setShowProofModal(true);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Proof submitted:', { 
      account: selectedAccount, 
      post: selectedPost,
      engagement: selectedEngagement,
      proofUrl 
    });
    setShowProofModal(false);
    setProofUrl('');
    setSelectedAccount(null);
    setSelectedPost(null);
    setSelectedEngagement(null);
  };

  const getEngagementTitle = () => {
    if (selectedAccount) return 'Follow Proof';
    switch (selectedEngagement) {
      case 'like': return 'Like Proof';
      case 'comment': return 'Comment Proof';
      case 'share': return 'Share Proof';
      default: return 'Engagement Proof';
    }
  };

  const ProofModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{getEngagementTitle()}</h3>
          <button 
            onClick={() => setShowProofModal(false)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedAccount && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 ${selectedAccount.color} rounded-lg`}>
                <selectedAccount.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">{selectedAccount.username}</p>
                <p className="text-sm text-gray-400">{selectedAccount.platform}</p>
              </div>
            </div>
            <a 
              href={socialLinks[selectedAccount.platform as keyof typeof socialLinks]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit {selectedAccount.platform} Profile</span>
            </a>
          </div>
        )}

        {selectedPost && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 ${selectedPost.color} rounded-lg`}>
                <selectedPost.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">{selectedPost.username}</p>
                <p className="text-sm text-gray-400">
                  {selectedEngagement === 'like' ? 'Like on' : 
                   selectedEngagement === 'comment' ? 'Comment on' : 
                   'Share from'} {selectedPost.platform}
                </p>
              </div>
            </div>
            <a 
              href={socialLinks[selectedPost.platform as keyof typeof socialLinks]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit {selectedPost.platform} Post</span>
            </a>
          </div>
        )}

        <form onSubmit={handleSubmitProof} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Screenshot URL of {getEngagementTitle()}
            </label>
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image URL"
                required
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Please provide a screenshot showing your engagement
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Proof
          </button>
        </form>
      </div>
    </div>
  );

  if (showSocialList) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500 rounded-full">
                {selectedTask === 'following' ? <Users className="w-6 h-6 text-white" /> : <Heart className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {selectedTask === 'following' ? 'Follow Accounts' : 'Engage with Content'}
                </h1>
                <p className="text-gray-400 mt-1">Support {creatorName} on social media</p>
              </div>
            </div>
            <button 
              onClick={() => setShowSocialList(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back to Tasks
            </button>
          </div>

          {selectedTask === 'following' ? (
            <div className="grid gap-4">
              {socialAccounts.map(account => (
                <div key={account.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 ${account.color} rounded-lg`}>
                        <account.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{account.username}</h3>
                        <p className="text-sm text-gray-400">{account.platform} • {account.followers} followers</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollow(account)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Users className="w-5 h-5" />
                      <span>Follow</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              {socialPosts.map(post => (
                <div key={post.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 ${post.color} rounded-lg`}>
                        <post.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{post.username}</h3>
                        <p className="text-sm text-gray-400">{post.platform}</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleEngagement(post, 'like')}
                        className="flex items-center space-x-2 hover:text-red-400 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleEngagement(post, 'comment')}
                        className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button 
                        onClick={() => handleEngagement(post, 'share')}
                        className="flex items-center space-x-2 hover:text-green-400 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showProofModal && <ProofModal />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-500 rounded-full">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Available Tasks</h1>
            <p className="text-gray-400 mt-1">Complete tasks and support {creatorName}</p>
          </div>
        </div>

        {/* Available Tasks */}
        <div className="grid gap-6 mb-12">
          {tasks.map(task => (
            <div key={task.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 ${task.color} rounded-lg`}>
                  <task.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-gray-400 mt-1">{task.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-blue-400">Supporting {creatorName}</span>
                    <button 
                      onClick={() => handleTaskClick(task.type)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Start Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold">Featured Products</h2>
            </div>
            <button 
              onClick={() => navigate('/shop')}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {suggestedProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => navigate(`/shop/${product.id}`)}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-400">{product.seller.name}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-500">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-400">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Become a Creator</h2>
              <p className="text-white/80 mt-1">Start your journey as a content creator</p>
            </div>
            <button 
              onClick={() => navigate('/creator')}
              className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;