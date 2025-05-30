import React from 'react';
import { DollarSign } from 'lucide-react';

const EarningBanner: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 mb-8">
      <div className="flex items-center space-x-3">
        <div className="bg-white/20 rounded-full p-2">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <p className="text-white font-medium">{message}</p>
      </div>
    </div>
  );
};

export default EarningBanner;