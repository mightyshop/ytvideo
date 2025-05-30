import React from 'react';
import { Phone, Globe, Languages } from 'lucide-react';

const TopBar: React.FC = () => {
  const [showCurrency, setShowCurrency] = React.useState(false);
  const [showLanguage, setShowLanguage] = React.useState(false);

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' }
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' }
  ];

  return (
    <div className="bg-gray-800 text-white py-2 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Hotline: 01963953998</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowCurrency(!showCurrency)}
              className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>USD</span>
            </button>

            {showCurrency && (
              <div className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 w-32">
                {currencies.map(currency => (
                  <button
                    key={currency.code}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
                    onClick={() => setShowCurrency(false)}
                  >
                    {currency.code} ({currency.symbol})
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLanguage(!showLanguage)}
              className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span>English</span>
            </button>

            {showLanguage && (
              <div className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 w-32">
                {languages.map(language => (
                  <button
                    key={language.code}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
                    onClick={() => setShowLanguage(false)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;