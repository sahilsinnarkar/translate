import React from 'react';
import AudioPlayer from './AudioPlayer';

const TranslationResults = ({ results }) => {
  return (
    <div className="mt-8 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Translation Results
        </h2>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">English Text:</h3>
          <p className="mt-1 text-sm text-gray-900">{results.english_text}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(results.translations).map(([language, data]) => (
            <div key={language} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {language}:
              </h3>
              <p className="text-sm text-gray-900 mb-3">{data.text}</p>
              <AudioPlayer audioUrl={data.audio_url} language={language} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranslationResults;