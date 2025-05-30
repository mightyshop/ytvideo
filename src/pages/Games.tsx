import React, { useState } from 'react';
import { Gamepad, X } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';
import CountdownTimer from '../components/CountdownTimer';

const Games: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    { 
      id: 1, 
      title: 'Bubble Tower 3D', 
      players: '2.5M', 
      thumbnail: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://games.cdn.famobi.com/html5games/b/bubble-tower-3d/v160/?fg_domain=play.famobi.com&fg_aid=A1000-111&fg_uid=1385d98a-b5f2-4339-bce7-b99a8dd2e8b0&fg_pid=e37ab3ce-88cd-4438-9b9c-a37df5d33736&fg_beat=143&original_ref=https%3A%2F%2Fplay.famobi.com%2Fbubble-tower-3d'
    },
    { 
      id: 2, 
      title: 'Puzzle Master', 
      players: '890K', 
      thumbnail: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/puzzle-game'
    },
    { 
      id: 3, 
      title: 'Racing Pro', 
      players: '2.1M', 
      thumbnail: 'https://images.pexels.com/photos/12706279/pexels-photo-12706279.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://example.com/racing-game'
    },
  ];

  const handleTimerComplete = () => {
    setBalance(prev => prev + 1);
    setIsPlaying(false);
    setSelectedGame(null);
  };

  const handleGameClick = (gameId: number) => {
    setSelectedGame(String(gameId));
    setIsPlaying(true);
  };

  const selectedGameData = selectedGame ? games.find(game => String(game.id) === selectedGame) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {selectedGame ? (
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

            {/* Game content */}
            <div className="absolute top-[47px] inset-x-0 bottom-8 bg-white">
              <div className="relative h-full">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <iframe
                  src={selectedGameData?.url}
                  className="w-full h-full border-none"
                  title={selectedGameData?.title}
                  allow="fullscreen"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <EarningBanner message="Play any game for 5 minutes to earn $1.00!" />
            <h1 className="text-3xl font-bold mb-8">H5 Games</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <div 
                  key={game.id} 
                  className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
                >
                  <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{game.players} players</span>
                      <button 
                        className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                        onClick={() => handleGameClick(game.id)}
                      >
                        Play Now
                      </button>
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

export default Games;