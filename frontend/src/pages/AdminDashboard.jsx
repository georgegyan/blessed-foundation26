import { useState, useEffect } from 'react';
import { joinUsApi, donationsApi } from '../services/api';

const AdminDashboard = () => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('join-requests'); // Default to join requests
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState('all'); // For future use when we add status

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [joinData, donationData] = await Promise.all([
        joinUsApi.getAll(),
        donationsApi.getAll()
      ]);
      setJoinRequests(joinData);
      setDonations(donationData);
      setError('');
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalJoinRequests = joinRequests.length;
  const newToday = joinRequests.filter(req => {
    const today = new Date();
    const reqDate = new Date(req.created_at);
    return reqDate.toDateString() === today.toDateString();
  }).length;

  const totalDonations = donations.length;
  const totalAmount = donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);
  
  // Get recent items (last 5)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-GH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Filter data based on date
  const filterByDate = (items) => {
    if (dateFilter === 'all') return items;
    
    
    const filterDate = new Date();
    
    switch(dateFilter) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        return items.filter(item => new Date(item.created_at) >= filterDate);
      case 'week':
        filterDate.setDate(filterDate.getDate() - 7);
        return items.filter(item => new Date(item.created_at) >= filterDate);
      case 'month':
        filterDate.setMonth(filterDate.getMonth() - 1);
        return items.filter(item => new Date(item.created_at) >= filterDate);
      default:
        return items;
    }
  };

  // Filter by search term
  const filterBySearch = (items) => {
    if (!searchTerm) return items;
    
    return items.filter(item => 
      item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredJoinRequests = filterBySearch(filterByDate(joinRequests));
  const filteredDonations = filterBySearch(filterByDate(donations));

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
    setSelectedRequest(null);
  };

  const getStatusBadge = () => {
    // This can be expanded when we add status to the model
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-primary-600 mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 bg-primary-100 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-gray-600 text-lg">Loading dashboard data...</p>
            <p className="text-gray-400 text-sm mt-2">Fetching your submissions</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and view all submissions from your website
              </p>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
              <button 
                onClick={fetchData}
                className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-primary-600">{totalJoinRequests}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Join Requests</h3>
            <p className="text-sm text-gray-400 mt-2">
              <span className="text-green-500">{newToday} new</span> today
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-green-600">{totalDonations}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Donations</h3>
            <p className="text-sm text-gray-400 mt-2">Total transactions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-yellow-600">GH₵{totalAmount.toFixed(2)}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Raised</h3>
            <p className="text-sm text-gray-400 mt-2">From all donations</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-purple-600">
                {donations.length > 0 ? (totalAmount / donations.length).toFixed(2) : '0.00'}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Average Gift</h3>
            <p className="text-sm text-gray-400 mt-2">Per donation</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Filter</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full input-field rounded-lg border-gray-300 focus:border-primary-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full input-field pl-10 rounded-lg border-gray-300 focus:border-primary-500"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Stats</label>
              <div className="bg-primary-50 rounded-lg p-3">
                <p className="text-sm text-primary-700">
                  <span className="font-bold">{filteredJoinRequests.length}</span> requests match filters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSelectedTab('join-requests')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition relative ${
                selectedTab === 'join-requests'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Join Requests
              {filteredJoinRequests.length > 0 && (
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  selectedTab === 'join-requests' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filteredJoinRequests.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setSelectedTab('donations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition relative ${
                selectedTab === 'donations'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Donations
              {filteredDonations.length > 0 && (
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  selectedTab === 'donations' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filteredDonations.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Tab Content - Join Requests */}
        {selectedTab === 'join-requests' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJoinRequests.length > 0 ? (
                    filteredJoinRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-700 font-semibold text-sm">
                                  {request.full_name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {request.full_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{request.email}</div>
                          <div className="text-sm text-gray-500">{request.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {request.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(request.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(request)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleViewDetails(request)}
                            className="text-primary-600 hover:text-primary-900 font-medium text-sm transition"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <p className="text-gray-500 text-lg">No join requests found</p>
                          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content - Donations */}
        {selectedTab === 'donations' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.length > 0 ? (
                    filteredDonations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 shrink-0">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-700 font-semibold text-sm">
                                  {donation.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {donation.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{donation.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">
                            GH₵{parseFloat(donation.amount).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(donation.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-gray-500 text-lg">No donations found</p>
                          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-linear-to-r from-primary-600 to-primary-800 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Join Request Details</h3>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-700">
                        {selectedRequest.full_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{selectedRequest.full_name}</h4>
                      <p className="text-gray-500">Submitted {formatDate(selectedRequest.created_at)}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Contact Information
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="text-gray-900 font-medium">{selectedRequest.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="text-gray-900 font-medium">{selectedRequest.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Message
                    </h5>
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedRequest.message}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Status
                    </h5>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Pending Review
                      </span>
                      <span className="text-sm text-gray-500">
                        ID: {selectedRequest.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                    Mark as Contacted
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;