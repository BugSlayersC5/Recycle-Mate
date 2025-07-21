import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// New Pickup Modal Component
function NewPickupModal({ isOpen, onClose, onSubmit }) {
  const [pickupData, setPickupData] = useState({
    pickupType: '',
    customerName: '',
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
      customerName: '',
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Schedule New Pickup</h2>

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
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={pickupData.customerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
              placeholder="Enter customer's name"
            />
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
              Create Pickup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// FAQ Item Component for Help & Contact Section
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


export default function CollectorDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard'); // State to manage active main content section
  const [isNewPickupModalOpen, setIsNewPickupModalOpen] = useState(false);

  // Dummy data for collector information
  const [collector, setCollector] = useState({
    name: 'Emmanuel Owusu',
    email: 'emmanuel.o@example.com',
    avatar: 'https://placehold.co/80x80/1ABC9C/FFFFFF?text=EO',
  });

  // Dummy data for current pickup requests
  const [currentPickups, setCurrentPickups] = useState([
    {
      id: '#024',
      status: 'Scheduled',
      scheduledDateTime: 'August 2, 2025 | 10:00 AM',
      address: '223 Green Street, Kasoa City',
      description: '3 bags of plastic, 1 bag of paper',
      estimatedWeight: '15 kg',
      notes: 'Ring doorbell, available after 9 AM.',
      userContact: '+233 24 123 4567'
    },
    {
      id: '#106',
      status: 'In Progress',
      scheduledDateTime: 'August 2, 2025 | 1:00 PM',
      address: '456 Oak Avenue, Spintex, Accra',
      description: 'Mixed recyclables, 2 large boxes',
      estimatedWeight: '20 kg',
      notes: 'Gate code #2345',
      userContact: '+233 55 987 6543'
    },
  ]);

  // Dummy data for pickup history
  const [pickupHistory, setPickupHistory] = useState([
    { id: '#1187', date: 'May 5, 2025', materials: 'Plastic, Paper', weight: '4.5 kg', points: '45', status: 'Completed' },
    { id: '#1176', date: 'May 1, 2025', materials: 'Glass, Metal', weight: '1.8 kg', points: '18', status: 'Completed' },
    { id: '#1180', date: 'Apr 28, 2025', materials: 'Paper, Cardboard', weight: '7.3 kg', points: '73', status: 'Completed' },
    { id: '#1182', date: 'Apr 17, 2025', materials: 'Plastic, Glass', weight: '1.3 kg', points: '13', status: 'Completed' },
  ]);

  // Dummy data for recycling impact stats
  const [impactStats, setImpactStats] = useState({
    totalPickups: 24,
    totalWeight: 128.5, // in kg
    customersServed: 18, // New stat
    co2Saved: 250, // in kg
    pointsEarned: 1285,
  });

  // Dummy FAQs
  const faqs = [
    { question: "How do I mark a pickup as completed?", answer: "Navigate to the 'Pickup Requests' section, find the pickup, and click the 'Mark as Completed' button." },
    { question: "What if I can't find the customer's location?", answer: "Use the 'Contact User' button on the pickup request card to get in touch with the customer directly." },
    { question: "How are recycling points calculated?", answer: "Points are calculated based on the type and estimated weight of materials collected. More details are available in the 'Recycling Statistics' section." },
    { question: "Can I reschedule a pickup?", answer: "Currently, rescheduling is handled by the admin. Please contact support for assistance with rescheduling." },
  ];

  // State for contact form
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

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800'; // Dull amber for scheduled
      case 'In Progress':
        return 'bg-amber-100 text-amber-800'; // Another amber shade for in progress
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreatePickup = (newPickupData) => {
    console.log('New pickup created:', newPickupData);
    // In a real app, you would send this data to your backend
    // For now, let's add it to currentPickups for display
    const newPickupId = `#${Math.floor(Math.random() * 1000) + 100}`; // Simple ID generation
    setCurrentPickups((prevPickups) => [
      ...prevPickups,
      {
        id: newPickupId,
        status: 'Scheduled',
        scheduledDateTime: new Date(newPickupData.pickupDateTime).toLocaleString(),
        address: newPickupData.pickupLocation,
        description: `${newPickupData.pickupType} waste`,
        estimatedWeight: 'N/A', // Or derive from type
        notes: newPickupData.specialInstructions,
        userContact: 'N/A' // Placeholder
      }
    ]);
    setIsNewPickupModalOpen(false); // Close modal
    alert('Pickup request successfully added!');
  };

  const handleMarkAsCompleted = (pickupId) => {
    setCurrentPickups((prevPickups) =>
      prevPickups.filter((p) => p.id !== pickupId)
    );
    // Optionally, add to history or update stats
    alert(`Pickup ${pickupId} marked as completed!`);
  };

  const handleCancelPickup = (pickupId) => {
    setCurrentPickups((prevPickups) =>
      prevPickups.filter((p) => p.id !== pickupId)
    );
    alert(`Pickup ${pickupId} cancelled.`);
  };


  return (
    <div className="min-h-screen flex flex-col font-inter bg-gray-50">
      {/* Navbar */}
      {/* <Navbar /> */}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col sticky top-0 h-screen overflow-y-auto"> {/* Changed background to white */}
          <div className="flex flex-col items-center mb-8">
            <img src={collector.avatar} alt="Collector Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-[#1ABC9C] mb-3" /> {/* Border remains turquoise green */}
            <h3 className="text-xl font-semibold text-gray-800">{collector.name}</h3> {/* Text color adjusted for white background */}
            <p className="text-sm text-gray-600">{collector.email}</p> {/* Text color adjusted for white background */}
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
                  onClick={() => setActiveSection('pickupRequests')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'pickupRequests' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                  Pickup Requests
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('recyclingStats')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'recyclingStats' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h7m-7 0H5m7 0h7m-7 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3-6V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0h7m-7 0h7m-7 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0h7m-7 0h7m-7 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6"></path></svg>
                  Recycling Statistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('helpContact')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'helpContact' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012 10.77v.058a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                  Help & Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/login'); }} // Redirect to login page
                  className="flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200 hover:bg-teal-50 text-gray-700 mt-4"
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Log Out
                </button>
              </li>
            </ul>
          </nav>

          {/* Removed the "Drop off locations &" section as requested */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Collector's Dashboard</h1>

          {/* New Pickup Button - This is the primary one */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsNewPickupModalOpen(true)}
              className="bg-[#1ABC9C] hover:bg-[#17A69B] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 flex items-center"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              New Pickup
            </button>
          </div>

          {/* Render Active Section */}
          {activeSection === 'dashboard' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
              {/* Current Pickup Requests - Displayed as part of Dashboard Overview */}
              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Current Pickup Requests</h2>
                  {/* Removed the duplicate "+ New Pickup" button from here */}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentPickups.map((pickup) => (
                    <div key={pickup.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">Pickup {pickup.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(pickup.status)}`}>
                          {pickup.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Scheduled: {pickup.scheduledDateTime}</p>
                      <p className="text-sm text-gray-700 mb-2 font-medium">Address: {pickup.address}</p>
                      <p className="text-sm text-gray-700 mb-2">Description: {pickup.description}</p>
                      <p className="text-sm text-gray-700 mb-4">Est. Weight: {pickup.estimatedWeight}</p>
                      <p className="text-sm text-gray-700 italic mb-4">Notes: {pickup.notes}</p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleMarkAsCompleted(pickup.id)}
                          className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                        >
                          Mark as Picked
                        </button>
                        <a href={`tel:${pickup.userContact}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                          Contact User
                        </a>
                        <button
                          onClick={() => handleCancelPickup(pickup.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pickup History */}
              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Pickup History</h2>
                  <button className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
                    View All
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materials</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points Earned</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pickupHistory.map((pickup) => (
                        <tr key={pickup.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.materials}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.weight}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.points}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                              {pickup.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Your Recycling Impact */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recycling Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Pickups</h3>
                    <p className="text-4xl font-bold text-[#1ABC9C]">{impactStats.totalPickups}</p>
                    <p className="text-sm text-gray-500">+{impactStats.totalPickups * 0.05} this month</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Weight Recycled</h3>
                    <p className="text-4xl font-bold text-yellow-500">{impactStats.totalWeight} kg</p>
                    <p className="text-sm text-gray-500">+8% from last month</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Customers Served</h3>
                    <p className="text-4xl font-bold text-[#1ABC9C]">{impactStats.customersServed}</p>
                    <p className="text-sm text-gray-500">New customers this month</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">CO2 Saved</h3>
                    <p className="text-4xl font-bold text-yellow-500">{impactStats.co2Saved} kg</p>
                    <p className="text-sm text-gray-500">+5% from last month</p>
                  </div>
                </div>
              </section>
            </section>
          )}

          {activeSection === 'pickupRequests' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Pickup Requests</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentPickups.map((pickup) => (
                  <div key={pickup.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">Pickup {pickup.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(pickup.status)}`}>
                        {pickup.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Scheduled: {pickup.scheduledDateTime}</p>
                    <p className="text-sm text-gray-700 mb-2 font-medium">Address: {pickup.address}</p>
                    <p className="text-sm text-gray-700 mb-2">Description: {pickup.description}</p>
                    <p className="text-sm text-gray-700 mb-4">Est. Weight: {pickup.estimatedWeight}</p>
                    <p className="text-sm text-gray-700 italic mb-4">Notes: {pickup.notes}</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleMarkAsCompleted(pickup.id)}
                        className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                      >
                        Mark as Picked
                      </button>
                      <a href={`tel:${pickup.userContact}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        Contact User
                      </a>
                      <button
                        onClick={() => handleCancelPickup(pickup.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {currentPickups.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No current pickup requests.</p>
              )}
            </section>
          )}

          {activeSection === 'recyclingStats' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recycling Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Pickups Completed</h3>
                  <p className="text-5xl font-bold text-[#1ABC9C]">{impactStats.totalPickups}</p>
                  <p className="text-sm text-gray-500">+{impactStats.totalPickups * 0.05} this month</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Weight Recycled</h3>
                  <p className="text-5xl font-bold text-yellow-500">{impactStats.totalWeight} kg</p>
                  <p className="text-sm text-gray-500">+{Math.round(impactStats.totalWeight * 0.08)} kg this month</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Customers Served</h3>
                  <p className="text-5xl font-bold text-[#1ABC9C]">{impactStats.customersServed}</p>
                  <p className="text-sm text-gray-500">New customers this month</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress Overview</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 mb-1">Pickups Completed: {impactStats.totalPickups} / 50</p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-[#1ABC9C] h-4 rounded-full"
                        style={{ width: `${(impactStats.totalPickups / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-1">Weight Recycled: {impactStats.totalWeight} kg / 200 kg</p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-yellow-500 h-4 rounded-full"
                        style={{ width: `${(impactStats.totalWeight / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'helpContact' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Help & Contact</h2>

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
                    className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* New Pickup Modal */}
      <NewPickupModal
        isOpen={isNewPickupModalOpen}
        onClose={() => setIsNewPickupModalOpen(false)}
        onSubmit={handleCreatePickup}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
