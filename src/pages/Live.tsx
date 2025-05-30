import React, { useState } from 'react';
import { Users, Heart, Gift, X } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';
import CountdownTimer from '../components/CountdownTimer';

const Live: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  const streams = [
    { 
      id: 1, 
      title: 'Gaming Stream', 
      viewers: '1.2K', 
      streamer: 'game_master', 
      thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/stream/gaming'
    },
    { 
      id: 2, 
      title: 'Cooking Show', 
      viewers: '890', 
      streamer: 'chef_pro', 
      thumbnail: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/stream/cooking'
    },
    { 
      id: 3, 
      title: 'Music Session', 
      viewers: '2.1K', 
      streamer: 'music_live', 
      thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/stream/music'
    },
  ];

  const handleTimerComplete = () => {
    setBalance(prev => prev + 1);
    setIsPlaying(false);
    setSelectedStream(null);
  };

  const handleStreamClick = (streamId: number) => {
    setSelectedStream(String(streamId));
    setIsPlaying(true);
  };

  const selectedStreamData = selectedStream ? streams.find(stream => String(stream.id) === selectedStream) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {selectedStream ? (
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

            {/* Stream content */}
            <div className="absolute top-[47px] inset-x-0 bottom-8 bg-black">
              <div className="relative h-full">
                <button 
                  onClick={() => setSelectedStream(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <iframe
                  src={selectedStreamData?.url}
                  className="w-full h-full border-none"
                  title={selectedStreamData?.title}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white">{selectedStreamData?.streamer}</h3>
                      <p className="text-sm text-gray-300">{selectedStreamData?.title}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-red-500" />
                      <span className="text-white">{selectedStreamData?.viewers}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <EarningBanner message="Watch any live stream for 5 minutes to earn $1.00!" />
            <h1 className="text-3xl font-bold mb-8">LIVE</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {streams.map(stream => (
                <div 
                  key={stream.id} 
                  className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
                  onClick={() => handleStreamClick(stream.id)}
                >
                  <div className="relative">
                    <img src={stream.thumbnail} alt={stream.title} className="w-full aspect-video object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      LIVE
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {stream.viewers}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{stream.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">@{stream.streamer}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                          <Gift className="w-5 h-5" />
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

export default Live;