import React, { useState, useEffect } from 'react';
import { X, Globe, Link, Video, Music, Star, Plus, FileText, Trash2, Facebook, Twitter, Instagram, Youtube, Headphones, Tv, DollarSign } from 'lucide-react';
import { Campaign } from '../types';
import BusinessLayout from '../components/BusinessLayout';
import FormInput from '../components/FormInput';
import FormTextArea from '../components/FormTextArea';
import FormSelect from '../components/FormSelect';
import RegionSelect from '../components/RegionSelect';
import { regions } from '../data/regions';
import { cpaRates } from '../data/cpaRates';

const socialPlatforms = [
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'youtube', label: 'YouTube', icon: Youtube }
];

const socialActions = [
  { value: 'like', label: 'Like' },
  { value: 'follow', label: 'Follow' },
  { value: 'share', label: 'Share' },
  { value: 'comment', label: 'Comment' }
];

const campaignTypes = [
  { 
    id: 'ugc_video', 
    label: 'UGC Video', 
    description: 'Get creators to make user-generated content videos',
    reward: 10,
    defaultRequirements: [
      'Video length: 30-60 seconds',
      'High-quality footage',
      'Clear audio',
      'Original content only',
      'Follow brand guidelines'
    ]
  },
  { 
    id: 'freestyle_music', 
    label: 'Freestyle Music', 
    description: 'Get creators to make freestyle music videos',
    reward: 5,
    defaultRequirements: [
      'Video length: 15-30 seconds',
      'Original freestyle content',
      'Clear audio quality',
      'Appropriate content',
      'Follow music guidelines'
    ]
  },
  { 
    id: 'product_review', 
    label: 'Product Review', 
    description: 'Get authentic product reviews from creators',
    reward: 10,
    defaultRequirements: [
      'Video length: 2-5 minutes',
      'Honest feedback',
      'Show product details',
      'Demonstrate usage',
      'Include pros and cons'
    ]
  },
  { 
    id: 'app_review', 
    label: 'App Review', 
    description: 'Get detailed app reviews from users',
    reward: 8,
    defaultRequirements: [
      'Video length: 3-5 minutes',
      'Show app features',
      'Demonstrate functionality',
      'Discuss user experience',
      'Provide honest feedback'
    ]
  },
  { 
    id: 'movie_review', 
    label: 'Movie Review', 
    description: 'Get movie reviews and critiques',
    reward: 12,
    defaultRequirements: [
      'Video length: 5-10 minutes',
      'No major spoilers',
      'Discuss plot and acting',
      'Rate production quality',
      'Give overall recommendation'
    ]
  },
  { 
    id: 'website_review', 
    label: 'Website Review', 
    description: 'Get website usability reviews',
    reward: 8,
    defaultRequirements: [
      'Video length: 3-5 minutes',
      'Test main features',
      'Assess user interface',
      'Check mobile responsiveness',
      'Suggest improvements'
    ]
  },
  { id: 'watch_video', label: 'Watch Video', description: 'Get users to watch your video content' },
  { id: 'social_media', label: 'Social Media', description: 'Promote your social media presence' },
  { id: 'h5_game', label: 'H5 Game', description: 'Promote your HTML5 game' },
  { id: 'website', label: 'Website', description: 'Drive traffic to your website' },
  { id: 'app_install', label: 'App Install', description: 'Promote your mobile app' },
  { 
    id: 'live', 
    label: 'Live Stream', 
    description: 'Promote your live streaming content',
    defaultRequirements: [
      'Stable internet connection',
      'Professional streaming setup',
      'Engaging content',
      'Regular schedule',
      'Interactive with viewers'
    ]
  }
];

