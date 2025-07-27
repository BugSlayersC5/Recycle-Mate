import React, { useState } from 'react';
import { Link } from "react-router";

export default function RecycleMateNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-2 px-4">
      <div className="container mx-auto flex justify-between items-center py-2">
        {/* Logo/App Name */}
        <Link to={"/"} className="text-[#1ABC9C] text-2xl font-bold">
          RecycleMate
        </Link>

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
          <Link to="/" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Home</Link>
          <Link to="/features" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Features</Link>
          <Link to="/best-practices" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Best Practices</Link>
          <Link to="/contact-us" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300">Contact</Link>
        </div>

        {/* Desktop Action Buttons (Right-aligned) */}
        <div className="hidden md:flex items-center space-x-4"> {/* Adjusted space-x for buttons */}
          <Link to= {"/signup"} className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300">
            Sign Up
          </Link>
          <Link to= {"/login"} className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300">
            login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 space-y-4 flex flex-col items-center">
          <Link to="/" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Home</Link>
          {/* <Link to ="#" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">How It Works</Link> */}
          <Link to ="/features" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Features</Link>
          <a href="/best-practices" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Best Practices</a>
          <Link to="/contact-us" className="text-[#1ABC9C] font-medium hover:text-gray-700 transition-colors duration-300 w-full text-center py-2">Contact Us</Link>
          <Link to="/Register" className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300 w-full text-center">
            Sign Up
          </Link>
          <Link to="/Login" className="text-[#1ABC9C] font-medium py-2 px-5 rounded-md border border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-300 w-full text-center">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
