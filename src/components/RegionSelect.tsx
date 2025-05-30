import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { regions } from '../data/regions';

interface RegionSelectProps {
  selectedCountries: string[];
  onChange: (countries: string[]) => void;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ selectedCountries, onChange }) => {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    setOpenRegion(openRegion === regionId ? null : regionId);
  };

  const handleCountryToggle = (countryCode: string) => {
    if (selectedCountries.includes(countryCode)) {
      onChange(selectedCountries.filter(code => code !== countryCode));
    } else {
      onChange([...selectedCountries, countryCode]);
    }
  };

  const handleSelectAllInRegion = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (!region) return;

    const regionCountryCodes = region.countries.map(country => country.code);
    const allSelected = regionCountryCodes.every(code => selectedCountries.includes(code));

    if (allSelected) {
      onChange(selectedCountries.filter(code => !regionCountryCodes.includes(code)));
    } else {
      const newSelected = [...new Set([...selectedCountries, ...regionCountryCodes])];
      onChange(newSelected);
    }
  };

  return (
    <div className="space-y-4">
      {regions.map(region => (
        <div key={region.id} className="bg-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => handleRegionClick(region.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{region.name}</span>
              <span className="text-sm text-gray-400">
                ({region.countries.length} countries)
              </span>
            </div>
            {openRegion === region.id ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {openRegion === region.id && (
            <div className="p-4 border-t border-gray-600">
              <button
                onClick={() => handleSelectAllInRegion(region.id)}
                className="mb-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                {region.countries.every(country => 
                  selectedCountries.includes(country.code)
                ) ? 'Deselect All' : 'Select All'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                {region.countries.map(country => (
                  <label
                    key={country.code}
                    className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country.code)}
                      onChange={() => handleCountryToggle(country.code)}
                      className="rounded border-gray-500 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-700"
                    />
                    <span className="text-sm">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RegionSelect;