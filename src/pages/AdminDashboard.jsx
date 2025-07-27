import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import RecycleMateFooter from '../components/Footer';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [users, setUsers] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateCollectorModalOpen, setIsCreateCollectorModalOpen] = useState(false);

  // State for new collector form
  const [newCollectorData, setNewCollectorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Function to get token from localStorage
  const getToken = () => localStorage.getItem('token');
  const getUserRole = () => localStorage.getItem('role');

  // --- API Call Functions ---

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token || getUserRole() !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://recyclemate-api.onrender.com/api/v1/admins/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users.');
      }

      const data = await response.json();
      setUsers(data.users || data); // Adjust based on actual API response structure
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Error fetching users.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all collectors
  const fetchCollectors = async () => {
    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token || getUserRole() !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://recyclemate-api.onrender.com/api/v1/admins/collectors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch collectors.');
      }

      const data = await response.json();
      setCollectors(data.collectors || data); // Adjust based on actual API response structure
    } catch (err) {
      console.error('Error fetching collectors:', err);
      setError(err.message || 'Error fetching collectors.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new collector
  const handleCreateCollector = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token || getUserRole() !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setLoading(false);
      navigate('/login');
      return;
    }

    if (!newCollectorData.firstName || !newCollectorData.lastName || !newCollectorData.email || !newCollectorData.password) {
      setError('All fields are required to create a collector.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://recyclemate-api.onrender.com/api/v1/admins/collectors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newCollectorData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create collector.');
      }

      // No response body for success as per endpoint description, just status 201
      alert('Collector created successfully!');
      setIsCreateCollectorModalOpen(false);
      setNewCollectorData({ firstName: '', lastName: '', email: '', password: '' });
      fetchCollectors(); // Refresh collector list
      setActiveSection('manageCollectors'); // Switch to collector management view
    } catch (err) {
      console.error('Error creating collector:', err);
      setError(err.message || 'Error creating collector.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token || getUserRole() !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://recyclemate-api.onrender.com/api/v1/admins/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user.');
      }

      alert('User deleted successfully!');
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message || 'Error deleting user.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a collector
  const handleDeleteCollector = async (collectorId) => {
    if (!window.confirm('Are you sure you want to delete this collector? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token || getUserRole() !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://recyclemate-api.onrender.com/api/v1/admins/collectors/${collectorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete collector.');
      }

      alert('Collector deleted successfully!');
      fetchCollectors(); // Refresh collector list
    } catch (err) {
      console.error('Error deleting collector:', err);
      setError(err.message || 'Error deleting collector.');
    } finally {
      setLoading(false);
    }
  };

  // Approve a collector
  const handleApproveCollector = async (collectorId) => {
    if (!window.confirm('Are you sure you want to approve this collector?')) {
      return;
    }

    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token || getUserRole() !== 'admin') {
      setError('Unauthorized access. Please log in as an admin.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://recyclemate-api.onrender.com/api/v1/admins/collectors/${collectorId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to approve collector.');
      }

      const result = await response.json(); // API returns a collector object
      alert(`Collector ${result.collector.firstName} ${result.collector.lastName} approved successfully!`);
      fetchCollectors(); // Re-fetch collectors to update their approval status in the UI
    } catch (err) {
      console.error('Error approving collector:', err);
      setError(err.message || 'Error approving collector.');
    } finally {
      setLoading(false);
    }
  };


  // --- Effects for Data Fetching ---
  useEffect(() => {
    if (activeSection === 'overview' || activeSection === 'manageUsers') {
      fetchUsers();
    }
  }, [activeSection]); // Fetch users when changing to relevant sections

  useEffect(() => {
    if (activeSection === 'overview' || activeSection === 'manageCollectors') {
      fetchCollectors();
    }
  }, [activeSection]); // Fetch collectors when changing to relevant sections


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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
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
              {/* Add Collector option */}
              <li>
                <button
                  onClick={() => setIsCreateCollectorModalOpen(true)}
                  className="w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center hover:bg-yellow-100 text-yellow-700"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 10a4 4 0 00-4-4H4a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4v-4z"></path></svg>
                  Create Collector
                </button>
              </li>
              <hr className="my-2 border-gray-200" /> {/* Separator */}
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
          <main className="flex-1">
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
                  {/* Potentially add more stats here, e.g., active pickups */}
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Admins Logged In (Mock)</h3>
                    <p className="text-4xl font-bold text-gray-600">1</p>
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
                        {users.slice(0, 5).map((user) => ( // Show recent 5 users
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
                        {collectors.slice(0, 5).map((collector) => ( // Show recent 5 collectors
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
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900 ml-4"
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
                <h2 className="2xl font-bold text-gray-800 mb-4">Manage Collectors</h2>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(collector.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {!collector.isApproved && (
                              <button
                                onClick={() => handleApproveCollector(collector.id)}
                                className="text-teal-600 hover:text-teal-900 mr-4"
                              >
                                Approve
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteCollector(collector.id)}
                              className="text-red-600 hover:text-red-900"
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

            {/* --- Help & Support Section (Admin Version) --- */}
            {activeSection === 'adminHelpSupport' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Help & Support</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700 mb-4">
                    As an administrator, you have enhanced support options.
                  </p>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      For critical system issues, please contact our dedicated admin line: <a href="tel:+233241234567" className="text-teal-600 hover:underline font-medium">+233 24 123 4567</a>
                    </p>
                    <p className="text-gray-700">
                      Email our admin support team: <a href="mailto:admin.support@recycylemate.com" className="text-teal-600 hover:underline font-medium">admin.support@recycylemate.com</a>
                    </p>
                    <p className="text-gray-700">
                      Refer to the Admin Documentation for detailed guides on managing users and collectors.
                    </p>
                    <p className="text-700">
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

      {/* --- Create Collector Modal --- */}
      {isCreateCollectorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Collector</h2>
            <form onSubmit={handleCreateCollector} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={newCollectorData.firstName}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="Kweku"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={newCollectorData.lastName}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="Frimpong"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newCollectorData.email}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="frimpongk@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newCollectorData.password}
                  onChange={handleNewCollectorChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="Enter a strong password"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateCollectorModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1ABC9C] text-white rounded-md hover:bg-[#17A69B] transition"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Collector'}
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