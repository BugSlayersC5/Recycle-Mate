import React from 'react';
import { Link } from 'react-router';
import RecycleMateNavbar from '../components/Navbar'; // Changed import name and path
import RecycleMateFooter from '../components/Footer'; // Changed import name and path

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col font-inter bg-gray-100">
            <RecycleMateNavbar /> {/* Changed component usage */}

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
                    <p className="text-center text-gray-600 mb-8">Login to your account</p>

                    <form className="space-y-6">
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
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-900">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="font-medium text-[#1ABC9C] hover:text-teal-600">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-3 rounded-md shadow-md transition duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to={"/signup"} className="font-medium text-[#1ABC9C] hover:text-teal-600">
                                Sign Up
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

            <RecycleMateFooter /> {/* Changed component usage */}
        </div>
    );
}
