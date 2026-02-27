// frontend/src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | Blessed Foundation';
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-primary-200">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary-100 p-6 rounded-full">
              <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-4">
          <p className="text-gray-500">
            Here are some helpful links instead:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="btn-primary"
            >
              Go to Homepage
            </Link>
            <Link
              to="/about"
              className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/join-us"
              className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition duration-300"
            >
              Join Us
            </Link>
            <Link
              to="/donate"
              className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition duration-300"
            >
              Donate
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-3">
            Can't find what you're looking for?
          </p>
          <p className="text-primary-600">
            Contact us at{" "}
            <a href="mailto:info@blessedfoundation.org" className="underline hover:text-primary-700">
              info@blessedfoundation.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;