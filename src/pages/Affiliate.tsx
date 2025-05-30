import React, { useState } from 'react';
import { Share2, Copy, CheckCircle, ExternalLink, Star, FileText, Package } from 'lucide-react';
import { categories } from '../data/categories';

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

const products: Product[] = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'High-quality wireless headphones with noise cancellation.',
    rating: 4.8,
    reviews: 245,
    commission: 15,
    category: 'audio',
    type: 'physical',
    weight: '250g',
    dimensions: '18 x 15 x 8 cm',
    shippingTime: '3-5 business days',
    stock: 50
  },
  {
    id: 2,
    title: 'Digital Marketing Course',
    price: 199.99,
    image: 'https://images.pexels.com/photos/907607/pexels-photo-907607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Comprehensive digital marketing course with lifetime access.',
    rating: 4.6,
    reviews: 189,
    commission: 40,
    category: 'education',
    type: 'digital',
    downloadUrl: 'https://example.com/course',
    fileSize: '2.5GB',
    fileFormat: 'MP4, PDF'
  },
  {
    id: 3,
    title: 'Stock Photo Collection',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Premium collection of 1000+ high-resolution stock photos.',
    rating: 4.5,
    reviews: 312,
    commission: 30,
    category: 'media',
    type: 'digital',
    downloadUrl: 'https://example.com/photos',
    fileSize: '5GB',
    fileFormat: 'JPG, RAW'
  },
  {
    id: 4,
    title: 'Gaming Mouse',
    price: 79.99,
    image: 'https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Professional gaming mouse with RGB lighting.',
    rating: 4.7,
    reviews: 156,
    commission: 20,
    category: 'gaming',
    type: 'physical',
    weight: '120g',
    dimensions: '12 x 6 x 4 cm',
    shippingTime: '2-4 business days',
    stock: 100
  },
  {
    id: 5,
    title: 'Productivity App Bundle',
    price: 129.99,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Suite of productivity apps for work and study.',
    rating: 4.9,
    reviews: 203,
    commission: 35,
    category: 'software',
    type: 'digital',
    downloadUrl: 'https://example.com/apps',
    fileSize: '500MB',
    fileFormat: 'EXE, DMG'
  },
  {
    id: 6,
    title: 'Wireless Earbuds',
    price: 159.99,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'True wireless earbuds with active noise cancellation.',
    rating: 4.7,
    reviews: 278,
    commission: 25,
    category: 'audio',
    type: 'physical',
    weight: '60g',
    dimensions: '6 x 4 x 3 cm',
    shippingTime: '2-3 business days',
    stock: 75
  }
];

const Affiliate: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'all' | 'digital' | 'physical'>('all');

  const getAffiliateLink = (productId: number) => {
    return `https://example.com/product/${productId}`;
  };

  const copyLink = (productId: number) => {
    navigator.clipboard.writeText(getAffiliateLink(productId));
    setCopiedId(productId);
    setTimeout(() => setCopiedId(null), 2000);
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

        {/* Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Product Type Filter */}
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedType('all')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  selectedType === 'all'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSelectedType('digital')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  selectedType === 'digital'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Digital</span>
              </button>
              <button
                onClick={() => setSelectedType('physical')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  selectedType === 'physical'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Physical</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden group">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => copyLink(product.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    {product.commission}% commission
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
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
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Affiliate;