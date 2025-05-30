import React, { useState, useEffect } from 'react';
import { Video, Music, Star, Plus, CheckCircle, DollarSign, Users, Share2, PenTool as Tool, FileText, Package, Settings, BarChart3, Wallet, Gift, Menu, X, ExternalLink } from 'lucide-react';
import { Campaign } from '../types';
import { products } from '../data/products';

interface SocialMediaAccount {
  platform: string;
  url: string;
}

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

interface Transaction {
  id: string;
  type: 'ugc_submission' | 'withdrawal' | 'affiliate_earning';
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  date: string;
  details?: {
    title?: string;
    platform?: string;
    views?: number;
  };
}

interface SubmissionForm {
  videoUrl: string;
  description: string;
  platform: string;
  screenshot: string;
}

interface UGCSubmission {
  id: string;
  title: string;
  type: 'video' | 'photo';
  platform: string;
  creator: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  views: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface AffiliatePurchase {
  id: string;
  product: {
    name: string;
    image: string;
    price: number;
  };
  customer: {
    name: string;
    avatar: string;
  };
  commission: number;
  purchasedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

type NavigationSection = 'overview' | 'ugc' | 'affiliate' | 'tools' | 'analytics' | 'wallet' | 'settings';

const recentSubmissions: UGCSubmission[] = [
  {
    id: 's1',
    title: 'Product Review Video',
    type: 'video',
    platform: 'YouTube',
    creator: {
      name: '@tech_reviewer',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    thumbnail: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: 15000,
    engagement: {
      likes: 2500,
      comments: 180,
      shares: 45
    },
    submittedAt: '2024-03-20T10:30:00Z',
    status: 'pending'
  },
  {
    id: 's2',
    title: 'Unboxing Experience',
    type: 'video',
    platform: 'TikTok',
    creator: {
      name: '@unbox_master',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    thumbnail: 'https://images.pexels.com/photos/4219088/pexels-photo-4219088.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: 25000,
    engagement: {
      likes: 4200,
      comments: 320,
      shares: 89
    },
    submittedAt: '2024-03-19T15:45:00Z',
    status: 'approved'
  },
  {
    id: 's3',
    title: 'Product Demo',
    type: 'video',
    platform: 'Instagram',
    creator: {
      name: '@demo_pro',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: 18000,
    engagement: {
      likes: 3100,
      comments: 245,
      shares: 67
    },
    submittedAt: '2024-03-18T09:15:00Z',
    status: 'rejected'
  }
];

const recentPurchases: AffiliatePurchase[] = [
  {
    id: 'p1',
    product: {
      name: 'Wireless Headphones',
      image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 299.99
    },
    customer: {
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    commission: 45.00,
    purchasedAt: '2024-03-20T11:30:00Z',
    status: 'pending'
  },
  {
    id: 'p2',
    product: {
      name: 'Gaming Mouse',
      image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 89.99
    },
    customer: {
      name: 'Jane Smith',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    commission: 13.50,
    purchasedAt: '2024-03-19T14:45:00Z',
    status: 'approved'
  },
  {
    id: 'p3',
    product: {
      name: 'Mechanical Keyboard',
      image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 129.99
    },
    customer: {
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    commission: 19.50,
    purchasedAt: '2024-03-18T16:20:00Z',
    status: 'rejected'
  }
];

const Creator: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<NavigationSection>('overview');
  const [showCreatorForm, setShowCreatorForm] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [socialAccounts, setSocialAccounts] = useState<SocialMediaAccount[]>([
    { platform: '', url: '' }
  ]);
  const [revenueShare, setRevenueShare] = useState(10);
  const [referralLink] = useState(`https://example.com/ref/${Math.random().toString(36).substring(2, 8)}`);
  const [copied, setCopied] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [submissionForm, setSubmissionForm] = useState<SubmissionForm>({
    videoUrl: '',
    description: '',
    platform: '',
    screenshot: ''
  });

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'ugc', label: 'UGC Videos', icon: Video },
    { id: 'affiliate', label: 'Affiliate', icon: Share2 },
    { id: 'tools', label: 'Tools', icon: Tool },
    { id: 'analytics', label: 'Analytics', icon: FileText },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Skincare Product Review',
      type: 'ugc',
      category: 'video',
      reward: 150,
      totalBudget: 3000,
      remainingBudget: 2400,
      viewsRequired: 100000,
      remainingViews: 80000,
      description: 'Create an authentic review video showcasing our new skincare line. Focus on application, results, and your honest experience.',
      requirements: [
        'Video length: 60-90 seconds',
        'Show product application',
        'Discuss key benefits',
        'Natural lighting preferred',
        'Include before/after results'
      ],
      thumbnail: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Fitness App Demo',
      type: 'ugc',
      category: 'app',
      reward: 200,
      totalBudget: 4000,
      remainingBudget: 3600,
      viewsRequired: 150000,
      remainingViews: 135000,
      description: 'Create a walkthrough video of your workout using our fitness app. Show real results and highlight key features.',
      requirements: [
        'Video length: 2-3 minutes',
        'Demonstrate 3+ exercises',
        'Show app interface clearly',
        'Include progress tracking features',
        'High-energy delivery'
      ],
      thumbnail: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Coffee Maker Tutorial',
      type: 'ugc',
      category: 'product',
      reward: 175,
      totalBudget: 3500,
      remainingBudget: 2975,
      viewsRequired: 120000,
      remainingViews: 85000,
      description: 'Create an engaging tutorial showing how to make the perfect coffee using our premium coffee maker. Focus on ease of use and quality results.',
      requirements: [
        'Video length: 3-4 minutes',
        'Show unboxing experience',
        'Demonstrate all features',
        'Make at least 2 different drinks',
        'High-quality close-ups'
      ],
      thumbnail: 'https://images.pexels.com/photos/4350057/pexels-photo-4350057.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'Smart Home Setup',
      type: 'ugc',
      category: 'tech',
      reward: 250,
      totalBudget: 5000,
      remainingBudget: 4500,
      viewsRequired: 200000,
      remainingViews: 180000,
      description: 'Create a comprehensive setup and review video of our smart home devices. Focus on ease of installation and daily benefits.',
      requirements: [
        'Video length: 5-7 minutes',
        'Show installation process',
        'Demonstrate app connectivity',
        'Showcase automation features',
        'Include voice control demo'
      ],
      thumbnail: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'Gaming Headset Review',
      type: 'ugc',
      category: 'gaming',
      reward: 125,
      totalBudget: 2500,
      remainingBudget: 2125,
      viewsRequired: 80000,
      remainingViews: 68000,
      description: 'Create an in-depth review of our premium gaming headset. Focus on sound quality, comfort, and gaming performance.',
      requirements: [
        'Video length: 4-6 minutes',
        'Audio quality test',
        'Comfort test during long sessions',
        'Microphone test',
        'Gaming performance footage'
      ],
      thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      title: 'Cooking Recipe Video',
      type: 'ugc',
      category: 'food',
      reward: 180,
      totalBudget: 3600,
      remainingBudget: 3240,
      viewsRequired: 130000,
      remainingViews: 117000,
      description: 'Create a recipe video using our cookware set. Show the versatility and quality of the products while making a delicious meal.',
      requirements: [
        'Video length: 4-5 minutes',
        'Show multiple pieces from the set',
        'Include cooking techniques',
        'High-quality food shots',
        'Final presentation'
      ],
      thumbnail: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: 't1',
      type: 'ugc_submission',
      status: 'pending',
      amount: 50.00,
      date: '2024-03-20',
      details: {
        title: 'Product Review Video',
        platform: 'YouTube',
        views: 15000
      }
    },
    {
      id: 't2',
      type: 'ugc_submission',
      status: 'approved',
      amount: 75.00,
      date: '2024-03-19',
      details: {
        title: 'Brand Showcase',
        platform: 'TikTok',
        views: 25000
      }
    },
    {
      id: 't3',
      type: 'withdrawal',
      status: 'approved',
      amount: 500.00,
      date: '2024-03-18'
    },
    {
      id: 't4',
      type: 'ugc_submission',
      status: 'rejected',
      amount: 0,
      date: '2024-03-17',
      details: {
        title: 'App Tutorial',
        platform: 'Instagram',
        views: 5000
      }
    },
    {
      id: 't5',
      type: 'affiliate_earning',
      status: 'approved',
      amount: 25.00,
      date: '2024-03-16'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAccountChange = (index: number, field: keyof SocialMediaAccount, value: string) => {
    const newAccounts = [...socialAccounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setSocialAccounts(newAccounts);
  };

  const addAccount = () => {
    setSocialAccounts([...socialAccounts, { platform: '', url: '' }]);
  };

  const removeAccount = (index: number) => {
    if (socialAccounts.length > 1) {
      const newAccounts = socialAccounts.filter((_, i) => i !== index);
      setSocialAccounts(newAccounts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { socialAccounts, revenueShare });
    setShowCreatorForm(false);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    console.log('Withdrawal requested:', amount);
    setWithdrawalAmount('');
    setShowWithdrawalForm(false);
  };

  const handleCreateContent = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowSubmissionForm(true);
  };

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submission:', { campaign: selectedCampaign, ...submissionForm });
    setShowSubmissionForm(false);
    setSelectedCampaign(null);
    setSubmissionForm({
      videoUrl: '',
      description: '',
      platform: '',
      screenshot: ''
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
        status === 'approved' ? 'bg-green-500/20 text-green-500' :
        'bg-red-500/20 text-red-500'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleSubmissionAction = (submissionId: string, action: 'approve' | 'reject') => {
    console.log(`${action} submission:`, submissionId);
    // Here you would typically update the submission status in your backend
  };

  const handlePurchaseAction = (purchaseId: string, action: 'approve' | 'reject') => {
    console.log(`${action} purchase:`, purchaseId);
    // Here you would typically update the purchase status in your backend
  };

  const SubmissionModal = () => {
    if (!selectedCampaign) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-gray-800 rounded-lg w-full max-w-2xl my-8">
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Submit UGC Video</h3>
              <button 
                onClick={() => setShowSubmissionForm(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="mb-6">
              <h4 className="font-medium mb-4">Campaign Requirements</h4>
              <div className="bg-gray-700 rounded-lg p-4">
                <ul className="space-y-2 text-gray-300">
                  {selectedCampaign.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmission} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Video Platform</label>
                  <select
                    value={submissionForm.platform}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, platform: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Platform</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Video URL</label>
                  <input
                    type="url"
                    value={submissionForm.videoUrl}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, videoUrl: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter video URL"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Video Description</label>
                <textarea
                  value={submissionForm.description}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, description: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your video content..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Screenshot Proof</label>
                <input
                  type="url"
                  value={submissionForm.screenshot}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, screenshot: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter screenshot URL"
                  required
                />
                <p className="text-sm text-gray-400 mt-1">
                  Provide a screenshot showing your video metrics (views, engagement, etc.)
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Reward Details</span>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Base reward: ${selectedCampaign.reward}</p>
                  <p>• Required views: {selectedCampaign.viewsRequired.toLocaleString()}</p>
                  <p>• Additional bonus for exceeding view requirements</p>
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setShowMobileNav(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Navigation Overlay */}
      {isMobile && showMobileNav && (
        <div className="fixed inset-0 bg-black/80 z-50">
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Star className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">Creator Studio</h2>
              </div>
              <button
                onClick={() => setShowMobileNav(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedSection(item.id as NavigationSection);
                      setShowMobileNav(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedSection === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700 p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Star className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">Creator Studio</h2>
          </div>

          <nav className="space-y-2">
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id as NavigationSection)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    selectedSection === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className={`p-8 ${!isMobile ? 'ml-64' : ''}`}>
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              {navigationItems.find(item => item.id === selectedSection)?.label}
            </h1>
            <p className="text-gray-400 mt-1">
              {selectedSection === 'overview' && 'Dashboard overview and key metrics'}
              {selectedSection === 'ugc' && 'Create and manage UGC videos'}
              {selectedSection === 'affiliate' && 'Manage your affiliate campaigns'}
              {selectedSection === 'tools' && 'Creator tools and resources'}
              {selectedSection === 'analytics' && 'Performance analytics and insights'}
              {selectedSection === 'wallet' && 'Manage your earnings and payouts'}
              {selectedSection === 'settings' && 'Account settings and preferences'}
            </p>
          </div>

          {selectedSection === 'overview' && !showCreatorForm && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Become a Creator</h2>
                  <p className="text-white/80 mt-1">Start your journey as a content creator</p>
                </div>
                <button 
                  onClick={() => setShowCreatorForm(true)}
                  className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}

          {selectedSection === 'overview' && !showCreatorForm ? (
            <div className="space-y-8">
              {/* Earnings Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Video className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-sm text-gray-400">UGC Earnings</span>
                  </div>
                  <p className="text-2xl font-bold">$1,845.00</p>
                  <div className="mt-2 text-sm text-blue-500">57% of total</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Share2 className="w-6 h-6 text-purple-500" />
                    </div>
                    <span className="text-sm text-gray-400">Affiliate Earnings</span>
                  </div>
                  <p className="text-2xl font-bold">$1,389.56</p>
                  <div className="mt-2 text-sm text-purple-500">43% of total</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-sm text-gray-400">Total Earnings</span>
                  </div>
                  <p className="text-2xl font-bold">$3,234.56</p>
                  <div className="mt-2 text-sm text-green-500">+12.5% this month</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Star className="w-6 h-6 text-purple-500" />
                    </div>
                    <span className="text-sm text-gray-400">Pending Reviews</span>
                  </div>
                  <p className="text-2xl font-bold">5</p>
                  <div className="mt-2 text-sm text-purple-500">2 in progress</div>
                </div>
              </div>

              {/* Available Balance & Withdrawal */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <Wallet className="w-6 h-6 text-green-500" />
                      </div>
                      <h2 className="text-xl font-semibold">Available for Withdrawal</h2>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-green-500">$2,580.50</span>
                      <span className="text-gray-400">/ $3,234.56 total</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">$654.06 pending clearance</p>
                  </div>

                  <button
                    onClick={() => setShowWithdrawalForm(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Withdraw Funds</span>
                  </button>
                </div>

                {showWithdrawalForm && (
                  <div className="mt-6 border-t border-gray-700 pt-6">
                    <form onSubmit={handleWithdrawal} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Withdrawal Amount</label>
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="number"
                              value={withdrawalAmount}
                              onChange={(e) => setWithdrawalAmount(e.target.value)}
                              className="w-full bg-gray-700 rounded-lg border border-gray-600 pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Enter amount"
                              min="1"
                              step="0.01"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                          >
                            Withdraw
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowWithdrawalForm(false)}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  
                  {recentTransactions.map(transaction => (
                    <div 
                      key={transaction.id}
                      className="bg-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            transaction.type === 'ugc_submission' ? 'bg-blue-500/10' :
                            transaction.type === 'withdrawal' ? 'bg-green-500/10' :
                            'bg-purple-500/10'
                          }`}>
                            {transaction.type === 'ugc_submission' ? (
                              <Video className={`w-5 h-5 ${
                                transaction.status === 'approved' ? 'text-green-500' :
                                transaction.status === 'pending' ? 'text-yellow-500' :
                                'text-red-500'
                              }`} />
                            ) : transaction.type === 'withdrawal' ? (
                              <DollarSign className="w-5 h-5 text-green-500" />
                            ) : (
                              <Share2 className="w-5 h-5 text-purple-500" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {transaction.type === 'ugc_submission' ? 'UGC Submission' :
                                 transaction.type === 'withdrawal' ? 'Withdrawal' :
                                 'Affiliate Earning'}
                              </span>
                              {getStatusBadge(transaction.status)}
                            </div>
                            {transaction.details && (
                              <p className="text-sm text-gray-400 mt-1">
                                {transaction.details.title} • {transaction.details.platform}
                                {transaction.details.views && (
                                  <span> • {transaction.details.views.toLocaleString()} views</span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
                          }`}>
                            {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-blue-500 text-white text-sm">
                        ${campaign.reward}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        {campaign.type === 'ugc' ? (
                          <Video className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Music className="w-5 h-5 text-purple-400" />
                        )}
                        <span className="text-sm text-gray-400">
                          {campaign.type === 'ugc' ? 'UGC Video' : 'Freestyle Music'}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{campaign.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{campaign.description}</p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Campaign Budget</span>
                            <span className="text-green-500">
                              ${formatNumber(campaign.remainingBudget)} / ${formatNumber(campaign.totalBudget)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full transition-all"
                              style={{ width: `${(campaign.remainingBudget / campaign.totalBudget) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Required Views</span>
                            <span className="text-blue-400">
                              {formatNumber(campaign.remainingViews)} / {formatNumber(campaign.viewsRequired)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${(campaign.remainingViews / campaign.viewsRequired) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCreateContent(campaign)}
                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Create Content
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : showCreatorForm ? (
            <div className="space-y-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Minimum 10,000 followers on any social media platform</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>At least 100,000 views on your content</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Active social media presence</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Social Media Accounts</h2>
                  
                  {socialAccounts.map((account, index) => (
                    <div key={index} className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Platform</label>
                          <select
                            value={account.platform}
                            onChange={(e) => handleAccountChange(index, 'platform', e.target.value)}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select Platform</option>
                            <option value="instagram">Instagram</option>
                            <option value="tiktok">TikTok</option>
                            <option value="youtube">YouTube</option>
                            <option value="twitter">Twitter</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Profile URL</label>
                          <input
                            type="url"
                            value={account.url}
                            onChange={(e) => handleAccountChange(index, 'url', e.target.value)}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://"
                            required
                          />
                        </div>
                      </div>

                      {socialAccounts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAccount(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove Account
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addAccount}
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Account</span>
                  </button>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Revenue Sharing</h2>
                  <div className="space-y-4">
                    <p className="text-gray-400">Choose how much revenue you want to share with your sub-creators</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percentage) => (
                        <button
                          key={percentage}
                          type="button"
                          onClick={() => setRevenueShare(percentage)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            revenueShare === percentage
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          <DollarSign className="w-4 h-4" />
                          <span>{percentage}%</span>
                        </button>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-400">
                      You will share {revenueShare}% of your earnings with sub-creators who complete tasks through your referral
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3">
                      <div className="flex items-center justify-between">
                        <a 
                          href={referralLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors font-mono"
                        >
                          {referralLink}
                        </a>
                        <button
                          type="button"
                          onClick={copyReferralLink}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Users className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Share this link with other creators to earn {100 - revenueShare}% when they complete tasks
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          ) : null}

          {selectedSection === 'ugc' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-blue-500 text-white text-sm">
                        ${campaign.reward}
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        {campaign.type === 'ugc' ? (
                          <Video className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Music className="w-5 h-5 text-purple-400" />
                        )}
                        <span className="text-sm text-gray-400">
                          {campaign.type === 'ugc' ? 'UGC Video' : 'Freestyle Music'}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{campaign.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{campaign.description}</p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Campaign Budget</span>
                            <span className="text-green-500">
                              ${formatNumber(campaign.remainingBudget)} / ${formatNumber(campaign.totalBudget)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full transition-all"
                              style={{ width: `${(campaign.remainingBudget / campaign.totalBudget) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Required Views</span>
                            <span className="text-blue-400">
                              {formatNumber(campaign.remainingViews)} / {formatNumber(campaign.viewsRequired)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${(campaign.remainingViews / campaign.viewsRequired) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCreateContent(campaign)}
                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Create Content
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === 'affiliate' && (
            <div className="space-y-6">
              {/* Affiliate Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-sm text-gray-400">Total Commission</span>
                  </div>
                  <p className="text-2xl font-bold">$1,389.56</p>
                  <div className="mt-2 text-sm text-green-500">+15.3% this month</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Package className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-sm text-gray-400">Products Sold</span>
                  </div>
                  <p className="text-2xl font-bold">156</p>
                  <div className="mt-2 text-sm text-blue-500">23 this week</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Users className="w-6 h-6 text-purple-500" />
                    </div>
                    <span className="text-sm text-gray-400">Click-through Rate</span>
                  </div>
                  <p className="text-2xl font-bold">4.8%</p>
                  <div className="mt-2 text-sm text-purple-500">+2.1% increase</div>
                </div>
              </div>

              {/* Affiliate Products */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Affiliate Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-gray-700 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={product.seller.avatar}
                            alt={product.seller.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-400">{product.seller.name}</span>
                          {product.seller.rating >= 4.8 && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                        </div>

                        <h3 className="font-semibold mb-2">{product.title}</h3>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold text-green-500">${product.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-400">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Commission Rate</span>
                            <span className="text-green-500 font-semibold">15%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-gray-400">Per Sale</span>
                            <span className="text-green-500 font-semibold">
                              ${(product.price * 0.15).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="relative">
                            <input
                              type="text"
                              value={`https://shop.example.com/p/${product.id}?ref=your_id`}
                              readOnly
                              className="w-full bg-gray-800 rounded-lg border border-gray-600 p-3 pr-24 font-mono text-sm"
                            />
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`https://shop.example.com/p/${product.id}?ref=your_id`);
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              Copy Link
                            </button>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => window.open(`/shop/${product.id}`, '_blank')}
                              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => {
                                const text = `Check out ${product.title}! Amazing deal at $${product.price}\n\nhttps://shop.example.com/p/${product.id}?ref=your_id`;
                                navigator.clipboard.writeText(text);
                              }}
                              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promotional Tips */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Promotion Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Social Media</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Share product reviews on your social platforms</li>
                      <li>• Create unboxing videos for physical products</li>
                      <li>• Post before/after results for relevant items</li>
                      <li>• Use relevant hashtags to increase visibility</li>
                    </ul>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Content Creation</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Create detailed product demonstration videos</li>
                      <li>• Write honest, comprehensive reviews</li>
                      <li>• Share personal experiences with products</li>
                      <li>• Compare products to help buyers decide</li>
                    </ul>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Best Practices</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Always disclose affiliate relationships</li>
                      <li>• Focus on products you genuinely like</li>
                      <li>• Respond to questions about products</li>
                      <li>• Keep track of best-performing products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === 'tools' && (
            <div className="space-y-6">
              {/* Tools-specific content */}
            </div>
          )}

          {selectedSection === 'analytics' && (
            <div className="space-y-8">
              {/* Recent UGC Submissions */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Recent UGC Submissions</h2>
                <div className="space-y-4">
                  {recentSubmissions.map(submission => (
                    <div key={submission.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={submission.thumbnail}
                          alt={submission.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold truncate">{submission.title}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <img
                                  src={submission.creator.avatar}
                                  alt={submission.creator.name}
                                  className="w-5 h-5 rounded-full"
                                />
                                <span className="text-sm text-gray-400">{submission.creator.name}</span>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              submission.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                              submission.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                              'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                            <span>{submission.views.toLocaleString()} views</span>
                            <span>{submission.engagement.likes.toLocaleString()} likes</span>
                            <span>{submission.engagement.comments.toLocaleString()} comments</span>
                            <span>{submission.engagement.shares.toLocaleString()} shares</span>
                          </div>

                          {submission.status === 'pending' && (
                            <div className="flex space-x-2 mt-4">
                              <button
                                onClick={() => handleSubmissionAction(submission.id, 'approve')}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleSubmissionAction(submission.id, 'reject')}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Affiliate Purchases */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Affiliate Purchases</h2>
                <div className="space-y-4">
                  {recentPurchases.map(purchase => (
                    <div key={purchase.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={purchase.product.image}
                          alt={purchase.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold truncate">{purchase.product.name}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <img
                                  src={purchase.customer.avatar}
                                  alt={purchase.customer.name}
                                  className="w-5 h-5 rounded-full"
                                />
                                <span className="text-sm text-gray-400">{purchase.customer.name}</span>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              purchase.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                              purchase.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                              'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-lg font-semibold">${purchase.product.price.toFixed(2)}</span>
                            <span className="text-green-500">
                              Commission: ${purchase.commission.toFixed(2)}
                            </span>
                          </div>

                          {purchase.status === 'pending' && (
                            <div className="flex space-x-2 mt-4">
                              <button
                                onClick={() => handlePurchaseAction(purchase.id, 'approve')}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handlePurchaseAction(purchase.id, 'reject')}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSubmissionForm && <SubmissionModal />}
    </div>
  );
};

export default Creator;