interface CampaignForm {
  type: string;
  name: string;
  description: string;
  targetViews: string;
  mediaUrl: string;
  requirements: string[];
  targetCountries: string[];
  reward?: number;
  platform?: string;
  videoUrl?: string;
  gameUrl?: string;
  websiteUrl?: string;
  appUrl?: string;
  audioUrl?: string;
  liveStreamUrl?: string;
  socialPlatform?: string;
  socialAction?: string;
  socialUrl?: string;
  watchDuration?: {
    value: number;
    unit: 'minutes' | 'hours';
  };
}

const reviewCampaignTypes = [
  'ugc_video',
  'freestyle_music', 
  'product_review',
  'app_review',
  'movie_review',
  'website_review'
];

const Advertise: React.FC = () => {
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [form, setForm] = useState<CampaignForm>({
    type: '',
    name: '',
    description: '',
    targetViews: '',
    mediaUrl: '',
    requirements: [''],
    targetCountries: [],
    watchDuration: {
      value: 1,
      unit: 'minutes'
    }
  });
  const [budget, setBudget] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    if (reviewCampaignTypes.includes(form.type)) {
      setEstimatedCost(parseFloat(budget) || 0);
      return;
    }

    if (!form.targetViews || isNaN(parseInt(form.targetViews))) {
      setEstimatedCost(0);
      return;
    }

    const views = parseInt(form.targetViews);
    let totalCost = 0;

    const selectedRegions = new Set(
      form.targetCountries.map(countryCode => {
        const region = regions.find(r => 
          r.countries.some(c => c.code === countryCode)
        );
        return region?.id;
      })
    );

    selectedRegions.forEach(regionId => {
      if (!regionId) return;
      const rate = cpaRates[regionId as keyof typeof cpaRates];
      if (!rate) return;

      const countriesInRegion = form.targetCountries.filter(countryCode =>
        regions.find(r => r.id === regionId)?.countries.some(c => c.code === countryCode)
      ).length;

      const regionViews = Math.floor(views * (countriesInRegion / form.targetCountries.length));
      const regionCost = (regionViews / rate.per) * rate.rate;
      totalCost += regionCost;
    });

    setEstimatedCost(totalCost);
  }, [form.targetViews, form.targetCountries, form.type, budget]);

  const handleTypeSelect = (typeId: string) => {
    const campaignType = campaignTypes.find(type => type.id === typeId);
    setForm({
      ...form,
      type: typeId,
      requirements: campaignType?.defaultRequirements || [''],
      reward: campaignType?.reward
    });
    setShowCampaignForm(true);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...form.requirements];
    newRequirements[index] = value;
    setForm({ ...form, requirements: newRequirements });
  };

  const addRequirement = () => {
    setForm({ ...form, requirements: [...form.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = form.requirements.filter((_, i) => i !== index);
    setForm({ ...form, requirements: newRequirements });
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.type || !form.name || form.targetCountries.length === 0) return;

    if (reviewCampaignTypes.includes(form.type)) {
      if (!budget || isNaN(parseFloat(budget)) || parseFloat(budget) <= 0) return;
    } else {
      if (!form.targetViews || isNaN(parseInt(form.targetViews)) || parseInt(form.targetViews) <= 0) return;
    }

    const cleanedRequirements = form.requirements.filter(req => req.trim() !== '');

    const campaign: Campaign = {
      id: Date.now().toString(),
      type: form.type as Campaign['type'],
      name: form.name,
      budget: estimatedCost,
      targetCountries: form.targetCountries,
      status: 'draft',
      mediaUrl: form.mediaUrl,
      requirements: cleanedRequirements,
      reward: form.reward
    };

    console.log('Created campaign:', campaign);

    setForm({
      type: '',
      name: '',
      description: '',
      targetViews: '',
      mediaUrl: '',
      requirements: [''],
      targetCountries: []
    });
    setBudget('');
    setShowCampaignForm(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ugc_video':
        return <Video className="w-6 h-6 text-blue-400" />;
      case 'freestyle_music':
        return <Music className="w-6 h-6 text-purple-400" />;
      case 'product_review':
      case 'app_review':
      case 'movie_review':
      case 'website_review':
        return <Star className="w-6 h-6 text-yellow-400" />;
      case 'watch_video':
        return <Video className="w-6 h-6 text-green-400" />;
      case 'social_media':
        return <Globe className="w-6 h-6 text-pink-400" />;
      case 'h5_game':
        return <FileText className="w-6 h-6 text-orange-400" />;
      case 'live':
        return <Tv className="w-6 h-6 text-indigo-400" />;
      default:
        return null;
    }
  };

  return (
    <BusinessLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Advertising Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaignTypes.map((type) => (
            <div
              key={type.id}
              className="p-6 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition-all bg-gray-800 hover:bg-gray-800/80"
            >
              <div className="flex items-center space-x-3 mb-3">
                {getTypeIcon(type.id)}
                <h3 className="text-lg font-semibold">{type.label}</h3>
              </div>
              <p className="text-gray-400 mb-3">{type.description}</p>
              {type.reward && (
                <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm inline-block mb-4">
                  Creator Reward: ${type.reward}
                </div>
              )}
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                onClick={() => handleTypeSelect(type.id)}
              >
                Create Campaign
              </button>
            </div>
          ))}
        </div>

        {showCampaignForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="relative bg-gray-800 rounded-lg w-full max-w-4xl my-8">
              <div className="sticky top-0 bg-gray-800 rounded-t-lg border-b border-gray-700 p-6 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Create Campaign</h2>
                  <button 
                    onClick={() => setShowCampaignForm(false)}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <form onSubmit={handleCreateCampaign} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Campaign Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter campaign name"
                      required
                    />

                    {!reviewCampaignTypes.includes(form.type) && (
                      <FormInput
                        label="Target Views/Actions"
                        type="number"
                        value={form.targetViews}
                        onChange={(e) => setForm({ ...form, targetViews: e.target.value })}
                        placeholder="Enter target views"
                        min="1000"
                        step="1000"
                        required
                      />
                    )}
                  </div>

                  <FormTextArea
                    label="Campaign Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter campaign description"
                    required
                  />

                  {reviewCampaignTypes.includes(form.type) && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Campaign Budget</label>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your budget"
                          min="1"
                          step="0.01"
                          required
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        Enter the total budget you want to spend on this campaign.
                        {form.reward && ` Creators will earn $${form.reward} per submission if they get 1k views.`}
                      </p>
                    </div>
                  )}

                  {reviewCampaignTypes.includes(form.type) && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Campaign Requirements</label>
                      <div className="space-y-4">
                        {form.requirements.map((requirement, index) => (
                          <div key={index} className="flex space-x-2">
                            <div className="flex-1">
                              <FormTextArea
                                value={requirement}
                                onChange={(e) => handleRequirementChange(index, e.target.value)}
                                placeholder={`Requirement ${index + 1}\nAdd detailed description of what is required...`}
                                rows={3}
                              />
                            </div>
                            {form.requirements.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeRequirement(index)}
                                className="p-2 h-fit text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addRequirement}
                          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Requirement</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {['ugc_video', 'freestyle_music'].includes(form.type) && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Reference Video URL</label>
                      <div className="flex items-center space-x-2">
                        <Link className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={form.mediaUrl}
                          onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                          className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter reference video URL"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {['app_review', 'movie_review', 'website_review'].includes(form.type) && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {form.type === 'app_review' ? 'App URL' :
                           form.type === 'movie_review' ? 'Movie/Trailer URL' :
                           'Website URL'}
                        </label>
                        <div className="flex items-center space-x-2">
                          <Link className="w-5 h-5 text-gray-400" />
                          <input
                            type="url"
                            value={form.mediaUrl}
                            onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                            className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter ${
                              form.type === 'app_review' ? 'app store' :
                              form.type === 'movie_review' ? 'movie/trailer' :
                              'website'
                            } URL`}
                            required
                          />
                        </div>
                      </div>

                      {form.type === 'app_review' && (
                        <div>
                          <label className="block text-sm font-medium mb-2">App Platform</label>
                          <select
                            value={form.platform || ''}
                            onChange={(e) => setForm({ ...form, platform: e.target.value })}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select platform</option>
                            <option value="ios">iOS App Store</option>
                            <option value="android">Google Play Store</option>
                            <option value="both">Both Platforms</option>
                          </select>
                        </div>
                      )}
                    </>
                  )}

                  {form.type === 'watch_video' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Video URL</label>
                      <div className="flex items-center space-x-2">
                        <Link className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={form.videoUrl || ''}
                          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                          className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter video URL"
                          required
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Watch Duration</label>
                          <input
                            type="number"
                            value={form.watchDuration?.value || 1}
                            onChange={(e) => setForm({
                              ...form,
                              watchDuration: {
                                ...form.watchDuration,
                                value: Math.max(1, Math.min(parseInt(e.target.value) || 1, form.watchDuration?.unit === 'hours' ? 10 : 60))
                              }
                            })}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min={1}
                            max={form.watchDuration?.unit === 'hours' ? 10 : 60}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Duration Unit</label>
                          <select
                            value={form.watchDuration?.unit || 'minutes'}
                            onChange={(e) => setForm({
                              ...form,
                              watchDuration: {
                                value: form.watchDuration?.value || 1,
                                unit: e.target.value as 'minutes' | 'hours'
                              }
                            })}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        {form.watchDuration?.unit === 'minutes' ? 
                          'Select between 1-60 minutes' : 
                          'Select between 1-10 hours'
                        }
                      </p>
                    </div>
                  )}

                  {form.type === 'h5_game' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Game URL</label>
                      <div className="flex items-center space-x-2">
                        <Link className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={form.gameUrl || ''}
                          onChange={(e) => setForm({ ...form, gameUrl: e.target.value })}
                          className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter game URL"
                          required
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Watch Duration</label>
                          <input
                            type="number"
                            value={form.watchDuration?.value || 1}
                            onChange={(e) => setForm({
                              ...form,
                              watchDuration: {
                                ...form.watchDuration,
                                value: Math.max(1, Math.min(parseInt(e.target.value) || 1, form.watchDuration?.unit === 'hours' ? 10 : 60))
                              }
                            })}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min={1}
                            max={form.watchDuration?.unit === 'hours' ? 10 : 60}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Duration Unit</label>
                          <select
                            value={form.watchDuration?.unit || 'minutes'}
                            onChange={(e) => setForm({
                              ...form,
                              watchDuration: {
                                value: form.watchDuration?.value || 1,
                                unit: e.target.value as 'minutes' | 'hours'
                              }
                            })}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        {form.watchDuration?.unit === 'minutes' ? 
                          'Select between 1-60 minutes' : 
                          'Select between 1-10 hours'
                        }
                      </p>
                    </div>
                  )}

                  {form.type === 'website' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Website URL</label>
                      <div className="flex items-center space-x-2">
                        <Link className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={form.websiteUrl || ''}
                          onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                          className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter website URL"
                          required
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Watch Duration</label>
                          <input
                            type="number"
                            value={form.watchDuration?.value || 1}
                            onChange={(e) => setForm({
                              ...form,
                              watchDuration: {
                                ...form.watchDuration,
                                value: Math.max(1, Math.min(parseInt(e.target.value) || 1, form.watchDuration?.unit === 'hours' ? 10 : 60))
                              }
                            })}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min={1}
                            max={form.watchDuration?.unit === 'hours' ? 10 : 60}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Duration Unit</label>
                          <select
                            value={form.watchDuration?.unit || 'minutes'}
                            onChange={(e) => setForm({
                              ...form,
                              watchDuration: {
                                value: form.watchDuration?.value || 1,
                                unit: e.target.value as 'minutes' | 'hours'
                              }
                            })}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        {form.watchDuration?.unit === 'minutes' ? 
                          'Select between 1-60 minutes' : 
                          'Select between 1-10 hours'
                        }
                      </p>
                    </div>
                  )}

                  {form.type === 'app_install' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">App URL</label>
                      <div className="flex items-center space-x-2">
                        <Link className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={form.appUrl || ''}
                          onChange={(e) => setForm({ ...form, appUrl: e.target.value })}
                          className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter app URL"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {form.type === 'social_media' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormSelect
                          label="Social Media Platform"
                          value={form.socialPlatform || ''}
                          onChange={(e) => setForm({ ...form, socialPlatform: e.target.value })}
                          options={socialPlatforms.map(platform => ({
                            value: platform.value,
                            label: platform.label
                          }))}
                          required
                        />

                        <FormSelect
                          label="Action Type"
                          value={form.socialAction || ''}
                          onChange={(e) => setForm({ ...form, socialAction: e.target.value })}
                          options={socialActions.map(action => ({
                            value: action.value,
                            label: action.label
                          }))}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Social Media URL</label>
                        <div className="flex items-center space-x-2">
                          <Link className="w-5 h-5 text-gray-400" />
                          <input
                            type="url"
                            value={form.socialUrl || ''}
                            onChange={(e) => setForm({ ...form, socialUrl: e.target.value })}
                            className="flex-1 bg-gray-700 rounded-lg border border-gray-600  p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter social media profile/post URL"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Target Countries</label>
                    <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-700">
                      <RegionSelect
                        selectedCountries={form.targetCountries}
                        onChange={(countries) => setForm({ ...form, targetCountries: countries })}
                      />
                    </div>
                  </div>

                  {!reviewCampaignTypes.includes(form.type) && (
                    <div className="bg-blue-500/10 rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-2">Campaign Cost Calculator</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Target Views/Actions:</span>
                          <span>{parseInt(form.targetViews).toLocaleString() || 0}</span>
                        </div>
                        
                        <div className="space-y-2">
                          {form.targetCountries.length > 0 && regions.map(region => {
                            const countriesInRegion = region.countries.filter(country => 
                              form.targetCountries.includes(country.code)
                            ).length;
                            
                            if (countriesInRegion === 0) return null;

                            const regionViews = Math.floor(parseInt(form.targetViews || '0') * 
                              (countriesInRegion / form.targetCountries.length));
                            const regionCost = (regionViews / cpaRates[region.id as keyof typeof cpaRates].per) * 
                              cpaRates[region.id as keyof typeof cpaRates].rate;

                            return (
                              <div key={region.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">{region.name} ({countriesInRegion} countries):</span>
                                <span>${regionCost.toFixed(2)}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                          <span className="font-semibold">Total Estimated Cost:</span>
                          <span className="text-2xl font-bold text-green-500">${estimatedCost.toFixed(2)}</span>
                        </div>

                        <p className="text-sm text-gray-400">
                          Cost is calculated based on regional CPA rates:
                        </p>
                        <ul className="text-sm space-y-1">
                          <li>North America: ${cpaRates.northAmerica.rate} per {cpaRates.northAmerica.per.toLocaleString()} views</li>
                          <li>South America: ${cpaRates.southAmerica.rate} per {cpaRates.southAmerica.per.toLocaleString()} views</li>
                          <li>Europe: ${cpaRates.europe.rate} per {cpaRates.europe.per.toLocaleString()} views</li>
                          <li>Asia: ${cpaRates.asia.rate} per {cpaRates.asia.per.toLocaleString()} views</li>
                          <li>Africa: ${cpaRates.africa.rate} per {cpaRates.africa.per.toLocaleString()} views</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6 z-10">
                <button
                  type="submit"
                  onClick={handleCreateCampaign}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  disabled={!form.type || !form.name ||form.targetCountries.length === 0}
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};

export default Advertise;