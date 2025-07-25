import { Link } from 'react-router'; // Use react-router-dom for Link
import RecycleMateNavbar from '../components/Navbar';
import RecycleMateFooter from '../components/Footer';


export default function AdminInfoPage() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-teal-50 to-white">
<RecycleMateNavbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Account Information</h3>
          <p className="text-gray-600 mb-4">
            Admin accounts for RecycleMate are typically created and managed internally for security and system integrity.
          </p>
          <p className="text-gray-600 mb-8">
            If you believe you should have an admin account, please contact the RecycleMate support team or your system administrator for assistance.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Admins are subject to approval. You'll receive an email once your account is activated.
          </p>
          <Link
            to="/contact" // Assuming you have a contact page
            className="inline-block mt-6 bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            Contact Support
          </Link>
          <Link
            to="/signup" // Go back to role selection
            className="inline-block ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            Choose another role
          </Link>
        </div>
      </main>

      <RecycleMateFooter />
    </div>
  );
}
