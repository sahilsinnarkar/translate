import React, { useState } from 'react';
import axios from 'axios';

const UploadRecords = () => {
  const [textInput, setTextInput] = useState('');
  const [textFile, setTextFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (fileType === 'text') {
      if (file && (file.type === 'text/plain' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        setTextFile(file);
      } else {
        alert('Please upload a valid text file (.txt or .docx).');
      }
    } else if (fileType === 'video') {
      if (file && file.type.startsWith('video/')) {
        setVideoFile(file);
      } else {
        alert('Please upload a valid video file (e.g., .mp4, .mov).');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!textInput && !textFile && !videoFile) {
      alert('Please provide at least one input: text, text file, or video file.');
      return;
    }

    const formData = new FormData();
    if (textInput) formData.append('textInput', textInput);
    if (textFile) formData.append('textFile', textFile);
    if (videoFile) formData.append('videoFile', videoFile);

    setIsUploading(true);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message || 'Upload successful!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload or Write Your Blog Post</h1>
        <p className="text-gray-600">Share your insights and include videos for transcription and translation.</p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Input Field */}
        <div className="flex flex-col">
          <label htmlFor="text-input" className="mb-2 text-gray-700 font-medium">
            Write Your Blog Content (Optional):
          </label>
          <textarea
            id="text-input"
            rows="6"
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Start typing your blog content here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        {/* Text File Upload */}
        <div className="flex flex-col">
          <label htmlFor="text-file" className="mb-2 text-gray-700 font-medium">
            Upload Text File (Optional, .txt or .docx):
          </label>
          <input
            type="file"
            id="text-file"
            accept=".txt, .docx"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => handleFileChange(e, 'text')}
          />
        </div>

        {/* Video File Upload */}
        <div className="flex flex-col">
          <label htmlFor="video-file" className="mb-2 text-gray-700 font-medium">
            Upload Video File (Optional, e.g., .mp4, .mov):
          </label>
          <input
            type="file"
            id="video-file"
            accept="video/*"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => handleFileChange(e, 'video')}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-3 text-white font-bold rounded-md ${
            isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Publish Blog'}
        </button>
      </form>
    </div>
  );
};

export default UploadRecords;
