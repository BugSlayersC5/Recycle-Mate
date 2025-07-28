import React from "react";
import { Link } from "react-router"; // Assuming you use react-router-dom for navigation

export default function RecycleMateFooter() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-[#1ABC9C] text-white py-12 px-4 rounded-t-lg shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          {/* Company Info / Logo (Top-Left or Center on Mobile) */}
          <div className="flex flex-col items-center md:items-start md:col-span-2 lg:col-span-1">
            {/* Replace with your actual logo component or image */}
            <Link to="/" className="text-3xl font-bold text-white hover:text-gray-100 transition-colors duration-300 mb-2">
              RecycleMate
            </Link>
            <p className="text-sm text-gray-100 leading-relaxed max-w-xs">
              Connecting communities for a cleaner planet. Empowering sustainable living through efficient waste collection.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-50">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/book-pickup" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  Book Pickup
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources Section (New) */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-50">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:underline transition-colors duration-300 text-gray-100 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons Section */}
          <div className="md:justify-self-end"> {/* Aligns to the right on medium screens and up */}
            <h4 className="text-xl font-semibold mb-4 text-gray-50">Connect With Us</h4>
            <div className="flex justify-center md:justify-start space-x-5"> {/* Increased space-x for visual breathing room */}
              {/* Facebook Icon */}
              <a
                href="https://facebook.com/your-page"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="text-white hover:text-gray-200 transform hover:scale-110 transition-transform duration-300"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Instagram Icon */}
              <a
                href="https://instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-white hover:text-gray-200 transform hover:scale-110 transition-transform duration-300"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.17 0-3.548.012-4.796.07-1.038.048-1.604.223-1.98.374a3.902 3.902 0 0 0-1.42.928 3.902 3.902 0 0 0-.928 1.42c-.15.376-.326.942-.374 1.98-.058 1.248-.07 1.626-.07 4.796s.012 3.548.07 4.796c.048 1.038.223 1.604.374 1.98.205.514.52.977.928 1.42a3.902 3.902 0 0 0 1.42.928c.376.15.942.326 1.98.374 1.248.058 1.626.07 4.796.07s3.548-.012 4.796-.07c1.038-.048 1.604-.223 1.98-.374a3.902 3.902 0 0 0 1.42-.928 3.902 3.902 0 0 0 .928-1.42c.15-.376.326-.942.374-1.98.058-1.248.07-1.626.07-4.796s-.012-3.548-.07-4.796c-.048-1.038-.223-1.604-.374-1.98a3.902 3.902 0 0 0-.928-1.42 3.902 3.902 0 0 0-1.42-.928c-.376-.15-.942-.326-1.98-.374-1.248-.058-1.626-.07-4.796-.07zm0 4.838a5.162 5.162 0 1 1 0 10.324 5.162 5.162 0 0 1 0-10.324zm0 1.837a3.324 3.324 0 1 0 0 6.648 3.324 3.324 0 0 0 0-6.648zm6.406-3.095a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                </svg>
              </a>
              {/* LinkedIn Icon */}
              <a
                href="https://linkedin.com/company/your-company"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="text-white hover:text-gray-200 transform hover:scale-110 transition-transform duration-300"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white border-opacity-30 mt-10 pt-6 text-center text-sm text-gray-100">
          &copy; {currentYear} RecycleMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}