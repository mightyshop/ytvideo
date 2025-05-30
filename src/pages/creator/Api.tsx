import React, { useState } from 'react';
import { Copy, CheckCircle, Code, Globe, Key, Plus, Star, FileText, Package, CheckCircle as Check, Download } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

const Api: React.FC = () => {
  const [copiedField, setCopiedField] = useState<'domain' | 'key' | null>(null);
  const apiDomain = 'https://example.con/creator/api';
  const apiKey = 'sk_test_1234567890abcdefghijklmnopqrstuvwxyz';

  const copyToClipboard = (text: string, field: 'domain' | 'key') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddToApp = (id: number, type: 'product' | 'category') => {
    console.log(`Adding ${type} ${id} to app`);
  };

  const handleAddToWebsite = (id: number, type: 'product' | 'category') => {
    console.log(`Adding ${type} ${id} to website`);
  };

  const handleDownloadSource = (type: 'app' | 'website') => {
    console.log(`Downloading ${type} source code`);
    // Implement download logic here
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
            <p className="text-gray-400">Integrate with our platform using our REST API</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleDownloadSource('app')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download App Source</span>
            </button>
            <button
              onClick={() => handleDownloadSource('website')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Web Source</span>
            </button>
          </div>
        </div>
      </div>

      {/* API Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">API Domain</h2>
          </div>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-gray-700 rounded-lg p-3 font-mono text-sm">
              {apiDomain}
            </code>
            <button
              onClick={() => copyToClipboard(apiDomain, 'domain')}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedField === 'domain' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Key className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">API Key</h2>
          </div>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-gray-700 rounded-lg p-3 font-mono text-sm">
              {apiKey}
            </code>
            <button
              onClick={() => copyToClipboard(apiKey, 'key')}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedField === 'key' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <div key={category.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="font-medium text-center">{category.name}</h3>
                <div className="flex space-x-2 w-full">
                  <button
                    onClick={() => handleAddToApp(Number(category.id), 'category')}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    Add to App
                  </button>
                  <button
                    onClick={() => handleAddToWebsite(Number(category.id), 'category')}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    Add to Web
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Affiliate Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  ${product.price}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center flex-1 min-w-0">
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="ml-2 flex items-center space-x-1 truncate">
                      <span className="text-sm text-gray-400 truncate">{product.seller.name}</span>
                      {product.seller.rating >= 4.8 && (
                        <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.type === 'digital' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {product.type === 'digital' ? 'Digital' : 'Physical'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToApp(product.id, 'product')}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to App</span>
                  </button>
                  <button
                    onClick={() => handleAddToWebsite(product.id, 'product')}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Web</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Api;