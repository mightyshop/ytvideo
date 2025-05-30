import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories } from '../data/categories';
import { ArrowLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">All Categories</h1>
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => navigate(`/shop?category=${category.id}`)}
              className={`p-6 rounded-xl transition-all ${
                category.id === selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  category.id === selectedCategory ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm mt-1 opacity-80">Browse Products</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Categories;