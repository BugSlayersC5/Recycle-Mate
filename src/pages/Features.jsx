import RecycleMateNavbar from "../components/Navbar";
import RecycleMateFooter from "../components/Footer";

export default function Features() {
  return (
    <>
      <RecycleMateNavbar />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section for Features */}
        <section className="relative bg-teal-600 py-20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-500 opacity-90" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Streamline Your Waste Management
            </h1>
            <p className="text-lg md:text-xl">
              Discover the smart features that make RecycleMate your go-to solution for sustainable waste disposal.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1: Easy Pickup Scheduling */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-yellow-400 p-4 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Effortless Pickup Scheduling</h2>
              <p className="text-gray-700">
                Schedule waste pickups in minutes with our intuitive app. Choose your preferred time and date, and we'll handle the rest.
              </p>
            </div>

            {/* Feature 2: Real-time Tracking */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-yellow-400 p-4 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Real-time Pickup Tracking</h2>
              <p className="text-gray-700">
                Monitor your waste collector's progress in real-time. Know exactly when your pickup is expected.
              </p>
            </div>

            {/* Feature 3: Community of Collectors */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-yellow-400 p-4 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.185-.015-.369-.045-.552C16.822 16.027 15.636 15 14 15c-1.635 0-2.821 1.027-2.955 2.448C11.015 17.631 11 17.815 11 18v2m3-1h6m-3-3l3 3-3 3"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Trusted Collector Network</h2>
              <p className="text-gray-700">
                Connect with a network of vetted and reliable waste collectors in your local community.
              </p>
            </div>

            {/* Feature 4: Eco-Friendly Impact */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-yellow-400 p-4 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L19 19M4 16l.049-.049m-4.085-3.085a2 2 0 010-2.828l6.586-6.586a2 2 0 012.828 0L20 9l-4.243 4.243m-4.242-4.242L4 16z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Track Your Green Impact</h2>
              <p className="text-gray-700">
                See the positive environmental impact of your waste management efforts through our app's reporting.
              </p>
            </div>

            {/* Feature 5: Flexible Payment Options */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-yellow-400 p-4 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Secure & Flexible Payments</h2>
              <p className="text-gray-700">
                Enjoy hassle-free transactions with multiple secure payment options integrated into the platform.
              </p>
            </div>

            {/* Feature 6: Dedicated Support */}
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-yellow-400 p-4 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 0A3.996 3.996 0 0112 10.95c-.39-.14-.799-.219-1.207-.219-.504 0-.99.1-1.455.292L5.636 5.636m12.728 12.728l-3.536-3.536m0 0c-.465.192-.951.292-1.455.292-.408 0-.817-.079-1.207-.219A3.996 3.996 0 0112 13.05c.39-.14.799-.219 1.207-.219.504 0 .99.1 1.455.292l3.536 3.536m-12.728 0A3.996 3.996 0 0012 13.05c-.39.14-.799.219-1.207-.219-.504 0-.99.1-1.455.292L5.636 18.364m12.728 0a3.996 3.996 0 010-5.656l-3.536-3.536m0 0c.465.192.951.292 1.455.292.408 0 .817-.079 1.207-.219A3.996 3.996 0 0012 10.95c-.39-.14-.799-.219-1.207-.219-.504 0-.99.1-1.455.292L5.636 5.636"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Dedicated Customer Support</h2>
              <p className="text-gray-700">
                Our support team is always ready to assist you with any queries or issues you might encounter.
              </p>
            </div>
          </div>
        </section>
      </div>
      <RecycleMateFooter />
    </>
  );
}
