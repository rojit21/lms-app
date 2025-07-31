'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

export default function VideoPlayer({ videoUrl, title, onProgress }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoType, setVideoType] = useState('direct');

  useEffect(() => {
    console.log('VideoPlayer - videoUrl:', videoUrl);
    if (videoUrl) {
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        setVideoType('youtube');
        console.log('VideoPlayer - Detected YouTube video');
      } else if (videoUrl.includes('vimeo.com')) {
        setVideoType('vimeo');
        console.log('VideoPlayer - Detected Vimeo video');
      } else {
        setVideoType('direct');
        console.log('VideoPlayer - Detected direct video');
      }
    }
  }, [videoUrl]);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  const getVimeoEmbedUrl = (url) => {
    const videoId = url.match(/vimeo\.com\/(\d+)/);
    return videoId ? `https://player.vimeo.com/video/${videoId[1]}` : url;
  };

  const handleTimeUpdate = (e) => {
    const video = e.target;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
    
    if (onProgress) {
      const progress = (video.currentTime / video.duration) * 100;
      onProgress(progress);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (videoType === 'youtube') {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={getYouTubeEmbedUrl(videoUrl)}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        <div className="absolute bottom-4 right-4">
          <a 
            href={videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm hover:bg-opacity-90"
          >
            Open in YouTube
          </a>
        </div>
      </div>
    );
  }

  if (videoType === 'vimeo') {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={getVimeoEmbedUrl(videoUrl)}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        src={videoUrl}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        muted={isMuted}
        volume={volume}
      />
      
      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">{formatTime(currentTime)}</span>
              <div className="flex-1 bg-gray-600 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16"
            />
            
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 