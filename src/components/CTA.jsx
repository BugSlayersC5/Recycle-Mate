import { Link } from "react-router";
import truckImage from "../assets/truck.png"
export default function CTA() {
    return (
        <section className="relative overflow-hidden">
            <div className="bg-yellow-300 py-16">

                <div className="hidden md:block absolute right- top-0 h-full w-[10vw] bg-teal-600 -skew-x-12 origin-left ml-2.5" />

                <div className="relative max-w-xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

                    <div>
                        <h3 className="text-2xl font-extrabold text-gray-900 max-w-md">
                            Ready to clean up your community?
                        </h3>
                        <p className="mx-auto mb-2 max-w-xs">
                            Join RecycleMate and be part of the change.
                        </p>

                        <Link to={'/register'} className="mt-6 bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800">
                            Get Started
                        </Link>
                    </div>
                    <img
                        src={truckImage}
                        alt="Recycling truck"
                        cclassName="w-full max-w-md max-h-60 object-contain mx-auto md:mx-0 drop-shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
