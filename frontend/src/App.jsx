import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UploadRecord from './components/UploadRecords';
import VideoUpload from './components/VideoUpload';
import Blogs from './components/Blogs';
// import Transcriptions from './components/Transcriptions';
// import Translation from './components/Translation';
// import Summarizer from './components/Summarizer';

const App = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar />
      {loading && <p>Loading...</p>}
      {/* {results && <pre>{JSON.stringify(results, null, 2)}</pre>} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-record" element={<UploadRecord />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/video-upload" element={<VideoUpload setResults={setResults} setLoading={setLoading} />} />
        {/* <Route path="/audio-player" element={<AudioPlayer  />} /> */}
        {/* <Route path="/transcriptions" element={<Transcriptions />} /> */}
        {/* <Route path="/translation" element={<Translation />} /> */}
        {/* <Route path="/summarizer" element={<Summarizer />} /> */}
        {/* <Route path="/help" element={<Help />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </div>
  );
};

export default App;
