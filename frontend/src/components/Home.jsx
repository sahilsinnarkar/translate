import React from 'react';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="/background4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 bg-white/90 min-h-screen flex flex-col items-center justify-center shadow-inner">
        {/* Header Section */}
        <header className="text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 fade-in">
            <span className="bg-gradient-to-r from-purple-400 via-gray-900 to-purple-600 bg-clip-text text-transparent">
              Speech-to-Text Transcription Tool
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 slide-in">
            Effortlessly convert audio and explore insights with our blog.
          </p>
        </header>

        {/* Quick Access Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 slide-up">
            Quick Access
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <a
              href="/video-upload"
              className="w-64 px-8 py-4 bg-gray-900 text-white hover:bg-purple-600 rounded-xl text-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-105 bounce text-center"
            >
              Video Upload
            </a>
            <a
              href="/blog"
              className="w-64 px-8 py-4 bg-gray-900 text-white hover:bg-purple-600 rounded-xl text-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-105 bounce text-center"
            >
              Blog
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
