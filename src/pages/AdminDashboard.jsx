import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import RecycleMateFooter from '../components/Footer';
import { apiClient } from '../../api/client';
import { toast } from 'react-toastify';
import ConfirmationModal from '../components/ConfirmationModal';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [users, setUsers] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateCollectorModalOpen, setIsCreateCollectorModalOpen] = useState(false);

  const [isAssignCollectorModalOpen, setIsAssignCollectorModalOpen] = useState(false);
  const [pickupToAssign, setPickupToAssign] = useState(null);
  const [selectedCollectorId, setSelectedCollectorId] = useState('');

  const [newCollectorData, setNewCollectorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // --- State for Confirmation Modal ---
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmButtonClass: '',
    cancelButtonClass: '',
  });

  // --- API Call Functions (now using apiClient) ---

  const makeApiCall = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await apiClient.get(url);
          break;
        case 'post':
          response = await apiClient.post(url, data);
          break;
        case 'patch':
          response = await apiClient.patch(url, data);
          break;
        case 'delete':
          response = await apiClient.delete(url);
          break;
        default:
          throw new Error('Unsupported HTTP method');
      }
      return response.data;
    } catch (err) {
      console.error(`Error during API call to ${url}:`, err);
      setError(err.response?.data?.message || err.message || `An error occurred during ${method} request.`);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await makeApiCall('get', '/admins/users');
      setUsers(data.users || []);
    } catch (err) {
      // Error handled by makeApiCall and global interceptor
    }
  };

  // Fetch all collectors
  const fetchCollectors = async () => {
    try {
      const data = await makeApiCall('get', '/admins/collectors');
      setCollectors(data.collectors || []);
    } catch (err) {
      // Error handled by makeApiCall and global interceptor
    }
  };

  // Fetch all pickups
  const fetchPickups = async () => {
    try {
      const data = await makeApiCall('get', '/admins/pickups');
      setPickups(data.pickups || []);
    } catch (err) {
      // Error handled by makeApiCall and global interceptor
    }
  };

  // Create a new collector
  const handleCreateCollector = async (e) => {
    e.preventDefault();
    if (!newCollectorData.firstName || !newCollectorData.lastName || !newCollectorData.email || !newCollectorData.password) {
      setError('All fields are required to create a collector.');
      return;
    }
    try {
      await makeApiCall('post', '/admins/collectors', newCollectorData);
                toast.success('Collector created successfully!'); // Changed from alert
      setIsCreateCollectorModalOpen(false);
      setNewCollectorData({ firstName: '', lastName: '', email: '', password: '' });
      fetchCollectors();
      setActiveSection('manageCollectors');
    } catch (err) {
      // Error handled
    }
  };

  // --- Updated: Delete a user using ConfirmationModal ---
  const handleDeleteUser = (userId) => {
    setConfirmModalData({
      title: 'Confirm User Deletion',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmButtonClass: 'bg-red-600 hover:bg-red-700', // Red button for destructive action
      onConfirm: async () => {
        setIsConfirmModalOpen(false); // Close modal first
        try {
          await makeApiCall('delete', `/admins/users/${userId}`);
                          toast.success('User deleted successfully!'); 

          fetchUsers();
        } catch (err) {
          // Error handled
        }
      },
    });
    setIsConfirmModalOpen(true); // Open the confirmation modal
  };

  // --- Updated: Delete a collector using ConfirmationModal ---
  const handleDeleteCollector = (collectorId) => {
    setConfirmModalData({
      title: 'Confirm Collector Deletion',
      message: 'Are you sure you want to delete this collector? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmButtonClass: 'bg-red-600 hover:bg-red-700',
      onConfirm: async () => {
        setIsConfirmModalOpen(false);
        try {
          await makeApiCall('delete', `/admins/collectors/${collectorId}`);
          toast.success('Collector deleted successfully!'); 
          fetchCollectors();
        } catch (err) {
          // Error handled
        }
      },
    });
    setIsConfirmModalOpen(true);
  };

  // --- Updated: Approve a collector using ConfirmationModal ---
  const handleApproveCollector = (collectorId) => {
    setConfirmModalData({
      title: 'Confirm Collector Approval',
      message: 'Are you sure you want to approve this collector?',
      confirmText: 'Approve',
      cancelText: 'Cancel',
      confirmButtonClass: 'bg-green-600 hover:bg-green-700', // Green button for approval
      onConfirm: async () => {
        setIsConfirmModalOpen(false);
        try {
          const result = await makeApiCall('patch', `/admins/collectors/${collectorId}/approve`);
          // alert(`Collector ${result.collector.firstName} ${result.collector.lastName} approved successfully!`);
          toast.success(`Collector ${result.collector.firstName} ${result.collector.lastName} approved successfully!`);
          fetchCollectors();
        } catch (err) {
          // Error handled
        }
      },
    });
    setIsConfirmModalOpen(true);
  };

  // Handle opening assign collector modal
  const handleAssignCollectorClick = (pickup) => {
    setPickupToAssign(pickup);
    setSelectedCollectorId(pickup.assignedCollector?.id || '');
    setIsAssignCollectorModalOpen(true);
  };

  // Handle assigning collector to pickup
  const handleAssignCollectorSubmit = async (e) => {
  e.preventDefault();
  if (!pickupToAssign || !selectedCollectorId) {
    setError('Please select a pickup and a collector.');
    return;
  }
  console.log("Attempting to assign pickup:"); // DEBUG LOG
  console.log("Pickup ID:", pickupToAssign.id); // DEBUG LOG
  console.log("Collector ID to assign:", selectedCollectorId); // DEBUG LOG
  try {
    // Capture the response from makeApiCall into a variable
    const responseData = await makeApiCall('patch', `/admins/pickups/${pickupToAssign.id}/assign`, { collectorId: selectedCollectorId });

    console.log("Backend response after assigning collector:", responseData); // Now responseData is defined!
    toast.success('Collector assigned successfully!');
    setIsAssignCollectorModalOpen(false);
    setPickupToAssign(null);
    setSelectedCollectorId('');
    fetchPickups();
  } catch (err) {
    // Error handled
    // It's a good idea to log or display this error for debugging/user feedback
    console.error("Error assigning collector:", err);
    setError(err.message || "Failed to assign collector."); // Example of setting error for user
  }
};


  // --- Effects for Data Fetching ---
  useEffect(() => {
    if (activeSection === 'overview' || activeSection === 'manageUsers') {
      fetchUsers();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'overview' || activeSection === 'manageCollectors') {
      fetchCollectors();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'overview' || activeSection === 'managePickups') {
      fetchPickups();
    }
  }, [activeSection]);


  // Handle new collector form changes
  const handleNewCollectorChange = (e) => {
    const { name, value } = e.target;
    setNewCollectorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Logout function
const handleLogout = () => {
  // 1. Show toast notification FIRST
  toast.info('You have been logged out.'); 

  // 2. Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');

  // 3. Navigate to login page LAST
  navigate('/login');
};

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Panel</h3>
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
                  onClick={() => setActiveSection('manageUsers')}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'manageUsers' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.185-.015-.369-.045-.552C16.822 16.027 15.636 15 14 15c-1.635 0-2.821 1.027-2.955 2.448C11.015 17.631 11 17.815 11 18v2m3-1h6m-3-3l3 3-3 3"></path></svg>
                  Manage Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('manageCollectors')}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'manageCollectors' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-4m0-4h.01M9 11l3-3m-3 3l-3 3m7-7V4a1 1 0 00-1-1H4a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1v-4m-12 4h.01M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.185-.015-.369-.045-.552C16.822 16.027 15.636 15 14 15c-1.635 0-2.821 1.027-2.955 2.448C11.015 17.631 11 17.815 11 18v2m3-1h6m-3-3l3 3-3 3"></path></svg>
                  Manage Collectors
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('managePickups')}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'managePickups' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                  Manage Pickups
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCreateCollectorModalOpen(true)}
                  className="w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center hover:bg-yellow-100 text-yellow-700"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 10a4 4 0 00-4-4H4a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4v-4z"></path></svg>
                  Create Collector
                </button>
              </li>
              <hr className="my-2 border-gray-200" />
              <li>
                <button
                  onClick={() => setActiveSection('adminHelpSupport')}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'adminHelpSupport' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.295a8.995 8.995 0 013.861-1.353m-3.861 1.353c-.854.269-1.748.45-2.656.541m2.656-.541l.775 3.328m-.775-3.328L7.545 4.721M7.545 4.721C4.402 6.641 2 9.574 2 13c0 1.278.487 2.502 1.35 3.424m1.042 3.102l3.22-3.22m3.54-3.54l3.22-3.22M15 13c0 1.278-.487 2.502-1.35 3.424m1.042 3.102l3.22-3.22m3.54-3.54l3.22-3.22M12 10.95c.39-.14.799-.219 1.207-.219.504 0 .99.1 1.455.292L21 17m-1.72-2.18l-3.22-3.22m3.22 3.22a8.994 8.994 0 00-1.35-3.861c-.269-.854-.45-1.748-.541-2.656m-2.656 2.656l-3.328.775m3.328-.775L19.279 7.545M19.279 7.545C17.359 4.402 14.426 2 11 2c-1.278 0-2.502.487-3.424 1.35M5.636 5.636l3.536 3.536m0 0c-.465.192-.951.292-1.455.292-.408 0-.817-.079-1.207-.219A3.996 3.996 0 0012 10.95c.39-.14.799-.219 1.207-.219.504 0 .99.1 1.455.292l3.536 3.536"></path></svg>
                  Help & Support
                </button>
              </li>
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
          <main className="flex-1 min-w-0">
            {loading && <p className="text-center text-teal-600 text-lg">Loading...</p>}
            {error && <p className="text-center text-red-500 text-lg">Error: {error}</p>}

            {/* --- Overview Section --- */}
            {activeSection === 'overview' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                    <p className="text-4xl font-bold text-teal-600">{users.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Collectors</h3>
                    <p className="text-4xl font-bold text-yellow-600">{collectors.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Pickups</h3>
                    <p className="text-4xl font-bold text-blue-600">{pickups.length}</p>
                  </div>
                </div>

                <hr className="my-8 border-gray-200" />

                <section className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Recent Users</h2>
                    <button
                      onClick={() => setActiveSection('manageUsers')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                    >
                      View All Users
                    </button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.slice(0, 5).map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {users.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No users found.</p>
                    )}
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="2xl font-bold text-gray-800">Recent Collectors</h2>
                    <button
                      onClick={() => setActiveSection('manageCollectors')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                    >
                      View All Collectors
                    </button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {collectors.slice(0, 5).map((collector) => (
                          <tr key={collector.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{collector.firstName} {collector.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{collector.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${collector.isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {collector.isApproved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(collector.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {collectors.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No collectors found.</p>
                    )}
                  </div>
                </section>

                <section className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Recent Pickups</h2>
                    <button
                      onClick={() => setActiveSection('managePickups')}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                    >
                      View All Pickups
                    </button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collector</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pickups.slice(0, 5).map((pickup) => (
                          <tr key={pickup.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.wasteType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {pickup.date && !isNaN(new Date(pickup.date))
                                    ? new Date(pickup.date).toLocaleDateString()
                                    : 'N/A'}{' '}
                                {pickup.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${pickup.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                pickup.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                                pickup.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'}`}>
                                {pickup.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {pickup.user ? `${pickup.user.firstName} ${pickup.user.lastName}` : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {pickup.assignedCollector ? `${pickup.assignedCollector.firstName} ${pickup.assignedCollector.lastName}` : 'Not Assigned'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {pickups.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No pickups found.</p>
                    )}
                  </div>
                </section>
              </section>
            )}

            {/* --- Manage Users Section --- */}
            {activeSection === 'manageUsers' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h2>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.firstName} {user.lastName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteUser(user.id)} // Calls the new handler
                              className="text-red-600 hover:text-red-900 ml-4 cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No users found.</p>
                  )}
                </div>
              </section>
            )}

            {/* --- Manage Collectors Section --- */}
            {activeSection === 'manageCollectors' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Collectors</h2>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {collectors.map((collector) => (
                        <tr key={collector.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{collector.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{collector.firstName} {collector.lastName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{collector.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${collector.isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {collector.isApproved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {!collector.isApproved && (
                              <button
                                onClick={() => handleApproveCollector(collector.id)} // Calls the new handler
                                className="text-green-600 hover:text-green-900 mr-4 cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteCollector(collector.id)} // Calls the new handler
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {collectors.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No collectors found.</p>
                  )}
                </div>
              </section>
            )}

            {/* --- Manage Pickups Section --- */}
            {activeSection === 'managePickups' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Pickups</h2>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Collector</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pickups.map((pickup) => (
                        <tr key={pickup.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.wasteType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {pickup.date && !isNaN(new Date(pickup.date))
                                ? new Date(pickup.date).toLocaleDateString()
                                : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${pickup.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                              pickup.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                              pickup.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'}`}>
                              {pickup.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {pickup.user ? `${pickup.user.firstName} ${pickup.user.lastName}` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {pickup.assignedCollector ? `${pickup.assignedCollector.firstName} ${pickup.assignedCollector.lastName}` : 'Not Assigned'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleAssignCollectorClick(pickup)}
                              className={`
                                text-indigo-600 hover:text-indigo-900 cursor-pointer
                                ${pickup.status === 'completed' ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                              disabled={pickup.status === 'completed'}
                            >
                              {pickup.assignedCollector ? 'Re-assign' : 'Assign'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {pickups.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No pickups found.</p>
                  )}
                </div>
              </section>
            )}

            {/* --- Admin Help & Support Section --- */}
            {activeSection === 'adminHelpSupport' && (
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Help & Support</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Welcome to the RecycleMate Admin Help and Support section. Here you can find resources and contact information to assist you with managing the platform.</p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Frequently Asked Questions</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>How do I create a new collector account?</strong>
                      <p className="text-sm ml-4">Navigate to the "Create Collector" option in the sidebar. Fill in the required details and submit the form.</p>
                    </li>
                    <li><strong>How do I approve a pending collector?</strong>
                      <p className="text-sm ml-4">Go to "Manage Collectors". You will see a list of collectors, including their approval status. For pending collectors, an "Approve" button will be available next to their details. Click it to approve their account.</p>
                    </li>
                    <li><strong>What is the difference between a 'pending' and 'assigned' pickup status?</strong>
                      <p className="text-sm ml-4">A 'pending' pickup is a new request that has not yet been assigned to any collector. An 'assigned' pickup means a collector has been designated to handle that request.</p>
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Contact Support</h3>
                  <p>If you need further assistance, please reach out to our support team:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Email:</strong> <a href="mailto:support@recyclemate.com" className="text-teal-600 hover:underline">support@recyclemate.com</a></li>
                    <li><strong>Phone:</strong> +1 (234) 567-8900 (Available 9 AM - 5 PM, Mon-Fri)</li>
                  </ul>
                  <p className="mt-4">We are committed to providing you with the best possible support to ensure smooth operations of the RecycleMate platform.</p>
                </div>
              </section>
            )}

          </main>
        </div>
      </div>

      {/* Create Collector Modal */}
      {isCreateCollectorModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
          <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Collector</h3>
            <form onSubmit={handleCreateCollector} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={newCollectorData.firstName}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={newCollectorData.lastName}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newCollectorData.email}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newCollectorData.password}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreateCollectorModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Collector'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Collector Modal */}
      {isAssignCollectorModalOpen && pickupToAssign && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
          <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Assign Collector to Pickup</h3>
            <p className="text-gray-600 text-sm mb-4">
              <strong>Pickup ID:</strong> {pickupToAssign.id} <br />
              <strong>Waste Type:</strong> {pickupToAssign.wasteType} <br />
              <strong>Location:</strong> {pickupToAssign.location}
            </p>
            <form onSubmit={handleAssignCollectorSubmit} className="space-y-4">
              <div>
                <label htmlFor="collectorSelect" className="block text-sm font-medium text-gray-700">Select Collector</label>
                <select
                  id="collectorSelect"
                  value={selectedCollectorId}
                  onChange={(e) => setSelectedCollectorId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  required
                >
                  <option value="">-- Choose a Collector --</option>
                  {collectors
                    .filter(c => c.isApproved)
                    .map((collector) => (
                      <option key={collector.id} value={collector.id}>
                        {collector.firstName} {collector.lastName} ({collector.email})
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAssignCollectorModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  disabled={loading || !selectedCollectorId}
                >
                  {loading ? 'Assigning...' : 'Assign Collector'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmModalData.onConfirm}
        title={confirmModalData.title}
        message={confirmModalData.message}
        confirmText={confirmModalData.confirmText}
        cancelText={confirmModalData.cancelText}
        confirmButtonClass={confirmModalData.confirmButtonClass}
        cancelButtonClass={confirmModalData.cancelButtonClass}
      />

      <RecycleMateFooter />
    </>
  );
}