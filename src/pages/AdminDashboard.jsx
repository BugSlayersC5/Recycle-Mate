import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// User Management Modal Component
function UserManagementModal({ isOpen, onClose, user, onSave }) {
  const [userData, setUserData] = useState(user || {
    id: '',
    name: '',
    email: '',
    role: 'user', // Default role for new user
    status: 'Active' // Default status for new user
  });

  // Effect to update form data when user prop changes (for editing existing users)
  React.useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      setUserData({ id: '', name: '', email: '', role: 'user', status: 'Active' }); // Reset for new user
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold">
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{user && user.id ? 'Edit User' : 'Add New User'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
              placeholder="Enter user's name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
              placeholder="Enter user's email"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
            >
              <option value="user">User</option>
              <option value="collector">Collector</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={userData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option> {/* Added Pending status for user management */}
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard'); // State to manage active main content section
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // For editing user

  // Dummy data for admin information
  const [admin, setAdmin] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://placehold.co/80x80/1ABC9C/FFFFFF?text=AD',
  });

  // Dummy data for overview stats
  const [stats, setStats] = useState({
    totalUsers: { value: '1,254', change: '+12% from last month' },
    pendingPickups: { value: '37', change: '+5% yesterday' },
    completedPickups: { value: '845', change: '-2% from last month' },
    totalWaste: { value: '5,672', unit: 'Kg', change: '+5% last month' },
  });

  // Dummy data for user management table
  const [users, setUsers] = useState([
    { id: 'U001', name: 'Alice Smith', email: 'alice@example.com', role: 'User', status: 'Active', avatar: 'https://placehold.co/40x40/FFD700/FFFFFF?text=AS' },
    { id: 'C001', name: 'Bob Johnson', email: 'bob@collector.com', role: 'Collector', status: 'Active', avatar: 'https://placehold.co/40x40/1ABC9C/FFFFFF?text=BJ' },
    { id: 'U002', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Inactive', avatar: 'https://placehold.co/40x40/FFD700/FFFFFF?text=CB' },
    { id: 'C002', name: 'Diana Prince', email: 'diana@collector.com', role: 'Collector', status: 'Pending', avatar: 'https://placehold.co/40x40/1ABC9C/FFFFFF?text=DP' },
  ]);

  // Dummy data for recent pickup requests table
  const [recentPickups, setRecentPickups] = useState([
    { id: '#001234', user: 'Jane Smith', date: 'Jul 10, 2025', wasteType: 'Plastic', weight: '12.5', status: 'Pending', avatar: 'https://placehold.co/40x40/1ABC9C/FFFFFF?text=JS' },
    { id: '#001233', user: 'John Doe', date: 'Jul 09, 2025', wasteType: 'Paper', weight: '8.2', status: 'In Progress', avatar: 'https://placehold.co/40x40/FFD700/FFFFFF?text=JD' },
    { id: '#001232', user: 'Robert Johnson', date: 'Jul 08, 2025', wasteType: 'Compost', weight: '5.1', status: 'Completed', avatar: 'https://placehold.co/40x40/1ABC9C/FFFFFF?text=RJ' },
  ]);

  // Helper function to get status badge color (consistent with CollectorDashboard)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800'; // Consistent with CollectorDashboard
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null); // Clear previous user data for new user form
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    if (updatedUser.id) {
      // Update existing user
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      alert('User updated successfully!');
    } else {
      // Add new user
      const newId = `U${String(users.length + 1).padStart(3, '0')}`; // Simple ID generation
      setUsers((prevUsers) => [...prevUsers, { ...updatedUser, id: newId, avatar: `https://placehold.co/40x40/CCCCCC/000000?text=${updatedUser.name.charAt(0).toUpperCase()}` }]);
      alert('New user added successfully!');
    }
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      alert('User deleted!');
    }
  };

  const handleUpdatePickupStatus = (pickupId, newStatus) => {
    setRecentPickups((prevPickups) =>
      prevPickups.map((p) =>
        p.id === pickupId ? { ...p, status: newStatus } : p
      )
    );
    alert(`Pickup ${pickupId} status updated to ${newStatus}!`);
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-gray-50">
      {/* Navbar */}
      {/* <Navbar /> */}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col sticky top-0 h-screen overflow-y-auto">
          <div className="flex flex-col items-center mb-8">
            <img src={admin.avatar} alt="Admin Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-[#1ABC9C] mb-3" />
            <h3 className="text-xl font-semibold text-gray-800">{admin.name}</h3>
            <p className="text-sm text-gray-600">{admin.email}</p>
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
                  onClick={() => setActiveSection('userManagement')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'userManagement' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2H5a2 2 0 00-2 2v11a2 2 0 002 2h2v-2h10v2zM7 12h10m-10 4h10m-4-8h.01"></path></svg>
                  User Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('pickupRequests')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'pickupRequests' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                  Pickup Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('wasteCategories')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'wasteCategories' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                  Waste Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('schedules')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'schedules' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Schedules
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => setActiveSection('reports')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'reports' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h7m-7 0H5m7 0h7m-7 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3-6V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0h7m-7 0h7m-7 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6m3 0h7m-7 0h7m-7 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6"></path></svg>
                  Reports & Analytics
                </button>
              </li> */}
              {/* <li>
                <button
                  onClick={() => setActiveSection('settings')}
                  className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200
                    ${activeSection === 'settings' ? 'bg-teal-100 text-[#1ABC9C] shadow-md' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Settings
                </button>
              </li> */}
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

          {/* Removed the "Sign up tip section" for consistency with Collector Dashboard */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          {/* Render Active Section */}
          {activeSection === 'dashboard' && (
            <>
              {/* Overview Cards */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
                  <p className="text-4xl font-bold text-[#1ABC9C]">{stats.totalUsers.value}</p>
                  <p className="text-sm text-gray-500">{stats.totalUsers.change}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Pickups</h3>
                  <p className="text-4xl font-bold text-yellow-500">{stats.pendingPickups.value}</p>
                  <p className="text-sm text-gray-500">{stats.pendingPickups.change}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Pickups</h3>
                  <p className="text-4xl font-bold text-green-500">{stats.completedPickups.value}</p>
                  <p className="text-sm text-gray-500">{stats.completedPickups.change}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Waste (Kg)</h3>
                  <p className="text-4xl font-bold text-[#1ABC9C]">{stats.totalWaste.value}</p>
                  <p className="text-sm text-gray-500">{stats.totalWaste.change}</p>
                </div>
              </section>

              {/* Waste Collection by Category & Pickup Requests Trend */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-80 flex items-center justify-center text-gray-400 text-xl">
                  [Waste Collection by Category Chart]
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-80 flex items-center justify-center text-gray-400 text-xl">
                  [Pickup Requests Trend Chart]
                </div>
              </section>

              {/* Recent Pickup Requests Section (as part of Dashboard overview) */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Pickup Requests</h2>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <div className="flex justify-between items-center mb-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
                      View All
                    </button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight [kg]</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentPickups.map((pickup) => (
                        <tr key={pickup.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="w-8 h-8 rounded-full mr-2 object-cover" src={pickup.avatar} alt={pickup.user} />
                              <div className="text-sm font-medium text-gray-900">{pickup.user}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.wasteType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.weight}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                              {pickup.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleUpdatePickupStatus(pickup.id, 'Completed')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                  title="Mark as Completed"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                                <button
                                  onClick={() => handleUpdatePickupStatus(pickup.id, 'Cancelled')}
                                  className="text-red-600 hover:text-red-900"
                                  title="Cancel Pickup"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeSection === 'userManagement' && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
              <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200 w-full md:w-1/2"
                  />
                  <button
                    onClick={handleAddUser}
                    className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center ml-4"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Add User
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="w-8 h-8 rounded-full mr-2 object-cover" src={user.avatar} alt={user.name} />
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-[#1ABC9C] hover:text-teal-600 mr-3"
                            title="Edit User"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete User"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end items-center space-x-2">
                  <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100">Previous</button>
                  <span className="text-sm text-gray-700">1 / {Math.ceil(users.length / 5) || 1}</span> {/* Assuming 5 users per page */}
                  <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100">Next</button>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'pickupRequests' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Pickup Management (All Requests)</h2>
              <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
                    View All
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight [kg]</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentPickups.map((pickup) => (
                      <tr key={pickup.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="w-8 h-8 rounded-full mr-2 object-cover" src={pickup.avatar} alt={pickup.user} />
                            <div className="text-sm font-medium text-gray-900">{pickup.user}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.wasteType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                            {pickup.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleUpdatePickupStatus(pickup.id, 'Completed')}
                            className="text-green-600 hover:text-green-900 mr-3"
                            title="Mark as Completed"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          </button>
                          <button
                            onClick={() => handleUpdatePickupStatus(pickup.id, 'Cancelled')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel Pickup"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === 'wasteCategories' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Waste Categories Management</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700">Content for managing waste categories will go here. This section allows admins to add, edit, or remove different types of recyclable waste.</p>
                <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                  <li>Plastic (PET, HDPE, PVC, etc.)</li>
                  <li>Paper (Cardboard, Newspapers, Magazines)</li>
                  <li>Glass (Clear, Brown, Green)</li>
                  <li>Metal (Aluminum, Steel, Tin)</li>
                  <li>Compost (Food scraps, Yard waste)</li>
                  <li>Hazardous (Batteries, Electronics, Chemicals)</li>
                </ul>
                {/* <Link to={'/schedule-pickup'} className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mt-6">
                  Add New Category
                </Link> */}
              </div>
            </section>
          )}

          {activeSection === 'schedules' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedules Management</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700">Content for managing pickup schedules will go here. Admins can view, create, and modify collection routes and times for collectors.</p>
                <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                  <li>Daily Pickup Routes</li>
                  <li>Weekly Collection Zones</li>
                  <li>Special Event Pickups</li>
                  <li>Collector Availability</li>
                </ul>
                <Link to= {'/schedule-pickup'} className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mt-6">
                  Create New Schedule
                </Link>
              </div>
            </section>
          )}

          {activeSection === 'reports' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports & Analytics</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700">Content for reports and analytics will go here. This section provides insights into recycling trends, user activity, collector performance, and more.</p>
                <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                  <li>Monthly Waste Collection Report</li>
                  <li>User Engagement Metrics</li>
                  <li>Collector Performance Analysis</li>
                  <li>Environmental Impact Summary</li>
                </ul>
                <button className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mt-6">
                  Generate Custom Report
                </button>
              </div>
            </section>
          )}

          {activeSection === 'settings' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700">Content for application settings will go here. Admins can configure various aspects of the RecycleMate platform.</p>
                <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                  <li>User Permissions</li>
                  <li>Notification Settings</li>
                  <li>System Integrations</li>
                  <li>Data Backup & Restore</li>
                </ul>
                <button className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mt-6">
                  Save Settings
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* User Management Modal */}
      <UserManagementModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={currentUser}
        onSave={handleSaveUser}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
