import { Link } from 'react-router'; // Use react-router-dom for Link
import RecycleMateNavbar from '../components/Navbar';
import RecycleMateFooter from '../components/Footer';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-teal-50 to-white">
      <RecycleMateNavbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Create Your Account</h2>
          <p className="text-center text-gray-600 mb-8">Choose your role to get started</p>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* User Card */}
            <Link
              to="/signup/user" // Link to the user signup page
              className="flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 duration-300 border border-gray-200 bg-amber-100"
            >
              <svg className="w-12 h-12 text-amber-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7 7 7M19 14v6a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V9a1 1 0 00-1-1h-3m0 0V3a1 1 0 011-1h2a1 1 0 011 1v3m-2 0h2"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">User</h3>
              <p className="text-sm text-gray-600 text-center mt-1">Waste Management for your home</p>
            </Link>

            {/* Collector Card */}
            <Link
              to="/signup/collector" // Link to the collector signup page
              className="flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 duration-300 border border-gray-200 bg-teal-100"
            >
              <svg className="w-12 h-12 text-[#1ABC9C] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">Collector</h3>
              <p className="text-sm text-gray-600 text-center mt-1">Waste pickup & management services</p>
            </Link>

            {/* Admin Card */}
            <Link
              to="/signup/admin" // Link to the admin info page
              className="flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 duration-300 border border-gray-200 bg-gray-100"
            >
              <svg className="w-12 h-12 text-gray-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">Admin</h3>
              <p className="text-sm text-gray-600 text-center mt-1">Manage users and collectors</p>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#1ABC9C] hover:text-teal-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <RecycleMateFooter />
    </div>
  );
}
