import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import RecycleMateNavbar from '../components/Navbar';
import RecycleMateFooter from '../components/Footer';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            console.log('Attempting to log in with:', formData);

            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

                let userRole = 'user'; // Default role

                // --- SIMULATED ROLE DETERMINATION ---
                // In a real app, your backend would return the user's actual role.
                // For demonstration, we'll assign roles based on email patterns.
                if (formData.email.includes('@admin.com')) {
                    userRole = 'admin';
                } else if (formData.email.includes('@collector.com')) {
                    userRole = 'collector';
                } else {
                    userRole = 'user'; // Any other email will be treated as a regular user
                }
                // --- END SIMULATED ROLE DETERMINATION ---

                alert(`Login successful as a ${userRole}!`); // Use a custom modal in a real app
                setFormData({ email: '', password: '' }); // Clear form data

                // Redirect based on determined role
                if (userRole === 'user') {
                    navigate('/user-dashboard');
                } else if (userRole === 'admin') {
                    navigate('/admin-dashboard');
                } else if (userRole === 'collector') {
                    navigate('/collector-dashboard');
                } else {
                    // Fallback for unexpected roles, or a general dashboard
                    navigate('/');
                }

            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please check your credentials.'); // Use a custom modal in a real app
            } finally {
                setIsSubmitting(false);
            }
        } else {
            console.log('Form has errors:', errors);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-inter bg-gray-100">
            <RecycleMateNavbar />

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
                    <p className="text-center text-gray-600 mb-8">Login to your account</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
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
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
                            className={`w-full font-semibold py-3 rounded-md shadow-md transition duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1ABC9C] hover:bg-teal-600 text-white'}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging In...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to={"/register"} className="font-medium text-[#1ABC9C] hover:text-teal-600">
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

            <RecycleMateFooter />
        </div>
    );
}
