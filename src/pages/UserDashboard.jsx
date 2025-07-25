import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import Footer from '../components/Footer';

// New Pickup Request Modal Component
function NewPickupRequestModal({ isOpen, onClose, onSubmit }) {
  const [pickupData, setPickupData] = useState({
    pickupType: '',
    pickupDateTime: '',
    pickupLocation: '',
    specialInstructions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPickupData((prevData) => ({ ...prevData, [name]: value }));
  };





  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pickupData);
    setPickupData({ // Reset form after submission
      pickupType: '',
      pickupDateTime: '',
      pickupLocation: '',
      specialInstructions: '',
    });
  };

  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold">
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">New Pickup Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pickupType" className="block text-sm font-medium text-gray-700 mb-1">Pickup Type</label>
            <select
              id="pickupType"
              name="pickupType"
              value={pickupData.pickupType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
            >
              <option value="">Select Type</option>
              <option value="Regular">Regular</option>
              <option value="Bulk">Bulk</option>
              <option value="Hazardous">Hazardous</option>
            </select>
          </div>

          <div>
            <label htmlFor="pickupDateTime" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date & Time</label>
            <input
              type="datetime-local"
              id="pickupDateTime"
              name="pickupDateTime"
              value={pickupData.pickupDateTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={pickupData.pickupLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
              placeholder="Enter pickup address"
            />
          </div>

          <div>
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={pickupData.specialInstructions}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
              placeholder="e.g., Leave at back gate, available after 5 PM"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-amber-500 text-amber-500 font-semibold hover:bg-amber-50 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
            >
              Submit Pickup Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// FAQ Item Component (reusable)
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-gray-800 hover:text-[#1ABC9C] transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isNewPickupModalOpen, setIsNewPickupModalOpen] = useState(false);

  // Dummy User Data
  const [userProfile, setUserProfile] = useState({
    name: 'Jessica Aning',
    email: 'jessica.a@example.com',
    phone: '+233 24 123 4567',
    avatar: 'https://placehold.co/80x80/FFD700/FFFFFF?text=JA', // Amber for user avatar
  });

  // Dummy Pickup History Data
  const [pickupHistory, setPickupHistory] = useState([
    { id: '#001', type: 'Regular', date: 'Jul 15, 2025', time: '10:00 AM', status: 'Completed', address: '123 Main St, Accra', icon: '♻️' },
    { id: '#002', type: 'Bulk', date: 'Jul 20, 2025', time: '02:30 PM', status: 'Pending', address: '456 Oak Ave, Kumasi', icon: '📦' },
    { id: '#003', type: 'Hazardous', date: 'Jul 22, 2025', time: '09:00 AM', status: 'In Progress', address: '789 Pine Ln, Tema', icon: '☢️' },
    { id: '#004', type: 'Regular', date: 'Jul 12, 2025', time: '04:00 PM', status: 'Completed', address: '101 Cedar Rd, Takoradi', icon: '♻️' },
  ]);

  // Dummy FAQs
  const faqs = [
    { question: "How do I schedule a pickup?", answer: "Navigate to the 'Request Pickup' section and click the 'New Pickup Request' button to fill out the form." },
    { question: "What should I do if my pickup was missed?", answer: "Please contact support via the 'Help & Support' section, providing your pickup ID and details." },
    { question: "How can I change my password?", answer: "Go to 'Account Settings', and you will find fields to update your password there." },
    { question: "What types of waste do you collect?", answer: "We collect Regular (plastics, paper, glass), Bulk (large items like furniture), and Hazardous (batteries, electronics) waste. Please specify when requesting." },
  ];

  // State for Account Settings form
  const [accountSettingsForm, setAccountSettingsForm] = useState(userProfile);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Update account settings form when userProfile changes
  useEffect(() => {
    setAccountSettingsForm(userProfile);
  }, [userProfile]);

  const handleAccountSettingsChange = (e) => {
    const { name, value } = e.target;
    setAccountSettingsForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    // In a real app, you'd send currentPassword, newPassword to backend for validation and update
    console.log('Password change attempt:', { currentPassword, newPassword });
    alert('Password change simulated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleSaveProfileChanges = (e) => {
    e.preventDefault();
    // In a real app, send accountSettingsForm to backend
    setUserProfile(accountSettingsForm); // Update local state for demonstration
    alert('Profile changes saved successfully!');
  };

  // State for Contact Form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Your message has been sent to support!');
    setContactForm({ name: '', email: '', message: '' }); // Clear form
  };

  // Helper function to get status badge color (consistent with other dashboards)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewPickupSubmit = (data) => {
    console.log('New pickup request submitted:', data);
    const newId = `#${String(pickupHistory.length + 1).padStart(3, '0')}`;
    const newPickup = {
      id: newId,
      type: data.pickupType,
      date: new Date(data.pickupDateTime).toLocaleDateString(),
      time: new Date(data.pickupDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
      address: data.pickupLocation,
      icon: data.pickupType === 'Regular' ? '♻️' : data.pickupType === 'Bulk' ? '📦' : '☢️',
    };
    setPickupHistory((prevHistory) => [...prevHistory, newPickup]);
    setIsNewPickupModalOpen(false);
    alert('Your pickup request has been submitted!');
  };

      const Navigate = useNavigate();


    const handleLogout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    console.log("Logout successful");

    // Redirect to login
    Navigate("/login");
  };



  return (
    <div className="min-h-screen flex flex-col font-inter bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col sticky top-0 h-screen overflow-y-auto">
          <div className="flex flex-col items-center mb-8">
            <img src={userProfile.avatar} alt="User Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-[#1ABC9C] mb-3" />
            <h3 className="text-xl font-semibold text-gray-800">{userProfile.name}</h3>
            <p className="text-sm text-gray-600">{userProfile.email}</p>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'dashboard' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7 7 7M19 14v6a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V9a1 1 0 00-1-1h-3m0 0V3a1 1 0 011-1h2a1 1 0 011 1v3m-2 0h2"></path></svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('pickupHistory')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'pickupHistory' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  Pickup History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('requestPickup')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'requestPickup' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Request Pickup
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('accountSettings')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'accountSettings' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Account Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('helpSupport')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'helpSupport' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012 10.77v.058a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                  Help & Support
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200 hover:bg-teal-50 text-gray-700 mt-4"
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">User Dashboard</h1>

          {activeSection === 'dashboard' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {userProfile.name}!</h2>

              {/* Quick Stats/Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Pickups</h3>
                  <p className="text-4xl font-bold text-[#1ABC9C]">{pickupHistory.length}</p>
                  <p className="text-sm text-gray-500">Completed & Pending</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Points Earned</h3>
                  <p className="text-4xl font-bold text-yellow-500">{(pickupHistory.filter(p => p.status === 'Completed').length * 10)}</p> {/* Dummy points */}
                  <p className="text-sm text-gray-500">Based on completed pickups</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Pickups</h3>
                  <p className="text-4xl font-bold text-amber-500">{pickupHistory.filter(p => p.status === 'Pending' || p.status === 'In Progress').length}</p>
                  <p className="text-sm text-gray-500">Awaiting collection</p>
                </div>
              </div>

              {/* Recent Pickup History (as part of Dashboard overview) */}
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
                      {pickupHistory.slice(0, 3).map((pickup) => ( // Show only recent 3 for overview
                        <tr key={pickup.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                            <span className="mr-2 text-xl">{pickup.icon}</span> {pickup.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.date} | {pickup.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                              {pickup.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.address}</td>
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
                  {/* Add search or other filters here if needed */}
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
                      <tr key={pickup.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                          <span className="mr-2 text-xl">{pickup.icon}</span> {pickup.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.date} | {pickup.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                            {pickup.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.address}</td>
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
                <p className="text-lg text-gray-700 mb-6 text-center">Ready to clear out your recyclables?</p>
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

          {activeSection === 'accountSettings' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
              <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                <form onSubmit={handleSaveProfileChanges} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={accountSettingsForm.name}
                      onChange={handleAccountSettingsChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={accountSettingsForm.email}
                      onChange={handleAccountSettingsChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={accountSettingsForm.phone}
                      onChange={handleAccountSettingsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setAccountSettingsForm(userProfile)} // Reset to original
                      className="px-6 py-2 rounded-lg border border-amber-500 text-amber-500 font-semibold hover:bg-amber-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => { setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword(''); }}
                      className="px-6 py-2 rounded-lg border border-amber-500 text-amber-500 font-semibold hover:bg-amber-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'helpSupport' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Help & Support</h2>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Support</h3>
                <form onSubmit={handleContactFormSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="contactName"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      rows="5"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                      placeholder="Describe your issue or inquiry"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* New Pickup Request Modal */}
      <NewPickupRequestModal
        isOpen={isNewPickupModalOpen}
        onClose={() => setIsNewPickupModalOpen(false)}
        onSubmit={handleNewPickupSubmit}
      />
      <Footer />
    </div>
  );
}
