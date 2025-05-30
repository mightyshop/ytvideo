import React, { useState } from 'react';
import { Download, X, ImageIcon, CheckCircle } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';

interface AppProof {
  appId: number;
  screenshot: string;
}

const Apps: React.FC = () => {
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [proofUrl, setProofUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const apps = [
    { id: 1, name: 'Photo Editor Pro', category: 'Photography', downloads: '1.2M', icon: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 2, name: 'Fitness Tracker', category: 'Health', downloads: '890K', icon: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 3, name: 'Music Player', category: 'Entertainment', downloads: '2.1M', icon: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
  ];

  const handleInstall = (appId: number) => {
    setSelectedApp(appId);
    setShowProofModal(true);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !proofUrl) return;

    const proof: AppProof = {
      appId: selectedApp,
      screenshot: proofUrl
    };

    console.log('Submitted proof:', proof);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowProofModal(false);
      setSelectedApp(null);
      setProofUrl('');
    }, 2000);
  };

  const ProofModal = () => {
    const app = apps.find(a => a.id === selectedApp);
    if (!app) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Submit Installation Proof</h3>
              <button 
                onClick={() => setShowProofModal(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl" />
              <div>
                <h4 className="font-semibold">{app.name}</h4>
                <p className="text-sm text-gray-400">{app.category}</p>
              </div>
            </div>

            {showSuccess ? (
              <div className="flex flex-col items-center space-y-4 py-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-center text-green-500 font-medium">
                  Proof submitted successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Screenshot URL of Installation/Usage
                  </label>
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter screenshot URL"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Please provide a screenshot showing the app installed on your device
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Submit Proof
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <EarningBanner message="Install and try any app for 2 minutes to earn $1.00!" />
        <h1 className="text-3xl font-bold mb-8">Featured Apps</h1>
        
        <div className="grid gap-6">
          {apps.map(app => (
            <div key={app.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{app.name}</h3>
                  <p className="text-gray-400">{app.category}</p>
                  <p className="text-sm text-gray-500">{app.downloads} downloads</p>
                </div>
                <button 
                  onClick={() => handleInstall(app.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showProofModal && <ProofModal />}
    </div>
  );
};

export default Apps;