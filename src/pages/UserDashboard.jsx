import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// import RecycleMateNavbar from '../components/Navbar';
import RecycleMateFooter from '../components/Footer';
import { toast } from 'react-toastify';

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [pickupHistory, setPickupHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewPickupModalOpen, setIsNewPickupModalOpen] = useState(false);

  // State for the new pickup form fields
  const [newPickupData, setNewPickupData] = useState({
    wasteType: '',
    location: '',
    date: '',
    time: '',
  });

  const navigate = useNavigate();

  // Function to get token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fetch pickup history
  useEffect(() => {
    const fetchPickupHistory = async () => {
      setLoading(true);
      setError(null);
      const token = getToken();

      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://recyclemate-api.onrender.com/api/v1/pickups/mine', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch pickup history.');
        }

        const data = await response.json();
        setPickupHistory(data.pickups || data); // Adjust based on actual API response structure
      } catch (err) {
        console.error('Error fetching pickup history:', err);
        setError(err.message || 'Error fetching pickup history.');
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === 'overview' || activeSection === 'pickupHistory') {
      fetchPickupHistory();
    }
  }, [activeSection, navigate]);

  // Handle new pickup request submission
  const handleNewPickupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      navigate('/login');
      return;
    }

    // Basic validation
    if (!newPickupData.wasteType || !newPickupData.location || !newPickupData.date || !newPickupData.time) {
      setError('All fields are required for a new pickup request.');
      setLoading(false);
      return;
    }

    // Format date and time for the API as per your example
    const formattedDate = new Date(newPickupData.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).replace(/\s/g, ' '); // e.g., "14 Jan 2025" -> "14th Jan 2025" (add "th" for ordinal if necessary, but API example is just "14th jan 2025")
    const day = new Date(newPickupData.date).getDate();
    const ordinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th'; // Covers 11th to 19th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    const finalFormattedDate = `${day}${ordinalSuffix(day)} ${new Date(newPickupData.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
    
    // Example time conversion to "HH:MM AM/PM"
    const [hours, minutes] = newPickupData.time.split(':');
    const dateObj = new Date();
    dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    const finalFormattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    try {
      const response = await fetch('https://recyclemate-api.onrender.com/api/v1/pickups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          wasteType: newPickupData.wasteType,
          location: newPickupData.location,
          date: finalFormattedDate,
          time: finalFormattedTime,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit pickup request.');
      }

      setIsNewPickupModalOpen(false);
      setNewPickupData({
        wasteType: '',
        location: '',
        date: '',
        time: '',
      });
      toast.success('Pickup request submitted successfully!');
      setActiveSection('pickupHistory'); // Re-fetch history to show the new pickup
    } catch (err) {
      console.error('Error submitting pickup request:', err);
      setError(err.message || 'Error submitting pickup request.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPickupChange = (e) => {
    const { name, value } = e.target;
    setNewPickupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page
  };


  return (
    <>
      {/* <RecycleMateNavbar /> */}
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Dashboard Navigation</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('overview')}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'overview' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('requestPickup')}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'requestPickup' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  Request Pickup
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('pickupHistory')}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'pickupHistory' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Pickup History
                </button>
              </li>
              {/* Help & Support */}
              <li>
                <button
                  onClick={() => setActiveSection('helpSupport')} // Or navigate to a dedicated support page
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'helpSupport' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.295a8.995 8.995 0 013.861-1.353m-3.861 1.353c-.854.269-1.748.45-2.656.541m2.656-.541l.775 3.328m-.775-3.328L7.545 4.721M7.545 4.721C4.402 6.641 2 9.574 2 13c0 1.278.487 2.502 1.35 3.424m1.042 3.102l3.22-3.22m3.54-3.54l3.22-3.22M15 13c0 1.278-.487 2.502-1.35 3.424m1.042 3.102l3.22-3.22m3.54-3.54l3.22-3.22M12 10.95c.39-.14.799-.219 1.207-.219.504 0 .99.1 1.455.292L21 17m-1.72-2.18l-3.22-3.22m3.22 3.22a8.994 8.994 0 00-1.35-3.861c-.269-.854-.45-1.748-.541-2.656m-2.656 2.656l-3.328.775m3.328-.775L19.279 7.545M19.279 7.545C17.359 4.402 14.426 2 11 2c-1.278 0-2.502.487-3.424 1.35M5.636 5.636l3.536 3.536m0 0c-.465.192-.951.292-1.455.292-.408 0-.817-.079-1.207-.219A3.996 3.996 0 0012 10.95c.39-.14.799-.219 1.207-.219.504 0 .99.1 1.455.292l3.536 3.536"></path></svg>
                  Help & Support
                </button>
              </li>
              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center text-red-600 hover:bg-red-50"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Logout
                </button>
              </li>
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {loading && <p className="text-center text-teal-600 text-lg">Loading...</p>}
            {error && <p className="text-center text-red-500 text-lg">Error: {error}</p>}

            {activeSection === 'overview' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
                {/* Quick Stats or Welcome Message */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Pickups</h3>
                    <p className="text-4xl font-bold text-teal-600">{pickupHistory.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Pending Pickups</h3>
                    <p className="text-4xl font-bold text-yellow-600">
                      {pickupHistory.filter(p => p.status && (p.status.toLowerCase() === 'pending' || p.status.toLowerCase() === 'in progress')).length}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Completed Pickups</h3>
                    <p className="text-4xl font-bold text-green-600">
                      {pickupHistory.filter(p => p.status && p.status.toLowerCase() === 'completed').length}
                    </p>
                  </div>
                </div>

                {/* Recent Pickup History */}
                <section className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Recent Pickup History</h2>
                    <button
                      onClick={() => setActiveSection('pickupHistory')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                    >
                      View All
                    </button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pickupHistory.slice(0, 3).map((pickup) => (
                          <tr key={pickup._id || pickup.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                              {/* Icon based on waste type - customize as needed */}
                              <span className="mr-2 text-xl">
                                {pickup.wasteType === 'rubber' ? ' टायर ' : ' 🗑️ '}
                              </span>{' '}
                              {pickup.wasteType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.date} | {pickup.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                                {pickup.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {pickupHistory.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No recent pickup requests.</p>
                    )}
                  </div>
                </section>
              </section>
            )}

            {activeSection === 'pickupHistory' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Pickup History</h2>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <div className="flex justify-between items-center mb-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date & Time</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Address</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pickupHistory.map((pickup) => (
                        <tr key={pickup._id || pickup.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup._id || pickup.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                            <span className="mr-2 text-xl">
                                {pickup.wasteType === 'rubber' ? ' टायर ' : ' 🗑️ '}
                            </span>{' '}
                            {pickup.wasteType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.date} | {pickup.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                              {pickup.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {pickupHistory.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No pickup history available.</p>
                  )}
                </div>
              </section>
            )}

            {activeSection === 'requestPickup' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Pickup</h2>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center py-12">
                  <p className="text-lg text-gray-700 mb-6 text-center">Ready to clear out your waste?</p>
                  <button
                    onClick={() => setIsNewPickupModalOpen(true)}
                    className="bg-[#1ABC9C] hover:bg-[#17A69B] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    New Pickup Request
                  </button>
                </div>
              </section>
            )}

            {activeSection === 'helpSupport' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Help & Support</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700 mb-4">
                    Need assistance? Our support team is here to help you.
                  </p>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      For immediate assistance, please call us: <a href="tel:+233241234567" className="text-teal-600 hover:underline font-medium">+233 24 123 4567</a>
                    </p>
                    <p className="text-gray-700">
                      You can also send us an email: <a href="mailto:support@recycylemate.com" className="text-teal-600 hover:underline font-medium">support@recycylemate.com</a>
                    </p>
                    <p className="text-gray-700">
                      For common questions, check out our <button onClick={() => navigate('/contact-us')} className="text-teal-600 hover:underline font-medium">Contact Us page FAQ section</button>.
                    </p>
                    <p className="text-gray-700">
                      Our support hours are Monday - Friday, 9 AM - 5 PM GMT.
                    </p>
                  </div>
                </div>
              </section>
            )}

          </main>
        </div>
      </div>
      <RecycleMateFooter />

      {/* New Pickup Modal */}
      {isNewPickupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Schedule New Pickup</h2>
            <form onSubmit={handleNewPickupSubmit} className="space-y-4">
              <div>
                <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                <select
                  id="wasteType"
                  name="wasteType"
                  value={newPickupData.wasteType}
                  onChange={handleNewPickupChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  required
                >
                  <option value="">Select Waste Type</option>
                  <option value="organic">Organic</option>
                  <option value="rubber">Rubber</option>
                  <option value="plastic">Plastic</option>
                  <option value="glass">Glass</option>
                  <option value="metal">Metal</option>
                  <option value="paper">Paper</option>
                  <option value="e-waste">E-Waste</option>
                  <option value="hazardous">Hazardous Waste</option>
                  <option value="textile">Textile Waste</option>
                  <option value="general">General Waste</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location (e.g., Lake Side)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newPickupData.location}
                  onChange={handleNewPickupChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="e.g., Lake side"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newPickupData.date}
                  onChange={handleNewPickupChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  min={new Date().toISOString().split('T')[0]} // Prevents selecting past dates
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={newPickupData.time}
                  onChange={handleNewPickupChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewPickupModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1ABC9C] text-white rounded-md hover:bg-[#17A69B] transition"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Schedule Pickup'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}