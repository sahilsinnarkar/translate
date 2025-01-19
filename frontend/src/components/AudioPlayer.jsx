import React from 'react';

const AudioPlayer = ({ audioUrl }) => {
  return (
    <div className="flex items-center space-x-4">
      <audio
        controls
        className="w-full max-w-md"
        src={audioUrl}
      >
        Your browser does not support the audio element.
      </audio>
      
      <a
        href={audioUrl}
        download="translation.mp3"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Download
      </a>
    </div>
  );
};

export default AudioPlayer;
