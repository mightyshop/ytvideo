import React, { useState } from 'react';
import { Video, Music, Search, Upload as UploadIcon, Info, DollarSign, FileText, CheckCircle, X, Plus } from 'lucide-react';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormTextArea from '../../components/FormTextArea';
import FormCheckbox from '../../components/FormCheckbox';

interface MovieFormData {
  type: 'single' | 'series';
  imdbId: string;
  title: string;
  releaseYear: string;
  genres: string[];
  director: string;
  cast: string[];
  plot: string;
  poster: string;
  runtime: string;
  contentRating: string;
  language: string;
  productionCompany: string;
  videoUrl: string;
  videoQuality: '720p' | '1080p' | '4K';
  subtitleUrl: string;
  hasDistributionRights: boolean;
  ownershipDeclaration: boolean;
  // Series specific fields
  seasons?: {
    number: number;
    title: string;
    description: string;
    numberOfEpisodes: number;
    episodes: {
      title: string;
      number: number;
      duration: number;
      url: string;
    }[];
  }[];
}

interface AudioFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseYear: string;
  audioUrl: string;
  coverArt: string;
  copyright: string;
}

const Upload: React.FC = () => {
  const [uploadType, setUploadType] = useState<'movie' | 'audio'>('movie');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [movieForm, setMovieForm] = useState<MovieFormData>({
    type: 'single',
    imdbId: '',
    title: '',
    releaseYear: '',
    genres: [],
    director: '',
    cast: [],
    plot: '',
    poster: '',
    runtime: '',
    contentRating: '',
    language: '',
    productionCompany: '',
    videoUrl: '',
    videoQuality: '1080p',
    subtitleUrl: '',
    hasDistributionRights: false,
    ownershipDeclaration: false,
    seasons: []
  });

  const [audioForm, setAudioForm] = useState<AudioFormData>({
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseYear: '',
    audioUrl: '',
    coverArt: '',
    copyright: ''
  });

  const handleImdbLookup = async () => {
    setIsLookingUp(true);
    // Simulate IMDb lookup
    setTimeout(() => {
      setMovieForm({
        ...movieForm,
        title: 'Sample Movie',
        releaseYear: '2024',
        genres: ['Action', 'Drama'],
        director: 'John Doe',
        cast: ['Actor 1', 'Actor 2'],
        plot: 'A compelling story...',
        poster: 'https://example.com/poster.jpg',
        runtime: '120',
        contentRating: 'PG-13',
        language: 'English',
        productionCompany: 'Studio Name'
      });
      setIsLookingUp(false);
    }, 1500);
  };

  const handleAddSeason = () => {
    setMovieForm(prev => ({
      ...prev,
      seasons: [
        ...(prev.seasons || []),
        {
          number: (prev.seasons?.length || 0) + 1,
          title: '',
          description: '',
          numberOfEpisodes: 1,
          episodes: [{
            title: '',
            number: 1,
            duration: 0,
            url: ''
          }]
        }
      ]
    }));
  };

  const handleSeasonChange = (seasonIndex: number, field: string, value: string | number) => {
    setMovieForm(prev => ({
      ...prev,
      seasons: prev.seasons?.map((season, index) => 
        index === seasonIndex 
          ? { ...season, [field]: value }
          : season
      )
    }));
  };

  const handleEpisodeChange = (seasonIndex: number, episodeIndex: number, field: string, value: string | number) => {
    setMovieForm(prev => ({
      ...prev,
      seasons: prev.seasons?.map((season, sIndex) => 
        sIndex === seasonIndex 
          ? {
              ...season,
              episodes: season.episodes.map((episode, eIndex) =>
                eIndex === episodeIndex
                  ? { ...episode, [field]: value }
                  : episode
              )
            }
          : season
      )
    }));
  };

  const handleAddEpisode = (seasonIndex: number) => {
    setMovieForm(prev => ({
      ...prev,
      seasons: prev.seasons?.map((season, index) => 
        index === seasonIndex 
          ? {
              ...season,
              episodes: [
                ...season.episodes,
                {
                  title: '',
                  number: season.episodes.length + 1,
                  duration: 0,
                  url: ''
                }
              ]
            }
          : season
      )
    }));
  };

  const handleMovieSubmit = (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    console.log('Movie upload:', { ...movieForm, status: isDraft ? 'draft' : 'published' });
  };

  const handleAudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Audio upload:', audioForm);
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-blue-500 rounded-full">
          <UploadIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Upload Content</h1>
          <p className="text-gray-400 mt-1">Share your content and earn</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Monetization</h2>
        </div>
        <p className="text-white/90 mb-2">Earn money from your content:</p>
        <p className="text-2xl font-bold text-white">$10 per 1,000 views</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setUploadType('movie')}
          className={`p-6 rounded-lg border-2 transition-colors ${
            uploadType === 'movie'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <Video className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold">Movie Upload</h3>
          <p className="text-sm text-gray-400 mt-2">Upload movies and earn from views</p>
        </button>

        <button
          onClick={() => setUploadType('audio')}
          className={`p-6 rounded-lg border-2 transition-colors ${
            uploadType === 'audio'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <Music className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold">Audio Upload</h3>
          <p className="text-sm text-gray-400 mt-2">Share music and audio content</p>
        </button>
      </div>

      {uploadType === 'movie' ? (
        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={(e) => handleMovieSubmit(e)} className="space-y-6">
            {/* Movie Type Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2">Content Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMovieForm({ ...movieForm, type: 'single' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    movieForm.type === 'single'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h4 className="font-medium">Single Film</h4>
                  <p className="text-sm text-gray-400 mt-1">Upload a standalone movie</p>
                </button>

                <button
                  type="button"
                  onClick={() => setMovieForm({ ...movieForm, type: 'series' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    movieForm.type === 'series'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h4 className="font-medium">TV Series</h4>
                  <p className="text-sm text-gray-400 mt-1">Upload a series with multiple episodes</p>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FormInput
                label="IMDb ID"
                value={movieForm.imdbId}
                onChange={(e) => setMovieForm({ ...movieForm, imdbId: e.target.value })}
                placeholder="Enter IMDb ID (e.g., tt1234567)"
              />
              <button
                type="button"
                onClick={handleImdbLookup}
                disabled={isLookingUp}
                className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                {isLookingUp ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Looking up...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Lookup</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormInput
                label="Title"
                value={movieForm.title}
                onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                required
              />

              <FormInput
                label="Release Year"
                value={movieForm.releaseYear}
                onChange={(e) => setMovieForm({ ...movieForm, releaseYear: e.target.value })}
                required
              />

              <FormInput
                label="Director"
                value={movieForm.director}
                onChange={(e) => setMovieForm({ ...movieForm, director: e.target.value })}
                required
              />

              <FormInput
                label="Runtime (minutes)"
                value={movieForm.runtime}
                onChange={(e) => setMovieForm({ ...movieForm, runtime: e.target.value })}
                required
              />

              <FormInput
                label="Content Rating"
                value={movieForm.contentRating}
                onChange={(e) => setMovieForm({ ...movieForm, contentRating: e.target.value })}
                required
              />

              <FormInput
                label="Language"
                value={movieForm.language}
                onChange={(e) => setMovieForm({ ...movieForm, language: e.target.value })}
                required
              />
            </div>

            <FormTextArea
              label="Plot Summary"
              value={movieForm.plot}
              onChange={(e) => setMovieForm({ ...movieForm, plot: e.target.value })}
              required
            />

            <FormInput
              label="Movie Poster URL"
              value={movieForm.poster}
              onChange={(e) => setMovieForm({ ...movieForm, poster: e.target.value })}
              required
            />

            {movieForm.type === 'single' ? (
              <>
                <FormInput
                  label="MP4 Video URL"
                  value={movieForm.videoUrl}
                  onChange={(e) => setMovieForm({ ...movieForm, videoUrl: e.target.value })}
                  required
                />

                <FormSelect
                  label="Video Quality"
                  value={movieForm.videoQuality}
                  onChange={(e) => setMovieForm({ ...movieForm, videoQuality: e.target.value as '720p' | '1080p' | '4K' })}
                  options={[
                    { value: '720p', label: '720p HD' },
                    { value: '1080p', label: '1080p Full HD' },
                    { value: '4K', label: '4K Ultra HD' }
                  ]}
                  required
                />

                <FormInput
                  label="Subtitle File URL (Optional)"
                  value={movieForm.subtitleUrl}
                  onChange={(e) => setMovieForm({ ...movieForm, subtitleUrl: e.target.value })}
                />
              </>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Season Management</h3>
                  <button
                    type="button"
                    onClick={handleAddSeason}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Season</span>
                  </button>
                </div>

                {movieForm.seasons?.map((season, seasonIndex) => (
                  <div key={seasonIndex} className="bg-gray-700 rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        label="Season Number"
                        type="number"
                        value={season.number}
                        onChange={(e) => handleSeasonChange(seasonIndex, 'number', parseInt(e.target.value))}
                        required
                      />
                      <FormInput
                        label="Number of Episodes"
                        type="number"
                        value={season.numberOfEpisodes}
                        onChange={(e) => handleSeasonChange(seasonIndex, 'numberOfEpisodes', parseInt(e.target.value))}
                        required
                      />
                    </div>

                    <FormInput
                      label="Season Title"
                      value={season.title}
                      onChange={(e) => handleSeasonChange(seasonIndex, 'title', e.target.value)}
                      required
                    />

                    <FormTextArea
                      label="Season Description"
                      value={season.description}
                      onChange={(e) => handleSeasonChange(seasonIndex, 'description', e.target.value)}
                      required
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Episodes</h4>
                        <button
                          type="button"
                          onClick={() => handleAddEpisode(seasonIndex)}
                          className="text-blue-400 hover:text-blue-300 flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Episode</span>
                        </button>
                      </div>

                      {season.episodes.map((episode, episodeIndex) => (
                        <div key={episodeIndex} className="bg-gray-800 rounded-lg p-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormInput
                              label="Episode Title"
                              value={episode.title}
                              onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'title', e.target.value)}
                              required
                            />
                            <FormInput
                              label="Episode Number"
                              type="number"
                              value={episode.number}
                              onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'number', parseInt(e.target.value))}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <FormInput
                              label="Duration (minutes)"
                              type="number"
                              value={episode.duration}
                              onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'duration', parseInt(e.target.value))}
                              required
                            />
                            <FormInput
                              label="Episode URL"
                              type="url"
                              value={episode.url}
                              onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'url', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 bg-gray-700 rounded-lg p-4">
              <FormCheckbox
                label="I have the necessary distribution rights for this content"
                checked={movieForm.hasDistributionRights}
                onChange={(e) => setMovieForm({ ...movieForm, hasDistributionRights: e.target.checked })}
              />

              <FormCheckbox
                label="I declare that I own or have permission to upload this content"
                checked={movieForm.ownershipDeclaration}
                onChange={(e) => setMovieForm({ ...movieForm, ownershipDeclaration: e.target.checked })}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={(e) => handleMovieSubmit(e, true)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={!movieForm.hasDistributionRights || !movieForm.ownershipDeclaration}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleAudioSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormInput
                label="Track Title"
                value={audioForm.title}
                onChange={(e) => setAudioForm({ ...audioForm, title: e.target.value })}
                required
              />

              <FormInput
                label="Artist Name"
                value={audioForm.artist}
                onChange={(e) => setAudioForm({ ...audioForm, artist: e.target.value })}
                required
              />

              <FormInput
                label="Album Name"
                value={audioForm.album}
                onChange={(e) => setAudioForm({ ...audioForm, album: e.target.value })}
                required
              />

              <FormInput
                label="Genre"
                value={audioForm.genre}
                onChange={(e) => setAudioForm({ ...audioForm, genre: e.target.value })}
                required
              />

              <FormInput
                label="Release Year"
                value={audioForm.releaseYear}
                onChange={(e) => setAudioForm({ ...audioForm, releaseYear: e.target.value })}
                required
              />
            </div>

            <FormInput
              label="Audio File URL (MP3/WAV)"
              value={audioForm.audioUrl}
              onChange={(e) => setAudioForm({ ...audioForm, audioUrl: e.target.value })}
              required
            />

            <FormInput
              label="Cover Art URL"
              value={audioForm.coverArt}
              onChange={(e) => setAudioForm({ ...audioForm, coverArt: e.target.value })}
              required
            />

            <FormTextArea
              label="Copyright Information"
              value={audioForm.copyright}
              onChange={(e) => setAudioForm({ ...audioForm, copyright: e.target.value })}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Upload Audio
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Upload;