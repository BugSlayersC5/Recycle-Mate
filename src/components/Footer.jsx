import React from 'react';

export default function RecycleMateFooter() {
  return (
    <footer className="bg-[#1ABC9C] text-white py-10 rounded-t-lg shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start text-center md:text-left">

          {/* Quick Links Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:underline transition-colors duration-300">Book Pickup</a></li>
              <li><a href="#" className="hover:underline transition-colors duration-300">Sign Up</a></li>
              <li><a href="#" className="hover:underline transition-colors duration-300">Login</a></li>
            </ul>
          </div>

          {/* Social Media Icons Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {/* Facebook Icon */}
              <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Instagram Icon */}
              <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.002 3.797.048.843.038 1.48.15 2.07.355.6.206 1.055.42 1.413.78s.635.813.78 1.413c.206.59.318 1.227.358 2.07.046 1.013.048 1.371.048 3.797s-.002 2.784-.048 3.797c-.038.843-.15 1.48-.355 2.07-.206.6-.42 1.055-.78 1.413s-.813.635-1.413.78c-.59.206-1.227.318-2.07.358-1.013.046-1.371.048-3.797.048s-2.784-.002-3.797-.048c-.843-.038-1.48-.15-2.07-.355-.6-.206-1.055-.42-1.413-.78s-.635-.813-.78-1.413c-.206-.59-.318-1.227-.358-2.07-.046-1.013-.048-1.371-.048-3.797s.002-2.784.048-3.797c.038-.843.15-1.48.355-2.07.206-.6.42-1.055.78-1.413s.813-.635 1.413-.78c.59-.206 1.227-.318 2.07-.358C9.537 2.002 9.89 2 12.315 2zm0 0" clipRule="evenodd" />
                </svg>
              </a>
              {/* LinkedIn Icon */}
              <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Placeholder for future content or company info */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">RecycleMate</h4>
            <p className="text-sm leading-relaxed">
              Connecting Communities for a Cleaner Planet.
            </p>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-white border-opacity-30 mt-10 pt-6 text-center text-sm text-gray-100">
          &copy; 2025 RecycleMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
