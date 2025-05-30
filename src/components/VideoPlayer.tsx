import React, { useRef, useEffect } from 'react';
import { Video } from '../types';
import { VideoInfo, VideoActions } from './VideoInfo';

interface VideoPlayerProps {
  videos: Video[];
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videos, 
  isPlaying, 
  setIsPlaying,
  currentIndex,
  setCurrentIndex
}) => {
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const currentVideo = videos[currentIndex];
  
  useEffect(() => {
    if (!playerRef.current) return;

    const platform = getPlatform(currentVideo.videoUrl);
    const embedUrl = getEmbedUrl(platform, currentVideo.videoUrl);

    if (!embedUrl) {
      playerRef.current.innerHTML = "<p style='color:white;text-align:center;'>Unsupported or invalid URL</p>";
      return;
    }

    const wrapper = playerWrapperRef.current;
    if (wrapper) {
      wrapper.className = platform === "youtube" ? "landscape" : "";
    }

    playerRef.current.innerHTML = `
      <iframe 
        src="${embedUrl}" 
        frameborder="0" 
        allow="autoplay; fullscreen; encrypted-media"
        allowfullscreen
        style="border: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%;"
      ></iframe>`;

    setIsPlaying(true);
  }, [currentIndex, setIsPlaying, currentVideo.videoUrl]);

  const getPlatform = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("tiktok.com")) return "tiktok";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("facebook.com")) return "facebook";
    if (url.includes("x.com") || url.includes("twitter.com")) return "x";
    return null;
  };

  const getEmbedUrl = (platform: string | null, url: string) => {
    switch (platform) {
      case "youtube":
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
        if (match) {
          return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&playsinline=1&controls=1&rel=0`;
        }
        break;
      case "tiktok":
        return `https://www.tiktok.com/embed/v2/${extractTikTokId(url)}`;
      case "instagram":
        return url.includes("/reel/") ? `${url}embed` : url;
      case "facebook":
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=1&mute=1`;
      case "x":
        return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
      default:
        return url; // Return the original URL for direct video files
    }
  };

  const extractTikTokId = (url: string) => {
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : "";
  };
  
  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      <div 
        ref={playerWrapperRef}
        className="absolute inset-0 flex justify-center"
        style={{
          background: 'black',
          height: '100%',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div 
          ref={playerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'black'
          }}
        />
      </div>
      
      {/* Video controls overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <VideoInfo video={currentVideo} />
        <VideoActions video={currentVideo} />
        
        {/* Play/Pause indicator */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
            {isPlaying ? (
              <div className="w-5 h-16 flex space-x-2">
                <div className="w-2 h-full bg-white"></div>
                <div className="w-2 h-full bg-white"></div>
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;