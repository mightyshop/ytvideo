import React, { useState } from 'react';
import { DollarSign, Users } from 'lucide-react';

interface Rate {
  action: string;
  userRate: number;
  advertiserRate: number;
}

interface RegionRates {
  [key: string]: {
    multiplier: number;
    rates: Rate[];
  };
}

const Rates: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('northAmerica');

  const baseRates: Rate[] = [
    { action: 'Video Views (per 1,000)', userRate: 10, advertiserRate: 15 },
    { action: 'Likes (per 1,000)', userRate: 5, advertiserRate: 7.50 },
    { action: 'Comments (per 1,000)', userRate: 5, advertiserRate: 7.50 },
    { action: 'App Installs (per 1,000)', userRate: 10, advertiserRate: 15 },
    { action: 'Live Stream Views (per 1,000)', userRate: 50, advertiserRate: 75 },
    { action: 'Game Plays (per 1,000)', userRate: 100, advertiserRate: 150 }
  ];

  const regionRates: RegionRates = {
    northAmerica: {
      multiplier: 1,
      rates: baseRates
    },
    europe: {
      multiplier: 0.9,
      rates: baseRates.map(rate => ({
        ...rate,
        userRate: rate.userRate * 0.9,
        advertiserRate: rate.advertiserRate * 0.9
      }))
    },
    asia: {
      multiplier: 0.7,
      rates: baseRates.map(rate => ({
        ...rate,
        userRate: rate.userRate * 0.7,
        advertiserRate: rate.advertiserRate * 0.7
      }))
    },
    southAmerica: {
      multiplier: 0.6,
      rates: baseRates.map(rate => ({
        ...rate,
        userRate: rate.userRate * 0.6,
        advertiserRate: rate.advertiserRate * 0.6
      }))
    },
    africa: {
      multiplier: 0.5,
      rates: baseRates.map(rate => ({
        ...rate,
        userRate: rate.userRate * 0.5,
        advertiserRate: rate.advertiserRate * 0.5
      }))
    }
  };

  const regions = [
    { id: 'northAmerica', name: 'North America' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'southAmerica', name: 'South America' },
    { id: 'africa', name: 'Africa' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-green-500 rounded-full">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Earning Rates</h1>
            <p className="text-gray-400 mt-1">View potential earnings by region</p>
          </div>
        </div>

        {/* Region Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedRegion === region.id
                  ? 'border-green-500 bg-green-500/10 text-white'
                  : 'border-gray-700 hover:border-gray-600 text-gray-400'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Rates Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-700">
            <div className="text-gray-300 font-medium">Action</div>
            <div className="text-gray-300 font-medium">User Rate</div>
            <div className="text-gray-300 font-medium">Advertiser Rate</div>
          </div>
          
          <div className="divide-y divide-gray-700">
            {regionRates[selectedRegion].rates.map((rate, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-6">
                <div className="text-white">{rate.action}</div>
                <div className="text-green-500 font-semibold">
                  ${rate.userRate.toFixed(2)}
                </div>
                <div className="text-blue-500 font-semibold">
                  ${rate.advertiserRate.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold">For Users</h2>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li>• Complete tasks to earn rewards</li>
              <li>• Higher engagement = Higher earnings</li>
              <li>• Instant payments upon completion</li>
              <li>• Bonus rewards for consistent activity</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">For Advertisers</h2>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li>• Target specific regions</li>
              <li>• Pay only for verified engagement</li>
              <li>• Real-time campaign analytics</li>
              <li>• Flexible budget control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rates;