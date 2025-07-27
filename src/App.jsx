import {
  createBrowserRouter,
  RouterProvider,
  Outlet, // Import Outlet for nested routes
  Navigate // Import Navigate for redirection
} from "react-router"; // Use react-router-dom

import React from 'react'; // Import React
import Home from './pages/Home';
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CollectorDashboard from "./pages/CollectorDashboard";
import PickupDetails from "./pages/PickupDetails";
import ManageUsers from "./pages/ManageUsers";
import SchedulePickup from "./pages/SchedulePickup";
import ManageCollectors from "./pages/ManageCollectors";
import NotFound from "./pages/NotFound";
import SignUpPage from "./pages/SignUpPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import CollectorSignUpPage from "./pages/CollectorSignUpPage";
import AdminInfoPage from "./pages/AdminInfoPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllPickups from "./pages/AllPickups";
import Features from "./pages/Features";
import BestPractices from "./pages/BestPractices";
import ContactUs from "./pages/ContactUs";

// ProtectedRoute Component
const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !user) {
    // If no token or user data, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // If user is logged in but doesn't have the allowed role, redirect to a forbidden page or home
    // For now, let's redirect to home or their own dashboard if they have one
    if (role === 'user') return <Navigate to="/user-dashboard" replace />;
    if (role === 'admin') return <Navigate to="/admin-dashboard" replace />;
    if (role === 'collector') return <Navigate to="/collector-dashboard" replace />;
    return <Navigate to="/" replace />; // Fallback to home
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};


const RecycleMateRouter = createBrowserRouter(
  [
    // Public Routes
    { path: '/', element: <Home /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '/signup/user', element: <UserSignUpPage /> },
    { path: '/signup/collector', element: <CollectorSignUpPage /> },
    { path: '/features', element: <Features /> },
    { path: '/best-practices', element: <BestPractices /> },
    { path: '/contact-us', element: <ContactUs /> },
    { path: '/signup/admin', element: <AdminInfoPage /> },
    { path: '/signup/admin', element: <AdminInfoPage /> },

    { path: '*', element: <NotFound /> }, // Catch-all for undefined public routes

    // Protected Routes for all logged-in users
    {
      element: <ProtectedRoute />, // This route and its children require login
      children: [
        { path: '/user-dashboard', element: <UserDashboard /> },
        { path: '/collector-dashboard', element: <CollectorDashboard /> },
        { path: '/pickup-details', element: <PickupDetails /> },
        { path: '/schedule-pickup', element: <SchedulePickup /> },
        { path: '/all-pickups', element: <AllPickups /> },
      ]
    },

    // Admin-specific Protected Routes
    {
      element: <ProtectedRoute allowedRoles={['admin']} />, // Only admins can access these
      children: [
        { path: '/admin-dashboard', element: <AdminDashboard /> },
        { path: '/manage-users', element: <ManageUsers /> },
        { path: '/manage-collectors', element: <ManageCollectors /> },
      ]
    },
  ]
);

export default function App() {
  return (
    <>
      <div>
        <RouterProvider router={RecycleMateRouter} />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}
