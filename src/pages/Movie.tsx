import React, { useState } from 'react';
import { Play, Star, Info, ChevronRight, ArrowLeft, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StreamingService {
  name: string;
  logo: string;
  creator: string;
}

interface MovieSuggestion {
  id: number;
  title: string;
  rating: number;
  image: string;
}

const Movie: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieSuggestion | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const streamingServices: StreamingService[] = [
    {
      name: 'Netflix',
      logo: 'https://images.pexels.com/photos/12876612/pexels-photo-12876612.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'Regina'
    },
    {
      name: 'Prime Video',
      logo: 'https://images.pexels.com/photos/19338755/pexels-photo-19338755.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'Lakimora'
    },
    {
      name: 'Disney+',
      logo: 'https://images.pexels.com/photos/4219088/pexels-photo-4219088.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'samrawit'
    },
    {
      name: 'Apple TV+',
      logo: 'https://images.pexels.com/photos/12899188/pexels-photo-12899188.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'Arf Yldrim'
    },
    {
      name: 'Viu',
      logo: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'Don Jazzy'
    },
    {
      name: 'Hulu',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'Andy'
    },
    {
      name: 'ZEE5',
      logo: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'Hassan Amadil'
    },
    {
      name: 'Viva Max',
      logo: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
      creator: 'Deborah Nzolani'
    }
  ];

  const suggestions: MovieSuggestion[] = [
    {
      id: 1,
      title: 'A Discovery of Witches',
      rating: 7.8,
      image: 'https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Tale of the Nine Tailed',
      rating: 6.8,
      image: 'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Damaged',
      rating: 6.7,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Evil Dead Rise',
      rating: 6.3,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const trending: MovieSuggestion[] = [
    {
      id: 5,
      title: 'The Last of Us',
      rating: 9.2,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      title: 'Havoc',
      rating: 7.5,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 7,
      title: 'Weak Hero',
      rating: 8.1,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const handleMovieClick = (movie: MovieSuggestion) => {
    const urlTitle = movie.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/movie/watch/${urlTitle}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows, people..."
              className="w-full bg-gray-800 rounded-full pl-12 pr-10 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Popular Playlist</h1>
          <p className="text-sm text-gray-400">All contents are uploaded by users in App</p>
        </div>

        {/* Streaming Services */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-12">
          {streamingServices.map((service, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src={service.logo} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-400">By {service.creator}</p>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Suggestions</h2>
            <button className="text-gray-400 hover:text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {suggestions.map(movie => (
              <div 
                key={movie.id} 
                className="relative group cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                  <h3 className="font-medium text-sm mb-1">{movie.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              Trending Now
              <span className="ml-2">🔥</span>
            </h2>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white">More</button>
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trending.map(movie => (
              <div 
                key={movie.id} 
                className="relative group cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                  <h3 className="font-medium text-sm mb-1">{movie.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;