import React, { useState } from 'react';
import { Link } from 'react-router';

export default function PickupDetailPage() {
  // Dummy data for a pickup detail
  const [pickupDetails, setPickupDetails] = useState({
    id: '#RM8921',
    status: 'Scheduled', // Can be 'Scheduled', 'In Progress', 'Completed', 'Cancelled'
    scheduledDateTime: 'August 2, 2025 | 10:00 AM',
    pickupType: 'Regular', // Can be 'Regular', 'Bulk', 'Hazardous'
    collector: {
      name: 'Emmanuel Owusu',
      avatar: 'https://placehold.co/40x40/1ABC9C/FFFFFF?text=EO',
      phone: '+233 24 123 4567',
      email: 'emmanuel.o@example.com',
    },
    location: {
      address: 'House No. 21, Adenta, Accra',
      mapImage: 'https://placehold.co/600x250/E0F2F7/1ABC9C?text=Map+Placeholder', // Placeholder for a map
    },
    wasteItems: [
      { type: 'Plastic Bottles', quantity: '30 pcs', weight: '5 kg', notes: 'Clean' },
      { type: 'Cardboard Boxes', quantity: '10 pcs', weight: '3 kg', notes: 'Folded' },
      { type: 'Glass Jars', quantity: '5 pcs', weight: '2.5 kg', notes: 'Fragile' },
      { type: 'Aluminum Cans', quantity: '20 pcs', weight: '1 kg', notes: 'Rinsed' },
    ],
    userContact: {
      fullName: 'Jessica Aning',
      phone: '+233 55 987 6543',
      email: 'jessica.a@example.com',
      emergency: '+233 20 111 2222',
    },
    specialInstructions: 'Pickup from back gate. Available only after 9 AM.',
    historyLog: [
      { timestamp: 'July 29, 2025', event: 'Created' },
      { timestamp: 'July 30, 2025', event: 'Assigned – Collector: Emmanuel' },
      { timestamp: 'Aug 1, 2025', event: 'Status: In Progress' },
    ],
  });

  // State to simulate different user roles for action buttons
  // 'user', 'collector', 'admin'
  const [userRole, setUserRole] = useState('user'); // You can change this to 'collector' or 'admin' to test

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-gray-50">
      {/* Top Navigation Bar (Sticky) */}
      <nav className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-[#1ABC9C] text-2xl font-bold">RecycleMate</div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-[#1ABC9C] transition-colors">Home</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-[#1ABC9C] transition-colors">Dashboard</Link>
          <Link to="/support" className="text-gray-700 hover:text-[#1ABC9C] transition-colors">Support</Link>
          <Link to="/logout" className="text-gray-700 hover:text-[#1ABC9C] transition-colors">Logout</Link>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Pickup Details</h1>

        {/* 📦 Pickup Overview Card */}
        <section className="bg-gradient-to-br from-[#1ABC9C] to-teal-400 p-6 rounded-2xl shadow-lg text-white mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            Pickup Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold">Pickup ID: {pickupDetails.id}</p>
              <p className="text-lg font-semibold mt-2">Scheduled: {pickupDetails.scheduledDateTime}</p>
              <p className="text-lg font-semibold mt-2">Pickup Type: {pickupDetails.pickupType}</p>
            </div>
            <div className="md:text-right">
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(pickupDetails.status)}`}>
                {pickupDetails.status}
              </span>
              {pickupDetails.collector && (
                <div className="mt-4 flex items-center md:justify-end">
                  <img src={pickupDetails.collector.avatar} alt={pickupDetails.collector.name} className="w-10 h-10 rounded-full mr-3 border-2 border-white" />
                  <div>
                    <p className="text-lg font-semibold">Assigned Collector:</p>
                    <p className="text-md">{pickupDetails.collector.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 📍 Pickup Location Section */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-7 h-7 mr-2 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m10.614-10.614L13.414 3.1a1.998 1.998 0 00-2.828 0L6.343 6.343m10.614 10.614A9 9 0 1112 2.944a9.965 9.965 0 015.618 3.04z"></path></svg>
            Pickup Location
          </h2>
          <div className="mb-4">
            <img src={pickupDetails.location.mapImage} alt="Map of pickup location" className="w-full h-auto rounded-lg mb-3" />
            <p className="text-lg text-gray-700 font-semibold">{pickupDetails.location.address}</p>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300">
            Get Directions
          </button>
        </section>

        {/* 📋 Waste Items Breakdown */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-7 h-7 mr-2 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Waste Items Breakdown
          </h2>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Weight</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pickupDetails.wasteItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden space-y-4">
            {pickupDetails.wasteItems.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-md font-semibold text-gray-900 mb-1">{item.type}</p>
                <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-700">Est. Weight: {item.weight}</p>
                <p className="text-sm text-gray-700">Notes: {item.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 📞 Contact Info Section (Conditional based on viewer role) */}
        {(userRole === 'admin' || userRole === 'collector') && (
          <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-7 h-7 mr-2 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
              User Contact Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Full Name:</span> {pickupDetails.userContact.fullName}</p>
              <p><span className="font-semibold">Phone Number:</span> {pickupDetails.userContact.phone}</p>
              <p><span className="font-semibold">Email:</span> {pickupDetails.userContact.email}</p>
              {pickupDetails.userContact.emergency && (
                <p><span className="font-semibold">Emergency Contact:</span> {pickupDetails.userContact.emergency}</p>
              )}
            </div>
          </section>
        )}

        {/* 📝 Notes & Special Instructions */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-7 h-7 mr-2 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Notes & Special Instructions
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {pickupDetails.specialInstructions || 'No special instructions provided.'}
          </p>
        </section>

        {/* 🛠️ Action Buttons (based on role) */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-7 h-7 mr-2 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            {userRole === 'admin' && (
              <>
                <button className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">Edit Pickup</button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">Assign/Reassign Collector</button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">Cancel Pickup</button>
              </>
            )}
            {userRole === 'collector' && (
              <>
                <button className="bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">Mark as Picked</button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">Update Status</button>
                <a href={`tel:${pickupDetails.userContact.phone}`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                  Contact User
                </a>
              </>
            )}
            {userRole === 'user' && (
              <>
                {pickupDetails.status !== 'Completed' && pickupDetails.status !== 'Cancelled' && (
                   <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">Cancel Pickup</button>
                )}
                {pickupDetails.status === 'Scheduled' && (
                   <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">Reschedule Pickup</button>
                )}
              </>
            )}
          </div>
        </section>

        {/* 📄 Pickup History Log */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-7 h-7 mr-2 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Pickup History Log
          </h2>
          <div className="space-y-4">
            {pickupDetails.historyLog.map((log, index) => (
              <div key={index} className="flex items-start">
                <div className="w-3 h-3 bg-[#1ABC9C] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{log.timestamp}</p>
                  <p className="text-sm text-gray-700">{log.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
