import React from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
}

export default function VideoBackground({ videoSrc }: VideoBackgroundProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      <video
        autoPlay
        muted
        loop
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
}