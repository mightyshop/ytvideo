import React, { useState } from 'react';
import { Share2, Copy, CheckCircle, ExternalLink, Star, FileText, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  commission: number;
  category: string;
  type: 'digital' | 'physical';
  // Digital product specific fields
  downloadUrl?: string;
  fileSize?: string;
  fileFormat?: string;
  // Physical product specific fields
  weight?: string;
  dimensions?: string;
  shippingTime?: string;
  stock?: number;
}

const Affiliate: React.FC = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'all' | 'digital' | 'physical'>('all');

  const getAffiliateLink = (productId: number) => {
    return `https://example.com/product/${productId}?ref=affiliate`;
  };

  const copyLink = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigator.clipboard.writeText(getAffiliateLink(productId));
    setCopiedId(productId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleViewDetails = (productId: number) => {
    navigate(`/shop/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-purple-500 rounded-full">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Affiliate Program</h1>
            <p className="text-gray-400 mt-1">Share products and earn commissions</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Share2 className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-green-500">+15.3% this week</span>
            </div>
            <p className="text-gray-400">Total Commission</p>
            <p className="text-2xl font-bold">$1,389.56</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-blue-500">+23 this week</span>
            </div>
            <p className="text-gray-400">Products Sold</p>
            <p className="text-2xl font-bold">156</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Star className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-red-500">-2.1% decrease</span>
            </div>
            <p className="text-gray-400">Click-through Rate</p>
            <p className="text-2xl font-bold">4.8%</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <button
              onClick={() => setSelectedCategory('')}
              className={`p-4 rounded-lg transition-colors flex flex-col items-center space-y-2 ${
                selectedCategory === ''
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Package className="w-6 h-6" />
              <span>All Categories</span>
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg transition-colors flex flex-col items-center space-y-2 ${
                  category.id === selectedCategory
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Type Filter */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setSelectedType('all')}
            className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
              selectedType === 'all'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <Package className="w-6 h-6" />
            <span>All Products</span>
          </button>
          
          <button
            onClick={() => setSelectedType('digital')}
            className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
              selectedType === 'digital'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <FileText className="w-6 h-6" />
            <span>Digital</span>
          </button>
          
          <button
            onClick={() => setSelectedType('physical')}
            className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
              selectedType === 'physical'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <Package className="w-6 h-6" />
            <span>Physical</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => copyLink(e, product.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity"
                >
                  {copiedId === product.id ? (
                    <div className="flex items-center space-x-2 text-white">
                      <CheckCircle className="w-6 h-6" />
                      <span>Link Copied!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-white">
                      <Copy className="w-6 h-6" />
                      <span>Copy Link</span>
                    </div>
                  )}
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-500">${product.price}</span>
                  <div className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm">
                    15% commission
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className={`px-2 py-1 rounded-full ${
                    product.type === 'digital' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {product.type === 'digital' ? 'Digital Product' : 'Physical Product'}
                  </span>
                  {product.type === 'physical' && product.stock !== undefined && (
                    <span className={`${
                      product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={(e) => copyLink(e, product.id)}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No products found matching your criteria</p>
          </div>
        )}

        {/* Promotion Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Share affiliate products on your social platforms</li>
              <li>• Create unboxing videos for physical products</li>
              <li>• Post before/after results for relevant items</li>
              <li>• Use relevant hashtags to increase visibility</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Content Creation</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Create detailed product demonstration videos</li>
              <li>• Write honest, comprehensive reviews</li>
              <li>• Share personal experiences with products</li>
              <li>• Compare products to help buyers decide</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Always disclose affiliate relationships</li>
              <li>• Focus on products you genuinely like</li>
              <li>• Respond to questions about products</li>
              <li>• Keep track of best-performing products</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;