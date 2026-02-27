// frontend/src/pages/Donate.jsx
import { useState } from 'react';
import { donationsApi } from '../services/api';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSuccess(false);
    setError('');
    if (name === 'amount') {
      setSelectedPreset(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await donationsApi.create(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        amount: '',
      });
      setSelectedPreset(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const predefinedAmounts = [20, 50, 100, 200, 300, 500];

  const setAmount = (amount) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
    setSelectedPreset(amount);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-br from-green-100/30 to-transparent -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-6">
            <span className="px-4 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
              Give Generously
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Make a <span className="text-green-600">Difference</span> Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generous contribution helps us fund programs, support communities, 
            and create lasting change in the lives of those who need it most.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 relative overflow-hidden">
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-lg transform transition-all duration-500 animate-slide-down">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-3xl opacity-30"></div>
              <div className="flex items-start">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-green-800">Thank You for Your Generosity! 🙏</h3>
                  <p className="text-green-700 mt-1">Your donation of <span className="font-bold">GH₵{parseFloat(formData.amount).toFixed(2)}</span> has been received. A receipt will be sent to your email.</p>
                </div>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-green-500 hover:text-green-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-lg">
              <div className="flex">
                <div className="shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
          {/* Form Header with Impact Counter */}
          <div className="bg-linear-to-r from-green-600 to-green-800 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Donation Details</h2>
                <p className="text-green-100 mt-1">Every cedi makes a difference</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-white text-sm">Your Impact</p>
                <p className="text-white font-bold text-xl">GH₵{formData.amount || '0'}</p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field pl-10 py-3 border-2 border-gray-200 focus:border-green-500 rounded-xl transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-10 py-3 border-2 border-gray-200 focus:border-green-500 rounded-xl transition"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Predefined Amounts */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Amount (GH₵) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`relative py-3 px-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedPreset === amt
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                        : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    {selectedPreset === amt && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    GH₵{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="group">
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition">
                Or Enter Custom Amount (GH₵) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-semibold group-focus-within:text-green-500 transition">GH₵</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.01"
                  className="input-field pl-14 py-3 border-2 border-gray-200 focus:border-green-500 rounded-xl transition"
                  placeholder="50.00"
                />
              </div>
              {formData.amount && (
                <p className="mt-2 text-sm text-green-600">
                  Your donation of GH₵{parseFloat(formData.amount).toFixed(2)} will help provide 
                  {parseFloat(formData.amount) >= 100 ? ' meals for a family' : 
                   parseFloat(formData.amount) >= 50 ? ' school supplies' : 
                   ' essential items'} for those in need.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden rounded-xl bg-linear-to-r from-green-600 to-green-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-linear-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Donation
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              This is a demo donation system. No actual money will be transferred.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">500+</div>
            <div className="text-sm text-gray-600">Donations Received</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">GH₵50K+</div>
            <div className="text-sm text-gray-600">Total Raised</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">1000+</div>
            <div className="text-sm text-gray-600">Lives Impacted</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">Goes to Cause</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;