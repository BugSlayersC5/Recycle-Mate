import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState(null); // No default selection initially
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    serviceArea: '', // Collector specific
    companyName: '', // Admin specific (example)
    adminCode: '', // Admin specific (example)
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle role selection via cards
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData({ // Reset form data when role changes
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      serviceArea: '',
      companyName: '',
      adminCode: '',
    });
    setErrors({}); // Clear errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const { firstName, lastName, email, password, confirmPassword, phoneNumber, serviceArea, companyName, adminCode } = formData;

    // Common validations for User/Collector
    if (selectedRole === 'user' || selectedRole === 'collector') {
      if (!firstName) newErrors.firstName = 'First Name is required';
      if (!lastName) newErrors.lastName = 'Last Name is required';
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Collector-specific validation
    if (selectedRole === 'collector' && !serviceArea) {
      newErrors.serviceArea = 'Service Area is required for collectors';
    }

    // Admin-specific validation (if you decide to add a form for them later)
    if (selectedRole === 'admin') {
      // For now, admin is informational, so no form validation here.
      // If you add fields like companyName or adminCode, add validation here.
      // if (!companyName) newErrors.companyName = 'Company Name is required';
      // if (!adminCode) newErrors.adminCode = 'Admin Code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => { // Made handleSubmit async
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        console.log('Form submitted:', formData, 'Role:', selectedRole);
        alert(`Account created successfully as a ${selectedRole}!`); // Use a custom modal in a real app

        // Clear the form data after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          serviceArea: '',
          companyName: '',
          adminCode: '',
        });
        setErrors({}); // Also clear any lingering errors
        setSelectedRole(null); // Go back to role selection after successful signup

        // Redirect to the login page after successful signup
        navigate('/login');

      } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.'); // Use a custom modal in a real app
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form has errors:', errors);
    }
  };

  // Determine if the submit button should be disabled for user/collector forms
  const isFormValid = () => {
    if (selectedRole === 'user') {
      return formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword && !errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword;
    }
    if (selectedRole === 'collector') {
      return formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword && formData.serviceArea && !errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword && !errors.serviceArea;
    }
    return false; // For admin, there's no form to submit this way
  };


  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-teal-50 to-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"> {/* Increased max-w for better card layout */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Create Your Account</h2>
          <p className="text-center text-gray-600 mb-8">Choose your role to get started</p>

          {/* Role Selection Cards */}
          {!selectedRole && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* User Card */}
              <div
                className={`flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 duration-300
                  ${selectedRole === 'user' ? 'border-2 border-amber-500 shadow-lg' : 'border border-gray-200'}
                  bg-amber-100`} // User card background set to amber-100
                onClick={() => handleRoleSelect('user')}
              >
                <svg className="w-12 h-12 text-amber-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* User card icon text color set to amber-600 */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7 7 7M19 14v6a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V9a1 1 0 00-1-1h-3m0 0V3a1 1 0 011-1h2a1 1 0 011 1v3m-2 0h2"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">User</h3>
                <p className="text-sm text-gray-600 text-center mt-1">Waste Management for your home</p>
              </div>

              {/* Collector Card */}
              <div
                className={`flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 duration-300
                  ${selectedRole === 'collector' ? 'border-2 border-[#1ABC9C] shadow-lg' : 'border border-gray-200'}
                  bg-teal-100`} // Remains turquoise shade
                onClick={() => handleRoleSelect('collector')}
              >
                <svg className="w-12 h-12 text-[#1ABC9C] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">Collector</h3>
                <p className="text-sm text-gray-600 text-center mt-1">Waste pickup & management services</p>
              </div>

              {/* Admin Card */}
              <div
                className={`flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 duration-300
                  ${selectedRole === 'admin' ? 'border-2 border-gray-700 shadow-lg' : 'border border-gray-200'}
                  bg-gray-100`}
                onClick={() => handleRoleSelect('admin')}
              >
                <svg className="w-12 h-12 text-gray-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">Admin</h3>
                <p className="text-sm text-gray-600 text-center mt-1">Manage users and collectors</p>
              </div>
            </div>
          )}

          {/* Dynamic Form based on Role */}
          {selectedRole && (
            <div className="mt-8">
              {selectedRole === 'admin' ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Admin Account Information</h3>
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
                    to="/contact"
                    className="inline-block mt-6 bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
                  >
                    Contact Support
                  </Link>
                  <button
                    onClick={() => setSelectedRole(null)} // Go back to role selection
                    className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
                  >
                    Choose another role
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    Sign Up as a {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                  </h3>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName.trim()} // Trim whitespace for validation
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email.trim()} // Trim whitespace for validation
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200`}
                      placeholder="Create a password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters.</p>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                      placeholder="e.g., +1234567890"
                    />
                  </div>

                  {/* Collector-specific field */}
                  {selectedRole === 'collector' && (
                    <div>
                      <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700 mb-1">Location (Assigned Area/Zone)</label>
                      <input
                        type="text"
                        id="serviceArea"
                        name="serviceArea"
                        value={formData.serviceArea}
                        onChange={handleChange}
                        required={selectedRole === 'collector'} // Make required only for collectors
                        className={`w-full px-4 py-2 border ${errors.serviceArea ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200`}
                        placeholder="e.g., Downtown, North Side"
                      />
                      {errors.serviceArea && <p className="text-red-500 text-xs mt-1">{errors.serviceArea}</p>}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full font-semibold py-3 rounded-md shadow-md transition duration-300 ${isSubmitting || !isFormValid() ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-400 text-white'}`} // Updated to bg-yellow-600 and hover:bg-yellow-400
                    disabled={isSubmitting || !isFormValid()}
                  >
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                  </button>
                  <button
                    onClick={() => setSelectedRole(null)} // Go back to role selection
                    type="button" // Important: set to type="button" to prevent form submission
                    className="w-full mt-4 bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-3 rounded-md shadow-md transition duration-300" // Already turquoise green
                  >
                    Choose another role
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#1ABC9C] hover:text-teal-600">
                Login
              </Link>
            </p>
            {/* Removed "Or continue with" and Google Signup button */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
