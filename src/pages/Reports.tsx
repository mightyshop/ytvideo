import React, { useState } from 'react';
import { Eye, Heart, Gift, Twitter, Instagram, Youtube, Facebook, ImageIcon, X, MessageCircle, Share2, ExternalLink, ShoppingBag, Video, Music, Star, CheckCircle, XCircle, Globe, Gamepad, Play, Download, Headphones, Tv, Users } from 'lucide-react';
import BusinessLayout from '../components/BusinessLayout';

interface Submission {
  id: string;
  campaignId: string;
  campaignName: string;
  type: 'ugc_video' | 'freestyle_music' | 'product_review' | 'app_review' | 'movie_review' | 'website_review' | 'video' | 'social' | 'game' | 'website' | 'app' | 'audio' | 'live';
  screenshot: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  creator: {
    name: string;
    avatar: string;
    followers: number;
  };
  views: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  videoUrl?: string;
  platform?: string;
}

type Category = 'overview' | 'video' | 'social' | 'game' | 'website' | 'app' | 'audio' | 'live';

const Reports: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('overview');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');

  const stats = {
    totalViews: 125000,
    totalLikes: 45200,
    totalComments: 8900,
    totalShares: 12300,
    totalFollowers: 5600,
    websiteVisits: 15800,
    gameplayTime: '2,450 hours',
    liveViewers: 890,
    appInstalls: 3200,
    audioPlays: 18500,
    ugcSubmissions: 156,
    freestyleSubmissions: 89,
    productReviews: 234,
    appReviews: 167,
    movieReviews: 145,
    websiteReviews: 178
  };

  const submissions: Submission[] = [
    {
      id: '1',
      campaignId: 'c1',
      campaignName: 'Summer Gaming Campaign',
      type: 'game',
      screenshot: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-20T10:30:00Z',
      creator: {
        name: '@game_master',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 25000
      },
      views: 12500,
      engagement: {
        likes: 2300,
        comments: 156,
        shares: 89
      }
    },
    {
      id: '2',
      campaignId: 'c2',
      campaignName: 'Music Promotion',
      type: 'audio',
      screenshot: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'approved',
      submittedAt: '2024-03-19T15:45:00Z',
      creator: {
        name: '@music_lover',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 18000
      },
      views: 8900,
      engagement: {
        likes: 1500,
        comments: 89,
        shares: 45
      }
    },
    {
      id: '3',
      campaignId: 'c3',
      campaignName: 'App Download Drive',
      type: 'app',
      screenshot: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'rejected',
      submittedAt: '2024-03-18T09:15:00Z',
      creator: {
        name: '@tech_guru',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 32000
      },
      views: 15600,
      engagement: {
        likes: 3400,
        comments: 245,
        shares: 167
      }
    },
    {
      id: '4',
      campaignId: 'c4',
      campaignName: 'Website Traffic Campaign',
      type: 'website',
      screenshot: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-17T14:20:00Z',
      creator: {
        name: '@web_expert',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 28000
      },
      views: 11200,
      engagement: {
        likes: 2100,
        comments: 134,
        shares: 78
      }
    },
    {
      id: '5',
      campaignId: 'c5',
      campaignName: 'Social Media Growth',
      type: 'social',
      screenshot: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'approved',
      submittedAt: '2024-03-16T11:45:00Z',
      platform: 'instagram',
      creator: {
        name: '@social_butterfly',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 45000
      },
      views: 23400,
      engagement: {
        likes: 5600,
        comments: 342,
        shares: 189
      }
    },
    {
      id: '6',
      campaignId: 'c6',
      campaignName: 'Video Views Campaign',
      type: 'video',
      screenshot: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-15T16:30:00Z',
      creator: {
        name: '@video_pro',
        avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 38000
      },
      views: 19800,
      engagement: {
        likes: 4200,
        comments: 278,
        shares: 145
      }
    },
    {
      id: '7',
      campaignId: 'c7',
      campaignName: 'UGC Product Review',
      type: 'product_review',
      screenshot: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'approved',
      submittedAt: '2024-03-14T13:20:00Z',
      creator: {
        name: '@review_master',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 29000
      },
      views: 14500,
      engagement: {
        likes: 3100,
        comments: 245,
        shares: 112
      }
    },
    {
      id: '8',
      campaignId: 'c8',
      campaignName: 'Freestyle Music Challenge',
      type: 'freestyle_music',
      screenshot: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-13T09:45:00Z',
      creator: {
        name: '@music_star',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 42000
      },
      views: 21300,
      engagement: {
        likes: 4800,
        comments: 312,
        shares: 178
      }
    },
    {
      id: '9',
      campaignId: 'c9',
      campaignName: 'App Review Series',
      type: 'app_review',
      screenshot: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'approved',
      submittedAt: '2024-03-12T14:15:00Z',
      creator: {
        name: '@app_reviewer',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 31000
      },
      views: 16800,
      engagement: {
        likes: 3600,
        comments: 289,
        shares: 134
      }
    },
    {
      id: '10',
      campaignId: 'c10',
      campaignName: 'Movie Review Challenge',
      type: 'movie_review',
      screenshot: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-11T11:30:00Z',
      creator: {
        name: '@movie_critic',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
        followers: 35000
      },
      views: 18900,
      engagement: {
        likes: 4100,
        comments: 267,
        shares: 156
      }
    }
  ];

  const socialPlatforms = [
    { id: 'all', label: 'All Platforms' },
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'facebook', label: 'Facebook', icon: Facebook },
    { id: 'twitter', label: 'Twitter', icon: Twitter },
    { id: 'youtube', label: 'YouTube', icon: Youtube }
  ];

  const actionTypes = [
    { id: 'all', label: 'All Actions' },
    { id: 'like', label: 'Likes' },
    { id: 'comment', label: 'Comments' },
    { id: 'follow', label: 'Follows' },
    { id: 'share', label: 'Shares' }
  ];

  const categories = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'social', label: 'Social', icon: Share2 },
    { id: 'game', label: 'Games', icon: Gamepad },
    { id: 'website', label: 'Websites', icon: Globe },
    { id: 'app', label: 'Apps', icon: Download },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'live', label: 'Live', icon: Tv }
  ];

  const getTypeIcon = (type: Submission['type']) => {
    switch (type) {
      case 'ugc_video':
      case 'video':
        return <Video className="w-6 h-6 text-blue-400" />;
      case 'freestyle_music':
      case 'audio':
        return <Music className="w-6 h-6 text-purple-400" />;
      case 'product_review':
      case 'app_review':
      case 'movie_review':
      case 'website_review':
        return <Star className="w-6 h-6 text-yellow-400" />;
      case 'social':
        return <Share2 className="w-6 h-6 text-pink-400" />;
      case 'game':
        return <Gamepad className="w-6 h-6 text-green-400" />;
      case 'website':
        return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'app':
        return <Download className="w-6 h-6 text-orange-400" />;
      case 'live':
        return <Tv className="w-6 h-6 text-red-400" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: Submission['type']) => {
    switch (type) {
      case 'ugc_video':
        return 'UGC Video';
      case 'freestyle_music':
        return 'Freestyle Music';
      case 'product_review':
        return 'Product Review';
      case 'app_review':
        return 'App Review';
      case 'movie_review':
        return 'Movie Review';
      case 'website_review':
        return 'Website Review';
      case 'video':
        return 'Video';
      case 'social':
        return 'Social';
      case 'game':
        return 'Game';
      case 'website':
        return 'Website';
      case 'app':
        return 'App';
      case 'audio':
        return 'Audio';
      case 'live':
        return 'Live';
      default:
        return type;
    }
  };

  const handleApprove = (submission: Submission) => {
    console.log('Approved:', submission.id);
    setShowProofModal(false);
  };

  const handleReject = (submission: Submission) => {
    console.log('Rejected:', submission.id);
    setShowProofModal(false);
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesCategory = selectedCategory === 'overview' || submission.type === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || submission.platform === selectedPlatform;
    
    let matchesAction = true;
    if (submission.type === 'social' && selectedAction !== 'all') {
      switch (selectedAction) {
        case 'like':
          matchesAction = submission.engagement.likes > 0;
          break;
        case 'comment':
          matchesAction = submission.engagement.comments > 0;
          break;
        case 'share':
          matchesAction = submission.engagement.shares > 0;
          break;
        case 'follow':
          matchesAction = true;
          break;
      }
    }

    return matchesCategory && matchesPlatform && matchesAction;
  });

  const StatCard = ({ icon: Icon, label, value, color, type }: { icon: any, label: string, value: string | number, color: string, type?: Category }) => {
    return (
      <div className={`bg-gray-800 p-6 rounded-xl shadow-lg ${color}`}>
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
          <span className="text-sm font-medium text-gray-400">{label}</span>
        </div>
        <div className="text-2xl font-bold text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </div>
    );
  };

  const SubmissionModal = () => {
    if (!selectedSubmission) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-4xl w-full">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Submission Details</h2>
              <button 
                onClick={() => setShowProofModal(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <img
                src={selectedSubmission.screenshot}
                alt="Submission screenshot"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Campaign</h3>
                <p className="font-medium">{selectedSubmission.campaignName}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Submitted</h3>
                <p className="font-medium">
                  {new Date(selectedSubmission.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedSubmission.creator.avatar}
                  alt={selectedSubmission.creator.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedSubmission.creator.name}</h3>
                  <p className="text-sm text-gray-400">
                    {selectedSubmission.creator.followers.toLocaleString()} followers
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {selectedSubmission.views.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Views</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-400">
                  {selectedSubmission.engagement.likes.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Likes</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-400">
                  {selectedSubmission.engagement.comments.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Comments</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleApprove(selectedSubmission)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleReject(selectedSubmission)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <XCircle className="w-5 h-5" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BusinessLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Campaign Reports</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Category)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {selectedCategory === 'social' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Platform</label>
              <div className="flex flex-wrap gap-2">
                {socialPlatforms.map(platform => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedPlatform === platform.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {platform.icon && <platform.icon className="w-5 h-5" />}
                    <span>{platform.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Action Type</label>
              <div className="flex flex-wrap gap-2">
                {actionTypes.map(action => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedAction === action.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedCategory === 'overview' ? (
          <div className="space-y-8">
            {/* Engagement Stats */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Engagement Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Eye} label="Total Views" value={stats.totalViews} color="hover:bg-gray-700" />
                <StatCard icon={Heart} label="Total Likes" value={stats.totalLikes} color="hover:bg-gray-700" />
                <StatCard icon={MessageCircle} label="Total Comments" value={stats.totalComments} color="hover:bg-gray-700" />
                <StatCard icon={Share2} label="Total Shares" value={stats.totalShares} color="hover:bg-gray-700" />
              </div>
            </div>

            {/* Platform Stats */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Followers" value={stats.totalFollowers} color="hover:bg-gray-700" />
                <StatCard icon={Globe} label="Website Visits" value={stats.websiteVisits} color="hover:bg-gray-700" />
                <StatCard icon={Download} label="App Installs" value={stats.appInstalls} color="hover:bg-gray-700" />
                <StatCard icon={Headphones} label="Audio Plays" value={stats.audioPlays} color="hover:bg-gray-700" />
              </div>
            </div>

            {/* Content Stats */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Content Submissions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard icon={Video} label="UGC Videos" value={stats.ugcSubmissions} color="hover:bg-gray-700" />
                <StatCard icon={Music} label="Freestyle Music" value={stats.freestyleSubmissions} color="hover:bg-gray-700" />
                <StatCard icon={Star} label="Product Reviews" value={stats.productReviews} color="hover:bg-gray-700" />
                <StatCard icon={Download} label="App Reviews" value={stats.appReviews} color="hover:bg-gray-700" />
                <StatCard icon={Play} label="Movie Reviews" value={stats.movieReviews} color="hover:bg-gray-700" />
                <StatCard icon={Globe} label="Website Reviews" value={stats.websiteReviews} color="hover:bg-gray-700" />
              </div>
            </div>

            {/* Recent Submissions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {submissions.slice(0, 6).map(submission => (
                  <div
                    key={submission.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={submission.screenshot}
                        alt={submission.campaignName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 px-2 py-1 rounded text-sm">
                        {getTypeLabel(submission.type)}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <img
                            src={submission.creator.avatar}
                            alt={submission.creator.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <h3 className="font-medium">{submission.creator.name}</h3>
                            <p className="text-sm text-gray-400">
                              {submission.creator.followers.toLocaleString()} followers
                            </p>
                          </div>
                        </div>
                        {getTypeIcon(submission.type)}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{submission.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{submission.engagement.likes.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{submission.engagement.comments.toLocaleString()}</span>
                          </span>
                        </div>
                        <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setShowProofModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-400 flex items-center space-x-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Proof</span>
                        </button>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleApprove(submission)}
                            className="text-green-500 hover:text-green-400"
                          >
                            <CheckCircle className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => handleReject(submission)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <XCircle className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions.map(submission => (
              <div
                key={submission.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-video">
                  <img
                    src={submission.screenshot}
                    alt={submission.campaignName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 px-2 py-1 rounded text-sm">
                    {getTypeLabel(submission.type)}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={submission.creator.avatar}
                        alt={submission.creator.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{submission.creator.name}</h3>
                        <p className="text-sm text-gray-400">
                          {submission.creator.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    {getTypeIcon(submission.type)}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{submission.views.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{submission.engagement.likes.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{submission.engagement.comments.toLocaleString()}</span>
                      </span>
                    </div>
                    <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setShowProofModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-400 flex items-center space-x-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Proof</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleApprove(submission)}
                        className="text-green-500 hover:text-green-400"
                      >
                        <CheckCircle className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleReject(submission)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showProofModal && <SubmissionModal />}
    </BusinessLayout>
  );
};

export default Reports;