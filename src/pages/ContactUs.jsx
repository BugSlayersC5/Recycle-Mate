import React from "react";
import RecycleMateNavbar from "../components/Navbar";
import RecycleMateFooter from "../components/Footer";

export default function ContactUs() {
  return (
    <>
      <RecycleMateNavbar />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section className="relative bg-teal-600 py-20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-500 opacity-90" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Get in Touch with RecycleMate
            </h1>
            <p className="text-lg md:text-xl">
              Have questions, feedback, or need assistance? We're here to help!
            </p>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-teal-700">Reach Out to Us</h2>
            <p className="text-gray-700 mb-6">
              Whether you're a household user, a waste collector, or just curious about our mission, we'd love to hear from you.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v13z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">
                    <a href="mailto:support@recycylemate.com" className="text-teal-600 hover:underline">support@recycylemate.com</a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">
                    <a href="tel:+233241234567" className="text-teal-600 hover:underline">+233 24 123 4567</a> (Available Mon-Fri, 9 AM - 5 PM GMT)
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Our Office</h3>
                  <p className="text-gray-600">
                    RecycleMate Headquarters<br />
                    123 Eco-Friendly Lane<br />
                    Cape Coast, Central Region<br />
                    Ghana
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-teal-700">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="Inquiry about waste pickup"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-teal-700">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-600">How do I schedule a waste pickup?</h3>
              <p className="text-gray-700">
                You can easily schedule a pickup through our app by selecting your waste type, preferred date and time, and confirming your location. Our system will then connect you with an available collector in Cape Coast.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-600">What types of waste does RecycleMate collect?</h3>
              <p className="text-gray-700">
                RecycleMate collects various types of waste, including general household waste, recyclables (plastics, paper, glass, metals), and organic waste. For specialized items like e-waste or hazardous materials, please refer to our Best Practices page for proper disposal methods.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-600">Is there a fee for using RecycleMate's service?</h3>
              <p className="text-gray-700">
                Yes, there is a transparent fee for our pickup services, which varies based on the type and volume of waste. You'll see the exact cost before confirming your pickup. We offer secure and flexible payment options.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-600">How can I become a RecycleMate collector?</h3>
              <p className="text-gray-700">
                We're always looking for dedicated individuals to join our network of trusted collectors! You can register through our platform by providing the necessary details and completing our vetting process. Visit our homepage for the "Join as a Collector" option.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-600">What if my pickup is missed or delayed?</h3>
              <p className="text-gray-700">
                While we strive for punctuality, unforeseen circumstances can sometimes cause delays. If your pickup is missed or significantly delayed, please contact our support team immediately via email or phone, and we'll resolve the issue promptly.
              </p>
            </div>
          </div>
        </section>
      </div>
      <RecycleMateFooter />
    </>
  );
}