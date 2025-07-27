import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { apiClient } from '../../api/client'; // Assuming apiClient is configured with interceptors

// Import common dashboard components
import RecycleMateFooter from '../components/Footer'; // Reusable footer

export default function CollectorDashboard() {
    const [activeSection, setActiveSection] = useState('assignedPickups');
    const [allPickups, setAllPickups] = useState([]); // Store all fetched pickups
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Function to get status color (re-used from UserDashboard)
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
            case 'scheduled': // Added 'scheduled' as a pending-like status
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

    // Fetch all pickups assigned to the collector
    const fetchAllCollectorPickups = async () => {
        setLoading(true);
        setError(null);
        try {
            // apiClient should automatically add the token via interceptors
            const response = await apiClient.get('/collectors/pickups');
            setAllPickups(response.data.pickups || []); // Ensure it's an array
        } catch (err) {
            console.error('Error fetching collector pickups:', err);
            setError(err.response?.data?.message || 'Failed to fetch pickups.');
            toast.error(err.response?.data?.message || 'Failed to load pickups.');
            // apiClient interceptor should handle 401 redirection, but can add here as a fallback
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    // Mark pickup as complete
    const markPickupComplete = async (pickupId) => {
        if (!window.confirm('Are you sure you want to mark this pickup as complete?')) {
            return;
        }

        try {
            await apiClient.patch(`/collectors/pickups/${pickupId}/complete`, {});
            toast.success('Pickup marked as complete!');
            // Re-fetch all pickups to update the lists
            fetchAllCollectorPickups();
        } catch (err) {
            console.error('Error marking pickup complete:', err);
            const errorMessage = err.response?.data?.message || 'Failed to mark pickup as complete. Please try again.';
            toast.error(errorMessage);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        // Fetch pickups when the component mounts or activeSection changes to relevant ones
        if (activeSection === 'overview' || activeSection === 'assignedPickups' || activeSection === 'completedPickups') {
            fetchAllCollectorPickups();
        }
    }, [activeSection]); // Depend on activeSection to re-fetch when switching views

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        toast.info('You have been logged out.');
        navigate('/login'); // Redirect to login page
    };

    // Filtered pickups for display
    const pendingPickups = allPickups.filter(
        (p) => p.status && (p.status.toLowerCase() === 'pending' || p.status.toLowerCase() === 'scheduled')
    );
    const completedPickups = allPickups.filter(
        (p) => p.status && p.status.toLowerCase() === 'completed'
    );

    return (
        <div className="min-h-screen bg-gray-100 font-inter">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md flex-shrink-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Collector Navigation</h3>
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
                                onClick={() => setActiveSection('assignedPickups')}
                                className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'assignedPickups' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                Assigned Pickups
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('completedPickups')}
                                className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'completedPickups' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Completed Pickups
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('helpSupport')}
                                className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${activeSection === 'helpSupport' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
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
                    {loading && <p className="text-center text-teal-600 text-lg py-8">Loading pickups...</p>}
                    {error && <p className="text-center text-red-500 text-lg py-8">Error: {error}</p>}

                    {!loading && !error && activeSection === 'overview' && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Assigned Pickups</h3>
                                    <p className="text-4xl font-bold text-teal-600">{allPickups.length}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-700">Pending Pickups</h3>
                                    <p className="text-4xl font-bold text-yellow-600">
                                        {pendingPickups.length}
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-700">Completed Pickups</h3>
                                    <p className="text-4xl font-bold text-green-600">
                                        {completedPickups.length}
                                    </p>
                                </div>
                            </div>

                            {/* Recent Assigned Pickups */}
                            <section className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">Recent Assigned Pickups</h2>
                                    <button
                                        onClick={() => setActiveSection('assignedPickups')}
                                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                                    >
                                        View All
                                    </button>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pendingPickups.slice(0, 3).map((pickup) => (
                                                <tr key={pickup.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                                                        {pickup.wasteType.replace(/_/g, ' ')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.location}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(pickup.date).toLocaleDateString()} | {pickup.time}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                                                            {pickup.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => markPickupComplete(pickup.id)}
                                                            className="text-teal-600 hover:text-teal-900"
                                                        >
                                                            Mark Complete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {pendingPickups.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="text-center text-gray-500 py-4">No pending pickups.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </section>
                    )}

                    {!loading && !error && activeSection === 'assignedPickups' && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Assigned Pickups</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date & Time</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Address</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pendingPickups.map((pickup) => (
                                            <tr key={pickup.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id.slice(-6)}</td> {/* Shorten ID */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                                                    {pickup.wasteType.replace(/_/g, ' ')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(pickup.date).toLocaleDateString()} | {pickup.time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                                                        {pickup.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.location}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => markPickupComplete(pickup.id)}
                                                        className="text-teal-600 hover:text-teal-900"
                                                    >
                                                        Mark Complete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {pendingPickups.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center text-gray-500 py-4">No pending pickups assigned to you.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {!loading && !error && activeSection === 'completedPickups' && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Pickups</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
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
                                        {completedPickups.map((pickup) => (
                                            <tr key={pickup.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id.slice(-6)}</td> {/* Shorten ID */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                                                    {pickup.wasteType.replace(/_/g, ' ')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(pickup.date).toLocaleDateString()} | {pickup.time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
                                                        {pickup.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pickup.location}</td>
                                            </tr>
                                        ))}
                                        {completedPickups.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="text-center text-gray-500 py-4">No completed pickups yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {!loading && !error && activeSection === 'helpSupport' && (
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
            <RecycleMateFooter />
        </div>
    );
}