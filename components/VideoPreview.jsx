'use client';

import { useState } from 'react';
import { Play, Lock } from 'lucide-react';

export default function VideoPreview({ videoUrl, isEnrolled, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  const getVideoThumbnail = (url) => {
    if (!url) return null;
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return videoId ? `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg` : null;
    }
    return null;
  };

  const thumbnail = getVideoThumbnail(videoUrl);

  return (
    <div 
      className={`relative aspect-video bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {thumbnail ? (
        <img 
          src={thumbnail} 
          alt="Video thumbnail" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-80" />
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        {isEnrolled ? (
          <div className="bg-white bg-opacity-95 rounded-full p-4 shadow-lg">
            <Play className="h-6 w-6 text-gray-800" />
          </div>
        ) : (
          <div className="bg-white bg-opacity-95 rounded-full p-4 shadow-lg">
            <Lock className="h-6 w-6 text-gray-800" />
          </div>
        )}
      </div>
      
      {/* Hover effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-all duration-200">
          <div className="text-center text-white">
            {isEnrolled ? (
              <div className="bg-white bg-opacity-95 rounded-full p-5 shadow-lg">
                <Play className="h-8 w-8 text-gray-800" />
              </div>
            ) : (
              <div className="bg-white bg-opacity-95 rounded-full p-5 shadow-lg">
                <Lock className="h-8 w-8 text-gray-800" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 