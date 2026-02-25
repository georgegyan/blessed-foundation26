import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 py-16 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Blessed Foundation
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Together we can make a difference in our community. Join us in our mission to create positive change.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/join-us"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
              Join Us
            </Link>
            <Link
              to="/donate"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition duration-300 transform hover:scale-105"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How You Can Help</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
            <p className="text-gray-600">
              Join our team of dedicated volunteers and make a direct impact in your community.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Donate</h3>
            <p className="text-gray-600">
              Your financial support helps us fund programs and reach more people in need.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Spread Word</h3>
            <p className="text-gray-600">
              Share our mission with friends and family to help grow our community of supporters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;