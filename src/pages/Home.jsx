import { Link } from "react-router";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  return (

    <section className="bg-teal-500 text-white ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left content */}
        <div className="mb-12 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Smart, Simple & <br />
            Sustainable <br />
            Waste Pickup
          </h1>
          <p className="mt-4 text-lg">
            Connecting households to trusted collectors across your community.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to='/schedule-pickup' className="bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded hover:bg-yellow-300 transition">
              Book a Pickup
            </Link>

            <Link to='/register' className="border border-white text-white py-2 px-6 rounded hover:bg-white hover:text-teal-500 transition">
              Join as a Collector
            </Link>

          </div>
        </div>

        {/* Right content */}
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-teal-600 shadow-xl rounded-lg w-72 h-60 flex items-center justify-center text-lg font-medium">
            Smart Waste Pickup
          </div>
        </div>
      </div>
      <div className="bg-white mt-4">
        <HowItWorks />
      </div>
    </section>
  );
}