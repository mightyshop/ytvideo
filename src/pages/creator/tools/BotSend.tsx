import React, { useState } from 'react';
import { Send, Settings, Clock, Users, Plus, X, Save, Info, ExternalLink, ShoppingBag, DollarSign } from 'lucide-react';

interface BotConfig {
  chatUrl: string;
  postsPerDay: number;
  schedule: {
    hour: number;
    minute: number;
  }[];
}

const BotSend: React.FC = () => {
  const [botConfig, setBotConfig] = useState<BotConfig>({
    chatUrl: '',
    postsPerDay: 3,
    schedule: [
      { hour: 9, minute: 0 },
      { hour: 14, minute: 0 },
      { hour: 19, minute: 0 }
    ]
  });

  const [isConnected, setIsConnected] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(null);

  const handleConnect = () => {
    if (!botConfig.chatUrl) return;
    setIsConnected(true);
  };

  const handleAddTime = () => {
    if (botConfig.schedule.length >= botConfig.postsPerDay) return;
    setBotConfig(prev => ({
      ...prev,
      schedule: [...prev.schedule, { hour: 12, minute: 0 }]
    }));
  };

  const handleRemoveTime = (index: number) => {
    setBotConfig(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateTime = (index: number, hour: number, minute: number) => {
    setBotConfig(prev => ({
      ...prev,
      schedule: prev.schedule.map((time, i) => 
        i === index ? { hour, minute } : time
      )
    }));
  };

  const handleSaveConfig = () => {
    console.log('Saving bot configuration:', botConfig);
    // Here you would typically save the configuration to your backend
  };

  const TimeScheduleModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Schedule Time</h3>
            <button 
              onClick={() => setShowScheduleModal(false)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {selectedTimeIndex !== null && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hour (24-hour format)</label>
                <input
                  type="number"
                  value={botConfig.schedule[selectedTimeIndex].hour}
                  onChange={(e) => handleUpdateTime(
                    selectedTimeIndex,
                    Math.min(23, Math.max(0, parseInt(e.target.value) || 0)),
                    botConfig.schedule[selectedTimeIndex].minute
                  )}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="23"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Minute</label>
                <input
                  type="number"
                  value={botConfig.schedule[selectedTimeIndex].minute}
                  onChange={(e) => handleUpdateTime(
                    selectedTimeIndex,
                    botConfig.schedule[selectedTimeIndex].hour,
                    Math.min(59, Math.max(0, parseInt(e.target.value) || 0))
                  )}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="59"
                />
              </div>

              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Save Time
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Telegram Bot</h1>
        <p className="text-gray-400">Automate product promotions and task suggestions in your Telegram channel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Bot Benefits */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <DollarSign className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Automated Earnings</h2>
            </div>
            <div className="space-y-4 text-white/90">
              <p>Connect your Telegram channel or group to automatically:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Share affiliate products with your custom referral links</li>
                <li>Post task suggestions for your followers to earn rewards</li>
                <li>Maintain consistent engagement with scheduled posts</li>
                <li>Generate passive income through automated promotions</li>
              </ul>
            </div>
          </div>

          {/* Bot Setup Instructions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Info className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Setup Instructions</h2>
            </div>

            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li>Add our bot <span className="text-blue-400">@YourProductBot</span> to your channel or group</li>
                <li>Make the bot an administrator with these permissions:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400">
                    <li>Send Messages</li>
                    <li>Edit Messages</li>
                    <li>Post Messages</li>
                  </ul>
                </li>
                <li>Enter your channel or group URL below to start automated posting</li>
              </ol>
            </div>
          </div>

          {/* Channel/Group Configuration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Channel Configuration</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Channel/Group URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={botConfig.chatUrl}
                    onChange={(e) => setBotConfig(prev => ({ ...prev, chatUrl: e.target.value }))}
                    className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://t.me/yourchannel"
                    disabled={isConnected}
                  />
                  <a
                    href={botConfig.chatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {!isConnected && (
                <button
                  onClick={handleConnect}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  disabled={!botConfig.chatUrl}
                >
                  Connect Channel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Schedule Configuration */}
        <div className="space-y-8">
          {isConnected && (
            <>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-6 h-6 text-green-400" />
                  <h2 className="text-xl font-semibold">Posting Schedule</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Posts per Day</label>
                    <input
                      type="number"
                      value={botConfig.postsPerDay}
                      onChange={(e) => setBotConfig(prev => ({ 
                        ...prev, 
                        postsPerDay: Math.max(1, parseInt(e.target.value) || 1)
                      }))}
                      className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      Recommended: 3-5 posts per day for optimal engagement
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Posting Times</label>
                      {botConfig.schedule.length < botConfig.postsPerDay && (
                        <button
                          onClick={handleAddTime}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Add Time
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {botConfig.schedule.map((time, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-700 rounded-lg p-3"
                        >
                          <button
                            onClick={() => {
                              setSelectedTimeIndex(index);
                              setShowScheduleModal(true);
                            }}
                            className="flex-1 text-left"
                          >
                            {String(time.hour).padStart(2, '0')}:{String(time.minute).padStart(2, '0')}
                          </button>
                          {botConfig.schedule.length > 1 && (
                            <button
                              onClick={() => handleRemoveTime(index)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveConfig}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Configuration</span>
              </button>
            </>
          )}
        </div>
      </div>

      {showScheduleModal && <TimeScheduleModal />}
    </div>
  );
};

export default BotSend;