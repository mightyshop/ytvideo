import React, { useState } from 'react';
import { Search, X, FileText, Package, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { featuredImages } from '../data/featured';
import ImageSlider from '../components/ImageSlider';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'digital' | 'physical'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProducts = products.filter(product => {
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesCategory && matchesSearch;
  });

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    const categoryProducts = filteredProducts.filter(product => product.category === category.id);
    if (categoryProducts.length > 0) {
      acc[category.id] = {
        name: category.name,
        products: categoryProducts
      };
    }
    return acc;
  }, {} as Record<string, { name: string; products: typeof products }>);

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
      onClick={() => navigate(`/shop/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
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
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
              )}
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            product.type === 'digital' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
          }`}>
            {product.type === 'digital' ? 'Digital' : 'Physical'}
          </span>
        </div>
        <h3 className="text-base font-semibold mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-green-500">${product.price}</span>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-xs text-gray-400">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 md:pb-0">
      <TopBar />
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search */}
          <div className="mb-8">
            <div className="relative w-full max-w-3xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands and categories"
                className="w-full bg-gray-800 rounded-lg pl-12 pr-10 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <ImageSlider images={featuredImages} />

          {/* Categories Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Categories</h2>
              <button 
                onClick={() => navigate('/categories')}
                className="hidden md:flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.slice(0, 10).map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id === selectedCategory ? '' : category.id)}
                  className={`p-4 rounded-lg transition-colors flex flex-col items-center space-y-2 ${
                    category.id === selectedCategory
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                    category.id === selectedCategory ? 'bg-blue-600' : 'bg-gray-700'
                  }`}>
                    {category.icon}
                  </div>
                  <span className="text-sm text-center">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
            <button
              onClick={() => setSelectedType('all')}
              className={`p-3 md:p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                selectedType === 'all'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <Package className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">All</span>
            </button>
            
            <button
              onClick={() => setSelectedType('digital')}
              className={`p-3 md:p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                selectedType === 'digital'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <FileText className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">Digital</span>
            </button>
            
            <button
              onClick={() => setSelectedType('physical')}
              className={`p-3 md:p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                selectedType === 'physical'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <Package className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">Physical</span>
            </button>
          </div>

          {/* Products by Category */}
          {Object.entries(productsByCategory).map(([categoryId, { name, products }]) => (
            <div key={categoryId} className="mb-8 md:mb-12">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold">{name}</h2>
                <button 
                  onClick={() => navigate(`/categories?category=${categoryId}`)}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {products.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}

          {Object.keys(productsByCategory).length === 0 && (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <p className="text-gray-400">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;