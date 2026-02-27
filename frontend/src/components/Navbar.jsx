// frontend/src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  const linkClasses = (path) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
      isActive(path) 
        ? 'bg-primary-100 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };

  const mobileLinkClasses = (path) => {
    return `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
      isActive(path) 
        ? 'bg-primary-100 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="shrink-0 flex items-center space-x-2">
              {/* 🔔 LOGO IMAGE NEEDED: Place your logo at public/images/logo.png */}
              <img 
                src="/images/logo.png" 
                alt="Blessed Foundation Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-primary-600 hidden sm:block">
                Blessed Foundation
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={linkClasses('/')}>
              Home
            </Link>
            <Link to="/about" className={linkClasses('/about')}>
              About
            </Link>
            <Link to="/join-us" className={linkClasses('/join-us')}>
              Join Us
            </Link>
            <Link to="/donate" className={linkClasses('/donate')}>
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-3">
            <div className="space-y-1">
              <Link to="/" className={mobileLinkClasses('/')} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" className={mobileLinkClasses('/about')} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/join-us" className={mobileLinkClasses('/join-us')} onClick={() => setIsMenuOpen(false)}>
                Join Us
              </Link>
              <Link to="/donate" className={mobileLinkClasses('/donate')} onClick={() => setIsMenuOpen(false)}>
                Donate
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;