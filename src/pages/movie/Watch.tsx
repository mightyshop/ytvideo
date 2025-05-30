import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, X, Download, Share2, Star, MessageCircle, Heart, Send } from 'lucide-react';
import CopyrightClaimForm from '../../components/CopyrightClaimForm';

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CastMember {
  name: string;
  character: string;
  image: string;
}

interface SuggestedMovie {
  id: number;
  title: string;
  rating: number;
  image: string;
}

const Watch: React.FC = () => {
  const { movieName } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCopyrightForm, setShowCopyrightForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: '@movie_buff',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      text: 'This movie was absolutely incredible! The cinematography and acting were top-notch.',
      timestamp: '2 hours ago',
      likes: 24,
      isLiked: false
    },
    {
      id: '2',
      username: '@film_critic',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      text: 'The plot twists kept me on the edge of my seat. Definitely worth watching!',
      timestamp: '5 hours ago',
      likes: 18,
      isLiked: false,
      replies: [
        {
          id: '2-1',
          username: '@cinema_lover',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
          text: 'Totally agree! The ending was mind-blowing.',
          timestamp: '3 hours ago',
          likes: 7,
          isLiked: false
        }
      ]
    },
    {
      id: '3',
      username: '@movie_enthusiast',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      text: 'Great performances by the entire cast. The soundtrack was amazing too!',
      timestamp: '1 day ago',
      likes: 32,
      isLiked: false
    }
  ]);

  const suggestedMovies: SuggestedMovie[] = [
    {
      id: 1,
      title: 'The Color Purple',
      rating: 7.0,
      image: 'https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Asphalt City',
      rating: 6.0,
      image: 'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'John Wick: Chapter 4',
      rating: 7.6,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Reacher',
      rating: 8.0,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      title: '24',
      rating: 8.4,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      title: 'Blindspot',
      rating: 7.3,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 7,
      title: 'Outer Banks',
      rating: 7.5,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 8,
      title: 'The Equalizer',
      rating: 5.5,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const movieDetails = {
    title: 'Damaged',
    year: '2024-04-11',
    duration: '1 h 37 m',
    rating: 6.7,
    description: "Dan Lawson, a Chicago detective, travels to Scotland to link up with Scottish Det. Boyd, following the resurgence of a serial killer who's crimes match an unsolved case that he looked into 5 years previous in Chicago.",
    cast: [
      {
        name: 'Samuel L. Jackson',
        character: 'Dan Lawson',
        image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Vincent Cassel',
        character: 'Walker Bravo',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Gianni Capaldi',
        character: 'DCI Glen Boyd',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Kate Dickie',
        character: 'Laura Kessler',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'John Hannah',
        character: 'Colin McGregor',
        image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Laura Haddock',
        character: 'Marie Boyd',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        name: 'Brian McCardie',
        character: 'Avery Thompson',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ]
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      username: '@user',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      text: newComment.trim(),
      timestamp: 'Just now',
      likes: 0,
      isLiked: false
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId
              ? {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                }
              : reply
          )
        };
      }
      return comment;
    }));
  };

  const handleMovieClick = (movie: SuggestedMovie) => {
    const urlTitle = movie.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/movie/watch/${urlTitle}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="p-4 bg-[#1c1c1c]">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, TV shows, people..."
            className="w-full bg-black rounded-full pl-12 pr-10 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="relative w-full">
            <video
              className="w-full aspect-video"
              controls
              src="https://macdn.hakunaymatata.com/resource/aa024e46f048680da7c82a0f6aafc41f.mp4?Expires=1747098956&Signature=w7RMIOwvW7F~J~uj-rn812whvBS52ZvfAwN4c8sQReO0sMp-gRyojjfhA4s4IzD2TXJpQYmGA~zUIxByJG7buI~DZZKY-2a~zkOaaiWk-ZIve3kolh7upc4H1xQJN3Qrhu8~ioItcqDUdRLhklp59Q5gu2oQ45Ubez9knVAlp4qL3y6e--bLsqya7PGksNcJNrjJt1B3Yovah3zM936OeewMqAOwBL4avPz5P1OSqZCwMfOk5oPPHnXh4pea9BVuAEWUAyEKg8Z98W51w30V3jKLiNx3gaRkM5WEdW7dVUqHm97a9rnky8VE7TU~o7pW6c3A45tbKLw4rSekCEm-Og__&Key-Pair-Id=KMHN1LQ1HEUPL"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="p-8 text-white">
            <div className="text-gray-400 text-sm mb-4 flex items-center justify-between">
              <span>Find any content infringes on your rights, please contact us.</span>
              <button 
                onClick={() => setShowCopyrightForm(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Submit Copyright Claim
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{movieDetails.title}</h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  <span>{movieDetails.year}</span>
                  <span>{movieDetails.duration}</span>
                  <span className="text-white bg-gray-800 px-3 py-1 rounded-full">
                    {movieDetails.rating}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Download className="w-6 h-6" />
                </button>
                <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors relative"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {comments.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Resources section for mobile */}
            <div className="lg:hidden mb-8">
              <div className="bg-[#1c1c1c] rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Resources</h2>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div>Source: allok.pe</div>
                  <div>By Emma</div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
                  Damaged .h1
                </button>
              </div>
            </div>

            <p className="text-gray-300 mb-8 max-w-3xl">
              {movieDetails.description}
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Starring({movieDetails.cast.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {movieDetails.cast.map((actor, index) => (
                  <div key={index} className="text-center">
                    <div className="aspect-square overflow-hidden rounded-lg mb-2">
                      <img
                        src={actor.image}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{actor.name}</h3>
                    <p className="text-sm text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>

            {showComments && (
              <div className="mt-8 border-t border-gray-800 pt-8">
                <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
                
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-gray-800 rounded-lg border border-gray-700 p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="submit"
                          disabled={!newComment.trim()}
                          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Comment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={comment.avatar}
                          alt={comment.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{comment.username}</span>
                            <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-300">{comment.text}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <button
                              onClick={() => handleLike(comment.id)}
                              className={`flex items-center space-x-1 ${
                                comment.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} />
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-14 space-y-4">
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="flex items-start space-x-4">
                              <img
                                src={reply.avatar}
                                alt={reply.username}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium">{reply.username}</span>
                                  <span className="text-gray-400 text-sm">{reply.timestamp}</span>
                                </div>
                                <p className="text-gray-300">{reply.text}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <button
                                    onClick={() => handleLike(reply.id)}
                                    className={`flex items-center space-x-1 ${
                                      reply.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                    }`}
                                  >
                                    <Heart className="w-4 h-4" fill={reply.isLiked ? 'currentColor' : 'none'} />
                                    <span>{reply.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-6">For You</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {suggestedMovies.map(movie => (
                  <div 
                    key={movie.id} 
                    className="relative cursor-pointer"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black">
                      <h3 className="font-medium text-xs mb-1 line-clamp-1">{movie.title}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500 text-xs">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resources section for desktop */}
        <div className="hidden lg:block w-80 bg-[#1c1c1c] text-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Resources</h2>
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div>Source: allok.pe</div>
              <div>By Emma</div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
              Damaged .h1
            </button>
          </div>
        </div>
      </div>

      {showCopyrightForm && (
        <CopyrightClaimForm
          movieTitle={movieDetails.title}
          movieUrl={window.location.href}
          onClose={() => setShowCopyrightForm(false)}
        />
      )}
    </div>
  );
};

export default Watch;