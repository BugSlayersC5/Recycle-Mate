import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar'; // Corrected import name and path
import Footer from '../components/Footer'; // Corrected import name and path

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-gray-100">
      <Navbar /> {/* Using the Navbar component */}

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>
          <p className="text-center text-gray-600 mb-8">Sign up to get started</p>

          <form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-3 rounded-md shadow-md transition duration-300"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to= {"/login"} className="font-medium text-[#1ABC9C] hover:text-teal-600">
                Login
              </Link>
            </p>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer /> {/* Using the Footer component */}
    </div>
  );
}
