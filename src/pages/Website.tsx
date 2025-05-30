import React, { useState } from 'react';
import { Globe, ExternalLink, X } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';
import CountdownTimer from '../components/CountdownTimer';

const Website: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  const websites = [
    { 
      id: 1, 
      title: 'Samy Express', 
      url: 'https://samyexpress.com/', 
      description: 'Your one-stop shop for all your needs', 
      visits: '1.2M',
      thumbnail: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    { 
      id: 2, 
      title: 'Travel Guide', 
      url: 'https://example.com/travel-guide', 
      description: 'Explore amazing destinations', 
      visits: '890K',
      thumbnail: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    { 
      id: 3, 
      title: 'Food Recipe', 
      url: 'https://example.com/food-recipe', 
      description: 'Delicious recipes and cooking tips', 
      visits: '2.1M',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
  ];

  const handleTimerComplete = () => {
    setBalance(prev => prev + 1);
    setIsPlaying(false);
    setSelectedSite(null);
  };

  const handleSiteClick = (siteId: number) => {
    setSelectedSite(String(siteId));
    setIsPlaying(true);
  };

  const selectedSiteData = selectedSite ? websites.find(site => String(site.id) === selectedSite) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {selectedSite ? (
        <div className="h-screen flex items-center justify-center bg-black relative">
          {/* Balance display */}
          <div className="fixed top-8 right-8 bg-black/90 rounded-xl backdrop-blur-md px-4 py-2 z-50">
            <span className="text-white font-bold">Balance: ${balance.toFixed(2)}</span>
          </div>

          {/* Timer */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center z-50 lg:right-12 xl:right-16 2xl:right-24">
            <div className="w-20 h-20 bg-black/90 rounded-full backdrop-blur-md flex items-center justify-center">
              <CountdownTimer 
                onComplete={handleTimerComplete}
                isPlaying={isPlaying}
              />
            </div>
            <p className="text-white text-xs mt-2 max-w-[120px] text-center opacity-80">
              Allow timer to finish to earn $1.00
            </p>
          </div>

          <div className="relative w-[390px] h-[844px] bg-white rounded-[55px] shadow-2xl overflow-hidden">
            {/* Device frame */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-[47px] bg-black">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[157px] h-[34px] bg-black rounded-b-[24px]"></div>
              </div>
              
              {/* Status bar */}
              <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-8 text-black z-50">
                <span className="text-sm font-medium">9:03 PM</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm">5G</span>
                  <div className="w-6 h-3 flex items-center">
                    <div className="w-1 h-1.5 bg-black rounded-sm"></div>
                    <div className="w-1 h-2 bg-black rounded-sm mx-0.5"></div>
                    <div className="w-1 h-2.5 bg-black rounded-sm"></div>
                    <div className="w-1 h-3 bg-black rounded-sm ml-0.5"></div>
                  </div>
                </div>
              </div>
              
              {/* Home indicator */}
              <div className="absolute bottom-0 inset-x-0 h-8 flex items-center justify-center">
                <div className="w-32 h-1 bg-black rounded-full"></div>
              </div>
            </div>

            {/* Website content */}
            <div className="absolute top-[47px] inset-x-0 bottom-8 bg-white">
              <div className="relative h-full">
                <div className="absolute top-0 left-0 right-0 bg-gray-100 border-b border-gray-200 flex items-center px-4 py-2">
                  <button 
                    onClick={() => setSelectedSite(null)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-full border border-gray-300 py-1 px-4 text-sm text-gray-600">
                      {selectedSiteData?.url}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <ExternalLink className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <iframe
                  src={selectedSiteData?.url}
                  className="w-full h-[calc(100%-44px)] border-none mt-[44px]"
                  title={selectedSiteData?.title}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <EarningBanner message="Visit any website for 3 minutes to earn $1.00!" />
            <h1 className="text-3xl font-bold mb-8">Featured Websites</h1>
            
            <div className="grid gap-6">
              {websites.map(site => (
                <div 
                  key={site.id} 
                  className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                  onClick={() => handleSiteClick(site.id)}
                >
                  <div className="flex items-center">
                    <div className="w-48 h-32">
                      <img src={site.thumbnail} alt={site.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-semibold mb-2">{site.title}</h3>
                      <p className="text-gray-400 mb-4">{site.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{site.visits} visits</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors flex items-center space-x-2">
                          <span>Visit</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Website;