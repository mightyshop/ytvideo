import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, DollarSign, ExternalLink, X, ImageIcon, Info } from 'lucide-react';

interface SocialAction {
  id: string;
  platform: string;
  icon: string;
  name: string;
  reward: number;
  color: string;
  url: string;
  instructions: string[];
  actions: {
    like?: { count: number, reward: number };
    comment?: { count: number, reward: number };
    share?: { count: number, reward: number };
    follow?: { count: number, reward: number };
    subscribe?: { count: number, reward: number };
  };
}

interface SubmissionForm {
  actionType: string;
  platform: string;
  screenshot: string;
}

const Social: React.FC = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedAction, setSelectedAction] = useState<SubmissionForm>({
    actionType: '',
    platform: '',
    screenshot: ''
  });

  const socialActions: SocialAction[] = [
    {
      id: 'youtube',
      platform: 'YouTube',
      icon: 'https://images.pexels.com/photos/12876612/pexels-photo-12876612.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Subscribe & Earn',
      reward: 1.00,
      color: 'bg-red-500',
      url: 'https://youtube.com/@example',
      instructions: [
        'Go to our YouTube channel',
        'Click the Subscribe button',
        'Take a screenshot showing you are subscribed',
        'Submit the screenshot for verification'
      ],
      actions: {
        subscribe: { count: 0, reward: 1.00 },
        like: { count: 0, reward: 1.00 },
        comment: { count: 0, reward: 1.00 },
        share: { count: 0, reward: 1.00 }
      }
    },
    {
      id: 'tiktok',
      platform: 'TikTok',
      icon: 'https://images.pexels.com/photos/19338755/pexels-photo-19338755.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Follow & Engage',
      reward: 1.00,
      color: 'bg-pink-500',
      url: 'https://tiktok.com/@example',
      instructions: [
        'Visit our TikTok profile',
        'Click the Follow button',
        'Take a screenshot of your follow status',
        'Submit the screenshot for verification'
      ],
      actions: {
        follow: { count: 0, reward: 1.00 },
        like: { count: 0, reward: 1.00 },
        share: { count: 0, reward: 1.00 }
      }
    },
    {
      id: 'instagram',
      platform: 'Instagram',
      icon: 'https://images.pexels.com/photos/4219088/pexels-photo-4219088.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Share & Like',
      reward: 1.00,
      color: 'bg-purple-500',
      url: 'https://instagram.com/example',
      instructions: [
        'Go to our Instagram profile',
        'Follow and like our latest post',
        'Take a screenshot showing your engagement',
        'Submit the screenshot for verification'
      ],
      actions: {
        like: { count: 0, reward: 1.00 },
        share: { count: 0, reward: 1.00 },
        follow: { count: 0, reward: 1.00 }
      }
    },
    {
      id: 'twitter',
      platform: 'Twitter',
      icon: 'https://images.pexels.com/photos/12899188/pexels-photo-12899188.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Tweet & Earn',
      reward: 1.00,
      color: 'bg-blue-400',
      url: 'https://twitter.com/example',
      instructions: [
        'Visit our Twitter profile',
        'Follow and retweet our pinned tweet',
        'Take a screenshot of your retweet',
        'Submit the screenshot for verification'
      ],
      actions: {
        follow: { count: 0, reward: 1.00 },
        like: { count: 0, reward: 1.00 },
        share: { count: 0, reward: 1.00 }
      }
    }
  ];

  const handleActionClick = (platform: string, actionType: string) => {
    setSelectedAction({
      platform,
      actionType,
      screenshot: ''
    });
    setShowSubmissionForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submission:', selectedAction);
    setShowSubmissionForm(false);
    setSelectedAction({ actionType: '', platform: '', screenshot: '' });
  };

  const ActionCard = ({ action }: { action: typeof socialActions[0] }) => {
    const getActionIcon = (type: string) => {
      switch (type) {
        case 'like': return <Heart className="w-5 h-5" />;
        case 'comment': return <MessageCircle className="w-5 h-5" />;
        case 'share': return <Share2 className="w-5 h-5" />;
        case 'follow':
        case 'subscribe': return <Users className="w-5 h-5" />;
        default: return null;
      }
    };

    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="relative">
          <img 
            src={action.icon} 
            alt={action.platform} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <div>
              <h3 className="text-xl font-bold">{action.platform}</h3>
              <p className="text-gray-300">{action.name}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(action.actions).map(([type, data]) => (
              <div key={type} className="flex flex-col space-y-2">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {getActionIcon(type)}
                    <span className="capitalize">{type}</span>
                  </div>
                  <div className="flex items-center text-green-500">
                    <DollarSign className="w-4 h-4" />
                    <span>{data.reward.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{data.count} done</p>
                </div>
                <button
                  onClick={() => handleActionClick(action.platform, type)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Complete Task</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SubmissionModal = () => {
    const action = socialActions.find(a => a.platform === selectedAction.platform);
    if (!action) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Submit Proof</h3>
              <button 
                onClick={() => setShowSubmissionForm(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-blue-400" />
                <h4 className="font-medium">Instructions</h4>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                {action.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <a
              href={action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Go to {action.platform}</span>
            </a>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Screenshot URL
                </label>
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={selectedAction.screenshot}
                    onChange={(e) => setSelectedAction({ ...selectedAction, screenshot: e.target.value })}
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
                Submit for Verification
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Social Actions</h1>
        
        <div className="grid gap-6">
          {socialActions.map(action => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
      </div>

      {showSubmissionForm && <SubmissionModal />}
    </div>
  );
};

export default Social;