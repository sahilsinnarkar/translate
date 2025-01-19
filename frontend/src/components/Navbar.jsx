import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-indigo-400">
              Transcripto
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <div className={`lg:flex lg:items-center lg:space-x-4 ${mobileMenuOpen ? '' : 'hidden'}`}>
            <Link to="/" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Home
            </Link>
            <Link to="/upload-record" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Upload/Record
            </Link>
            <Link to="/video-upload" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Video Upload
            </Link>
            <Link to="/blogs" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Blogs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
