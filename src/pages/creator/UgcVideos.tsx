import React, { useState } from 'react';
import { Video, DollarSign, Clock, CheckCircle, X, Link as LinkIcon, FileText, ExternalLink } from 'lucide-react';

interface UgcStats {
  totalAmount: number;
  pendingAmount: number;
  approvedAmount: number;
  totalVideos: number;
  pendingVideos: number;
  approvedVideos: number;
  rejectedVideos: number;
}

interface UgcOpportunity {
  id: number;
  title: string;
  type: string;
  reward: number;
  description: string;
  budget: {
    current: number;
    total: number;
  };
  views: {
    required: number;
    total: number;
  };
  image: string;
}

interface SubmissionForm {
  videoUrl: string;
  description: string;
  platform: string;
}

const UgcVideos: React.FC = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<UgcOpportunity | null>(null);
  const [form, setForm] = useState<SubmissionForm>({
    videoUrl: '',
    description: '',
    platform: 'youtube'
  });

  const stats: UgcStats = {
    totalAmount: 3250.50,
    pendingAmount: 670.00,
    approvedAmount: 2580.50,
    totalVideos: 156,
    pendingVideos: 12,
    approvedVideos: 138,
    rejectedVideos: 6
  };

  const opportunities: UgcOpportunity[] = [
    {
      id: 1,
      title: 'Skincare Product Review',
      type: 'UGC Video',
      reward: 150,
      description: 'Create an authentic review video showcasing our new skincare line. Focus on application, results, and your honest experience.',
      budget: {
        current: 2400,
        total: 3000
      },
      views: {
        required: 80000,
        total: 100000
      },
      image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Fitness App Demo',
      type: 'UGC Video',
      reward: 200,
      description: 'Create a walkthrough video of your workout using our fitness app. Show real results and highlight key features.',
      budget: {
        current: 3600,
        total: 4500
      },
      views: {
        required: 135000,
        total: 150000
      },
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Coffee Maker Tutorial',
      type: 'UGC Video',
      reward: 175,
      description: 'Create an engaging tutorial showing how to make the perfect coffee using our premium coffee maker. Focus on ease of use and quality.',
      budget: {
        current: 3000,
        total: 3500
      },
      views: {
        required: 85000,
        total: 120000
      },
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Smart Home Setup',
      type: 'UGC Video',
      reward: 250,
      description: 'Create a comprehensive setup and review video of our smart home devices. Focus on ease of installation and daily benefits.',
      budget: {
        current: 4500,
        total: 5000
      },
      views: {
        required: 180000,
        total: 200000
      },
      image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      title: 'Gaming Headset Review',
      type: 'UGC Video',
      reward: 125,
      description: 'Create an in-depth review of our premium gaming headset. Focus on sound quality, comfort, and gaming performance.',
      budget: {
        current: 2100,
        total: 2500
      },
      views: {
        required: 68000,
        total: 80000
      },
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      title: 'Cooking Recipe Video',
      type: 'UGC Video',
      reward: 180,
      description: 'Create a recipe video using our cookware set. Show the versatility and quality of the products while making a delicious meal.',
      budget: {
        current: 3200,
        total: 3600
      },
      views: {
        required: 117000,
        total: 130000
      },
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submission:', { opportunity: selectedOpportunity, form });
    setShowSubmissionForm(false);
    setForm({
      videoUrl: '',
      description: '',
      platform: 'youtube'
    });
    setSelectedOpportunity(null);
  };

  const SubmissionModal = () => {
    if (!selectedOpportunity) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Submit UGC Content</h2>
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
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedOpportunity.image} 
                  alt={selectedOpportunity.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{selectedOpportunity.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{selectedOpportunity.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-green-500 font-semibold">${selectedOpportunity.reward}</span>
                    <span className="text-gray-400">reward</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Content Requirements</h3>
              <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Video Requirements</span>
                </div>
                <ul className="space-y-2 text-gray-300 ml-7">
                  <li>• Video length: 2-5 minutes</li>
                  <li>• High-quality footage (1080p minimum)</li>
                  <li>• Clear audio quality</li>
                  <li>• Good lighting conditions</li>
                  <li>• Show product details and features</li>
                  <li>• Include hands-on demonstration</li>
                  <li>• Provide honest feedback</li>
                  <li>• Follow brand guidelines</li>
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
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Video URL</label>
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter video URL"
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Provide the URL to your uploaded video
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Describe your content and how it meets the requirements..."
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowSubmissionForm(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UGC Videos</h1>
        <p className="text-gray-400">Create and manage UGC videos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-gray-400">Total Earnings</span>
          </div>
          <p className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-400">Pending</span>
            <span className="text-sm text-yellow-400">${stats.pendingAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-400">Approved</span>
            <span className="text-sm text-green-400">${stats.approvedAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Video className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400">Total Videos</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalVideos}</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Pending</span>
              </div>
              <span className="text-sm text-yellow-400">{stats.pendingVideos}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">Approved</span>
              </div>
              <span className="text-sm text-green-400">{stats.approvedVideos}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-400">Rejected</span>
              </div>
              <span className="text-sm text-red-400">{stats.rejectedVideos}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <span className="text-gray-400">Average Earnings</span>
          </div>
          <p className="text-2xl font-bold">${(stats.totalAmount / stats.totalVideos).toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">Per approved video</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-400">Approval Rate</span>
          </div>
          <p className="text-2xl font-bold">
            {((stats.approvedVideos / (stats.totalVideos - stats.pendingVideos)) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-2">Excluding pending reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map(opportunity => (
          <div key={opportunity.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src={opportunity.image} 
                alt={opportunity.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full">
                ${opportunity.reward}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Video className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-blue-400">{opportunity.type}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{opportunity.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{opportunity.description}</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Campaign Budget</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-full rounded-full"
                      style={{ width: `${(opportunity.budget.current / opportunity.budget.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-400">${formatNumber(opportunity.budget.current)}</span>
                    <span className="text-sm text-gray-400">${formatNumber(opportunity.budget.total)}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Required Views</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${(opportunity.views.required / opportunity.views.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-400">{formatNumber(opportunity.views.required)}</span>
                    <span className="text-sm text-gray-400">{formatNumber(opportunity.views.total)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedOpportunity(opportunity);
                  setShowSubmissionForm(true);
                }}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                Create Content
              </button>
            </div>
          </div>
        ))}
      </div>

      {showSubmissionForm && <SubmissionModal />}
    </div>
  );
};

export default UgcVideos;