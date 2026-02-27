import { Link } from 'react-router-dom';
import Slideshow from '../components/Slideshow';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Slideshow Hero Section */}
      <Slideshow />

      {/* Mission Statement */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary-700 mb-4">Our Mission</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Blessed Foundation exists to demonstrate the love of Christ by empowering
           disadvantaged communities and individuals through holistic support programs, community outreach, advocacy for social justice,
            mentorship, and strategic partnerships that promote sustainable development. We are committed to creating opportunities that empower individuals to break the cycle of poverty and build better futures for themselves and their families.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary-700">How You Can Help</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
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

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h8m-4-7v3m-7 11h14M5 21h14" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Donate</h3>
            <p className="text-gray-600">
              Your financial support in GH₵ helps us fund programs and reach more people in need.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
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

      {/* Call to Action */}
      <section className="bg-primary-50 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold text-primary-700 mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join us in our mission to create positive change in our community.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/join-us"
            className="btn-primary"
          >
            Join Us Today
          </Link>
          <Link
            to="/about"
            className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;