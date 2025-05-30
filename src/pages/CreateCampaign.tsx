import React, { useState } from 'react';
import { Campaign } from '../types';

const campaignTypes = [
  { id: 'watch_video', label: 'Watch Video', description: 'Get users to watch your video content' },
  { id: 'social_media', label: 'Social Media', description: 'Promote your social media presence' },
  { id: 'h5_game', label: 'H5 Game', description: 'Promote your HTML5 game' },
  { id: 'website', label: 'Website', description: 'Drive traffic to your website' },
  { id: 'app_install', label: 'App Install', description: 'Promote your mobile app' },
  { id: 'social_engagement', label: 'Social Engagement', description: 'Increase social engagement' }
];

const countries = [
  { code: 'ALL', name: 'All Countries' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  // Add more countries as needed
];

const CreateCampaign: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [campaignName, setCampaignName] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle campaign creation
    console.log({
      type: selectedType,
      name: campaignName,
      budget: parseFloat(budget),
      targetCountries: selectedCountries
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Campaign</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Campaign Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaignTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <h3 className="font-semibold mb-2">{type.label}</h3>
                <p className="text-sm text-gray-400">{type.description}</p>
              </div>
            ))}
          </div>

          {/* Campaign Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Name</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full bg-gray-800 rounded-lg border border-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter campaign name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Budget (USD)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-gray-800 rounded-lg border border-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter budget amount"
                min="1"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Countries</label>
              <select
                multiple
                value={selectedCountries}
                onChange={(e) => setSelectedCountries(Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full bg-gray-800 rounded-lg border border-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                size={5}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple countries</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;