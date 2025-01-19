import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = ({ setResults, setLoading }) => {
    const [file, setFile] = useState(null);
    const [sourceLanguage, setSourceLanguage] = useState('en-US');
    const [translationData, setTranslationData] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('en-US'); // Initial selected language for display

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a video file before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);
        formData.append('sourceLanguage', sourceLanguage);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/translate', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResults(response.data);
            setTranslationData(response.data);
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('An error occurred while processing the video.');
        }
        setLoading(false);
    };

    return (
        <div className="bg-white shadow sm:rounded-lg p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Select Source Language */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Video Source Language
                    </label>
                    <select
                        value={sourceLanguage}
                        onChange={(e) => setSourceLanguage(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="en-US">English</option>
                        <option value="hi">Hindi</option>
                        <option value="ma">Marathi</option>
                        <option value="gu">Gujrati</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telgu</option>
                        <option value="ml">Malayalam</option>
                        <option value="kn">Kannada</option>
                        <option value="pa">Punjabi</option>
                        <option value="or">Odia</option>
                        {/* Add other languages here */}
                    </select>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Upload Video
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!file}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    Translate Video
                </button>
            </form>

            {/* Translation Output (Filtered by Selected Language) */}
            {translationData && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Translation Results</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Select Language to View Translation
                        </label>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {Object.keys(translationData.translations).map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedLanguage && translationData.translations[selectedLanguage] && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-indigo-600">Original English Text:</h3>
                            <p className="text-gray-700 mt-2 p-4 bg-white rounded-lg shadow">
                                {translationData.english_text || 'N/A'}
                            </p>

                            <div>
                                <h3 className="text-lg font-medium text-indigo-600">Translation:</h3>
                                <p className="text-gray-700 mt-2 p-4 bg-white rounded-lg shadow">
                                    {translationData.translations[selectedLanguage].text || 'N/A'}
                                </p>
                                <audio controls src={`http://localhost:5000${translationData.translations[selectedLanguage].audio_url}`} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
