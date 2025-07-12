import React, { useState } from 'react';

export default function RecycleMateNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center py-2">
        {/* Logo/App Name */}
        <div className="text-[#1ABC9C] text-2xl font-bold">
          RecycleMate
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-[#1ABC9C] focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links (Centered) */}
        {/* Using flex-grow and justify-center to push links to the center */}
        <div className="hidden md:flex flex-grow justify-center items-center space-x-6">
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Home</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">How It Works</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Features</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Team</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Contact</a>
        </div>

        {/* Desktop Action Buttons (Right-aligned) */}
        <div className="hidden md:flex items-center space-x-4"> {/* Adjusted space-x for buttons */}
          <a href="#" className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300">
            Sign Up
          </a>
          <a href="#" className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300">
            Login
          </a>
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition-colors duration-300">
            Book a Pickup
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 space-y-4 flex flex-col items-center">
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Home</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">How It Works</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Features</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Team</a>
          <a href="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Contact</a>
          <a href="#" className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300 w-full text-center">
            Sign Up
          </a>
          <a href="#" className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300 w-full text-center">
            Login
          </a>
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 w-full">
            Book a Pickup
          </button>
        </div>
      )}
    </nav>
  );
}
