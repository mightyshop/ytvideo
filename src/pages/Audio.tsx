import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, X } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';
import CountdownTimer from '../components/CountdownTimer';

const Audio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const playlists = [
    { 
      id: 1, 
      title: 'Top Hits', 
      tracks: 25, 
      duration: '1h 45m', 
      cover: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/playlist/top-hits'
    },
    { 
      id: 2, 
      title: 'Chill Vibes', 
      tracks: 18, 
      duration: '1h 20m', 
      cover: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/playlist/chill-vibes'
    },
    { 
      id: 3, 
      title: 'Workout Mix', 
      tracks: 32, 
      duration: '2h 10m', 
      cover: 'https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/playlist/workout-mix'
    },
  ];

  const handleTimerComplete = () => {
    setBalance(prev => prev + 1);
    setIsPlaying(false);
    setSelectedPlaylist(null);
  };

  const handlePlaylistClick = (playlistId: number) => {
    setSelectedPlaylist(String(playlistId));
    setIsPlaying(true);
  };

  const selectedPlaylistData = selectedPlaylist ? playlists.find(p => String(p.id) === selectedPlaylist) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {selectedPlaylist ? (
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

            {/* Audio content */}
            <div className="absolute top-[47px] inset-x-0 bottom-8 bg-gradient-to-b from-gray-900 to-black">
              <div className="relative h-full p-6">
                <button 
                  onClick={() => setSelectedPlaylist(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="flex flex-col items-center justify-center h-full">
                  <img 
                    src={selectedPlaylistData?.cover}
                    alt={selectedPlaylistData?.title}
                    className="w-64 h-64 rounded-lg shadow-2xl mb-8"
                  />
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedPlaylistData?.title}</h2>
                  <p className="text-gray-400 mb-8">{selectedPlaylistData?.tracks} tracks • {selectedPlaylistData?.duration}</p>

                  <div className="flex items-center space-x-6">
                    <button className="p-2 text-white hover:text-gray-300 transition-colors">
                      <SkipBack className="w-8 h-8" />
                    </button>
                    <button className="p-4 bg-green-500 rounded-full hover:bg-green-600 transition-colors">
                      <Pause className="w-8 h-8 text-white" />
                    </button>
                    <button className="p-2 text-white hover:text-gray-300 transition-colors">
                      <SkipForward className="w-8 h-8" />
                    </button>
                  </div>

                  <div className="w-full max-w-md mt-8">
                    <div className="w-full bg-white/20 rounded-full h-1">
                      <div className="bg-green-500 w-1/3 h-full rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                      <span>1:23</span>
                      <span>3:45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <EarningBanner message="Listen to any playlist for 3 minutes to earn $1.00!" />
            <h1 className="text-3xl font-bold mb-8">Audio</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map(playlist => (
                <div 
                  key={playlist.id} 
                  className="bg-gray-800 rounded-lg overflow-hidden group"
                >
                  <div className="relative">
                    <img src={playlist.cover} alt={playlist.title} className="w-full aspect-square object-cover" />
                    <button 
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handlePlaylistClick(playlist.id)}
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full">
                        <Play className="w-6 h-6" />
                      </div>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{playlist.title}</h3>
                    <p className="text-sm text-gray-400">{playlist.tracks} tracks • {playlist.duration}</p>
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

export default Audio;