import { Link } from "react-router";
import RecycleMateNavbar from "../components/Navbar";
import RecycleMateFooter from "../components/Footer";
import HowItWorksBar from "../components/HowItWorks";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import heroImage from "../assets/hero.png"
import BuiltIn from "../components/BuiltForEveryone";
import TestimonialsMarquee from "../components/Testimonials";

export default function Home() {
  return (
 <>
    <RecycleMateNavbar />
    <section className=" h-[85vh]">
      {/* photo */}
      <img
        src={heroImage}
        alt="Smiling waste collector"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-black/40" /> 

 
      <div className="relative z-10 h-full">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="text-white max-w-md">
            <h1 className="mt-20 items-start text-4xl md:text-5xl font-bold leading-tight">
              Smart, Simple & <br /> Sustainable Waste Pickup
            </h1>
            <p className="mt-4">
              Connecting households to trusted collectors across your community.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link to={'/schedule-pickup'} className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 px-6 rounded">
                Book a Pickup
              </Link>
              <Link to={'/register'} className="border border-white text-white py-2 px-6 rounded hover:bg-white/90 hover:text-teal-600 transition">
                Join as a Collector
              </Link>
            </div>
          </div>
        </div>
      </div>
      </section>
      <div className="space-y-6 bg-gray-200">
      <HowItWorksBar />
      <BuiltIn/>
      <CTA />
      <TestimonialsMarquee/>
      <RecycleMateFooter />
    </div>
     </>
  );
}
