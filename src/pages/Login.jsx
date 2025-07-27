import { useState } from 'react'; // No need for useEffect or useRef with this approach
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import RecycleMateNavbar from '../components/Navbar';
import RecycleMateFooter from '../components/Footer';
import { apiClient } from '../../api/client';

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
        // Clear error for the field as user types
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [prevErrors[name]]: '', // This line had a minor bug: should be errors[name]
                [name]: '', // Corrected line
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

    const handleLogin = async (url, role) => {
        try {
            const response = await apiClient.post(url, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200 && response.data) {
                const userData = response.data.user || response.data.collector || response.data.admin;
                const token = response.data.token;

                if (userData && token) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);

                    console.log(`Login successful as ${role}:`, userData);
                    toast.success(`Login successful as a ${role}!`);

                    // Redirect immediately based on the actual role
                    if (role === 'user') {
                        navigate('/user-dashboard');
                    } else if (role === 'admin') {
                        navigate('/admin-dashboard');
                    } else if (role === 'collector') {
                        navigate('/collector-dashboard');
                    }
                    
                    // Return true to signal successful login AND navigation
                    // This will cause the handleSubmit to return immediately
                    return true; 
                }
            }
            return false; // Indicate unsuccessful login (e.g., unexpected response structure)
        } catch (error) {
            console.error(`Login failed for ${role}:`, error);
            // We don't show a toast here for 400 errors, as it might be a valid attempt for another role.
            // A generic error will be shown if all attempts fail in handleSubmit.
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            console.log('Attempting to log in with:', formData);

            let loggedIn = false;

            // Attempt login as User
            loggedIn = await handleLogin('/users/login', 'user');
            if (loggedIn) {
                setIsSubmitting(false); // Crucial: set to false before returning
                return; // Stop further attempts if logged in and navigated
            }

            // Attempt login as Collector if User login failed
            loggedIn = await handleLogin('/collectors/login', 'collector');
            if (loggedIn) {
                setIsSubmitting(false); // Crucial: set to false before returning
                return; // Stop further attempts if logged in and navigated
            }

            // Attempt login as Admin if Collector login failed
            loggedIn = await handleLogin('/admins/login', 'admin');
            if (loggedIn) {
                setIsSubmitting(false); // Crucial: set to false before returning
                return; // Stop further attempts if logged in and navigated
            }

            // If none of the above succeeded
            setIsSubmitting(false); // Set to false here if no login was successful
            toast.error('Login failed. Please check your credentials and try again.');
        } else {
            console.log('Form has errors:', errors);
            toast.error('Please correct the form errors before submitting.'); // More descriptive error for form validation
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

            <RecycleMateFooter />
        </div>
    );
}