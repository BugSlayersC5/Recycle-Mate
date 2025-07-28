import React from "react";
import RecycleMateNavbar from "../components/Navbar";
import RecycleMateFooter from "../components/Footer";

export default function BestPractices() {
  return (
    <>
      <RecycleMateNavbar />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section className="relative bg-teal-600 py-20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-500 opacity-90" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Best Practices for Waste Management
            </h1>
            <p className="text-lg md:text-xl">
              Learn how to properly dispose of different waste types and contribute to a healthier planet, aligned with SDG goals.
            </p>
          </div>
        </section>

        {/* Introduction to SDGs */}
        <section className="py-16 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-teal-700">Our Commitment to Sustainable Development Goals (SDGs)</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At RecycleMate, we are dedicated to fostering sustainable communities. Our best practices are designed to align with several United Nations Sustainable Development Goals, particularly **SDG 11 (Sustainable Cities and Communities)** and **SDG 12 (Responsible Consumption and Production)**, ensuring we minimize environmental impact and promote a circular economy.
          </p>
          <hr className="my-12 border-gray-300" />
        </section>

        {/* Waste Type Disposal Guide */}
        <section className="py-8 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-teal-700">How to Dispose of Different Waste Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Organic Waste */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">Organic Waste (Food Scraps, Yard Waste)</h3>
              <p className="text-gray-700 mb-4">
                **Composting** is the best method for organic waste. It enriches soil and reduces landfill waste. If composting isn't an option, ensure it's properly bagged to avoid attracting pests.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Use a dedicated compost bin.</li>
                <li>Avoid meat and dairy in home compost.</li>
                <li>Check for local community composting programs.</li>
              </ul>
            </div>

            {/* Recyclables */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">Recyclable Materials (Plastics, Paper, Glass, Metals)</h3>
              <p className="text-gray-700 mb-4">
                Always **clean and sort** your recyclables. Contaminated items can lead to entire batches being sent to landfills.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Rinse containers thoroughly.</li>
                <li>Flatten cardboard and plastic bottles.</li>
                <li>Know your local recycling guidelines (what plastics are accepted, etc.).</li>
              </ul>
            </div>

            {/* E-Waste */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">E-Waste (Electronics, Batteries)</h3>
              <p className="text-gray-700 mb-4">
                Electronics and batteries contain hazardous materials. **Never put them in regular trash.** Seek out specialized recycling centers or take-back programs.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Look for e-waste collection events.</li>
                <li>Many electronics retailers offer recycling services.</li>
                <li>Remove personal data from devices before disposal.</li>
              </ul>
            </div>

            {/* Hazardous Waste */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">Hazardous Waste (Paints, Chemicals, Medicines)</h3>
              <p className="text-gray-700 mb-4">
                These materials pose significant environmental and health risks. They require **specialized disposal**. Do not pour down drains or dispose of in regular trash.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Contact your local municipality for hazardous waste collection dates.</li>
                <li>Return unused medications to pharmacies.</li>
                <li>Look for designated chemical waste drop-off sites.</li>
              </ul>
            </div>

            {/* Textile Waste */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">Textile Waste (Clothes, Fabrics)</h3>
              <p className="text-gray-700 mb-4">
                Give old clothes a new life! **Donate, repurpose, or recycle** textiles to reduce landfill burden.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Donate wearable clothing to charities.</li>
                <li>Use old fabrics as cleaning rags.</li>
                <li>Seek out textile recycling bins in your area.</li>
              </ul>
            </div>

            {/* General Waste */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">General Waste (Non-Recyclable, Non-Hazardous)</h3>
              <p className="text-gray-700 mb-4">
                This category should be a last resort. Aim to **reduce** what ends up here through mindful consumption and proper sorting of other waste types.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Ensure all other waste types are sorted first.</li>
                <li>Bag general waste securely to prevent litter.</li>
                <li>Consider alternatives to single-use items.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prevention and Reduction Tips */}
        <section className="bg-gray-200 py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-teal-700">Preventing Environmental Endangerment: The 3 Rs and Beyond</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Reduce */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                <div className="bg-yellow-400 p-4 rounded-full mb-6">
                  <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-yellow-600">Reduce</h3>
                <p className="text-gray-700">
                  The most effective way to manage waste is to <b>create less of it</b>. Think before you buy, opt for reusable items, and minimize packaging.
                </p>
              </div>
              {/* Reuse */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                <div className="bg-yellow-400 p-4 rounded-full mb-6">
                  <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2.11M20 15h-4.418"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-yellow-600">Reuse</h3>
                <p className="text-gray-700">
                  Extend the life of products. Choose durable goods, repair broken items, and find new purposes for old objects.
                </p>
              </div>
              {/* Recycle */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                <div className="bg-yellow-400 p-4 rounded-full mb-6">
                  <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7l10 10m0-10L7 17m14-5a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-yellow-600">Recycle</h3>
                <p className="text-gray-700">
                  When reduction and reuse aren't possible, <b>recycle properly</b> . This conserves resources and reduces pollution.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-10 max-w-3xl mx-auto">
              By following these best practices, you play a crucial role in creating a more sustainable future for Ghana, and the world. Every small action counts!
            </p>
          </div>
        </section>
      </div>
      <RecycleMateFooter />
    </>
  );
}